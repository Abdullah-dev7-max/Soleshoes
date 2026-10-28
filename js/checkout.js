const checkoutPage = document.querySelector("#checkout-content");

if (sessionStorage.getItem("sole-preview-auth") !== "signed-in") {
  window.location.replace("accounts.html?return=checkout");
} else if (!(checkoutPage instanceof HTMLElement)) {
  throw new Error("Checkout page is missing its content container.");
} else {
  checkoutPage.hidden = false;

const checkoutCartKey = "sole-cart";
const checkoutRate = 280;
const checkoutFormatPrice = (priceUsd) =>
  `PKR ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(
    Math.round(priceUsd * checkoutRate),
  )}`;

const checkoutItems = document.querySelector("#checkout-items");
const checkoutEmpty = document.querySelector("#checkout-empty");
const checkoutTotals = document.querySelector("#checkout-totals");
const checkoutItemCount = document.querySelector("#checkout-item-count");
const checkoutSubtotal = document.querySelector("#checkout-subtotal");
const checkoutTotal = document.querySelector("#checkout-total");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutStatus = document.querySelector("#checkout-status");
const cardNotice = document.querySelector("#checkout-card-notice");
const checkoutSubmit = document.querySelector("#checkout-submit");

if (
  !(checkoutItems instanceof HTMLElement) ||
  !(checkoutEmpty instanceof HTMLElement) ||
  !(checkoutTotals instanceof HTMLElement) ||
  !(checkoutItemCount instanceof HTMLElement) ||
  !(checkoutSubtotal instanceof HTMLElement) ||
  !(checkoutTotal instanceof HTMLElement) ||
  !(checkoutForm instanceof HTMLFormElement) ||
  !(checkoutStatus instanceof HTMLElement) ||
  !(cardNotice instanceof HTMLElement) ||
  !(checkoutSubmit instanceof HTMLButtonElement)
) {
  throw new Error("Checkout page is missing required markup.");
}

const readCheckoutCart = () => {
  const storedCart = localStorage.getItem(checkoutCartKey);
  if (!storedCart) return [];

  const parsedCart = JSON.parse(storedCart);
  if (!Array.isArray(parsedCart)) {
    throw new TypeError(`Expected an array in localStorage key "${checkoutCartKey}".`);
  }

  return parsedCart.filter((product) =>
    product &&
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    typeof product.image === "string" &&
    Number.isFinite(product.priceUsd) &&
    product.priceUsd >= 0,
  ).map((product) => ({
    ...product,
    quantity: Number.isInteger(product.quantity) && product.quantity > 0
      ? product.quantity
      : 1,
  }));
};

const saveCheckoutCart = (cart) => {
  localStorage.setItem(checkoutCartKey, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("sole-store-updated"));
};

const renderCheckout = () => {
  const cart = readCheckoutCart();
  const quantity = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.priceUsd * item.quantity, 0);

  checkoutItems.replaceChildren();
  checkoutItemCount.textContent = `${quantity} ${quantity === 1 ? "item" : "items"}`;
  checkoutEmpty.hidden = cart.length > 0;
  checkoutTotals.hidden = cart.length === 0;
  checkoutForm.classList.toggle("checkout-form--empty", cart.length === 0);
  checkoutSubmit.disabled = cart.length === 0;
  checkoutSubtotal.textContent = checkoutFormatPrice(subtotal);
  checkoutTotal.textContent = checkoutFormatPrice(subtotal);

  for (const product of cart) {
    const item = document.createElement("article");
    item.className = "checkout-item";
    item.dataset.productId = product.id;

    const image = document.createElement("img");
    image.className = "checkout-item__image";
    image.src = product.image;
    image.alt = product.imageAlt ?? product.name;
    image.loading = "lazy";

    const details = document.createElement("div");
    details.className = "checkout-item__details";
    const category = document.createElement("p");
    category.textContent = product.category ?? "SOLE sneakers";
    const name = document.createElement("h3");
    name.textContent = product.name;
    const price = document.createElement("strong");
    price.textContent = checkoutFormatPrice(product.priceUsd);
    details.append(category, name, price);

    const controls = document.createElement("div");
    controls.className = "checkout-item__controls";
    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.setAttribute("aria-label", `Decrease ${product.name} quantity`);
    decrease.textContent = "−";
    decrease.addEventListener("click", () => {
      updateCheckoutQuantity(product.id, product.quantity - 1);
    });
    const count = document.createElement("span");
    count.textContent = String(product.quantity);
    const increase = document.createElement("button");
    increase.type = "button";
    increase.setAttribute("aria-label", `Increase ${product.name} quantity`);
    increase.textContent = "+";
    increase.addEventListener("click", () => {
      updateCheckoutQuantity(product.id, product.quantity + 1);
    });
    controls.append(decrease, count, increase);

    const remove = document.createElement("button");
    remove.className = "checkout-item__remove";
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${product.name} from bag`);
    remove.textContent = "Remove";
    remove.addEventListener("click", () => updateCheckoutQuantity(product.id, 0));

    const itemActions = document.createElement("div");
    itemActions.className = "checkout-item__actions";
    itemActions.append(controls, remove);
    item.append(image, details, itemActions);
    checkoutItems.append(item);
  }
};

const updateCheckoutQuantity = (productId, quantity) => {
  const cart = readCheckoutCart()
    .map((product) => product.id === productId ? { ...product, quantity } : product)
    .filter((product) => product.quantity > 0);
  saveCheckoutCart(cart);
  renderCheckout();
};

const updatePaymentSelection = () => {
  const selectedPayment = checkoutForm.querySelector('input[name="payment"]:checked');
  const isCardSelected = selectedPayment instanceof HTMLInputElement && selectedPayment.value === "card";
  cardNotice.hidden = !isCardSelected;
  checkoutSubmit.textContent = isCardSelected
    ? "Card payment unavailable"
    : "Review cash-on-delivery order";

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";
  checkoutSubmit.append(arrow);
  checkoutSubmit.disabled = isCardSelected || readCheckoutCart().length === 0;
};

checkoutForm.querySelectorAll('input[name="payment"]').forEach((input) => {
  input.addEventListener("change", updatePaymentSelection);
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkoutStatus.hidden = true;

  const selectedPayment = checkoutForm.querySelector('input[name="payment"]:checked');
  if (selectedPayment instanceof HTMLInputElement && selectedPayment.value === "card") {
    cardNotice.hidden = false;
    return;
  }
  if (readCheckoutCart().length === 0) {
    checkoutStatus.textContent = "Your bag is empty. Add a pair before checking out.";
    checkoutStatus.hidden = false;
    return;
  }

  if (!checkoutForm.reportValidity()) return;

  checkoutStatus.textContent =
    "Your delivery details are complete. This preview does not send or save an order; a store backend is needed to confirm a cash-on-delivery purchase.";
  checkoutStatus.hidden = false;
  checkoutStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

window.addEventListener("sole-store-updated", renderCheckout);
window.addEventListener("storage", renderCheckout);

renderCheckout();
updatePaymentSelection();
}
