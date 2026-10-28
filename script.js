const featuredProducts = [
  {
    name: "Everyday Classic",
    category: "Men's Sneakers",
    priceUsd: 229.96,
    description: "A timeless everyday sneaker with a comfortable fit and clean finish.",
    image: "Assets/find%20your%20fit.jpg",
    imageAlt: "Light-colored classic sneaker",
  },
  {
    name: "Neutral Runner",
    category: "Men's Sneakers",
    priceUsd: 329.96,
    description: "Soft neutral tones and all-day comfort for your daily rotation.",
    image: "Assets/get%20your%20pair.jpg",
    imageAlt: "Neutral-toned sneaker",
  },
  {
    name: "City Pace",
    category: "Men's Sneakers",
    priceUsd: 169.99,
    description: "A versatile street-ready sneaker made for days on the move.",
    image: "Assets/Shop%20sneakers.jpg",
    imageAlt: "White sneaker in a city setting",
  },
];

const summerProducts = [
  {
    name: "Orange Suede Low",
    category: "Men's Sneakers",
    priceUsd: 189.99,
    description: "Soft suede with a bold colorway for easy summer styling.",
    image: "Assets/left%20snaeks.jpg",
    imageAlt: "Orange suede sneakers",
  },
  {
    name: "Green Court Classic",
    category: "Men's Sneakers",
    priceUsd: 219.99,
    description: "A laid-back court sneaker in fresh green and cream tones.",
    image: "Assets/right%20top%20sneakers.jpg",
    imageAlt: "Green court sneaker on a woven chair",
  },
  {
    name: "Yellow Track Low",
    category: "Men's Sneakers",
    priceUsd: 169.99,
    description: "Retro-inspired runners with a bright, easy-to-wear finish.",
    image: "Assets/right%20bottom%20sneakes.jpg",
    imageAlt: "Yellow retro sneakers",
  },
  {
    name: "Brown Suede Classic",
    category: "Men's Sneakers",
    priceUsd: 199.99,
    description: "A timeless brown suede pair with a comfortable gum sole.",
    image: "Assets/bottom%20sneakers.jpg",
    imageAlt: "Brown suede sneakers",
  },
  {
    name: "Neutral Everyday",
    category: "Men's Sneakers",
    priceUsd: 179.99,
    description: "A versatile neutral sneaker that goes with your daily rotation.",
    image: "Assets/find%20your%20fit.jpg",
    imageAlt: "Light neutral everyday sneakers",
  },
  {
    name: "Fresh Pair Runner",
    category: "Men's Sneakers",
    priceUsd: 209.99,
    description: "A lightweight everyday pick with a clean, modern profile.",
    image: "Assets/get%20your%20pair.jpg",
    imageAlt: "Fresh neutral sneaker",
  },
];

const womenProducts = [
  {
    name: "Soft Step Runner",
    category: "Women's Sneakers",
    priceUsd: 189.99,
    description: "A lightweight neutral runner for comfortable days on the move.",
    image: "Assets/find%20your%20fit.jpg",
    imageAlt: "Light neutral sneakers for everyday wear",
  },
  {
    name: "Cedar Suede Low",
    category: "Women's Sneakers",
    priceUsd: 219.99,
    description: "A warm suede finish adds an easy statement to everyday outfits.",
    image: "Assets/left%20snaeks.jpg",
    imageAlt: "Orange suede sneakers",
  },
  {
    name: "Fresh Day Classic",
    category: "Women's Sneakers",
    priceUsd: 199.99,
    description: "A clean, versatile classic that feels at home wherever you go.",
    image: "Assets/get%20your%20pair.jpg",
    imageAlt: "Fresh everyday sneaker",
  },
];

const kidsProducts = [
  {
    name: "Playtime Runner",
    category: "Kids' Sneakers",
    priceUsd: 99.99,
    description: "A lightweight everyday pair for school days and playtime.",
    image: "Assets/Shop%20sneakers.jpg",
    imageAlt: "Everyday sneaker ready for play",
  },
  {
    name: "Little Explorer",
    category: "Kids' Sneakers",
    priceUsd: 119.99,
    description: "Easy-going comfort for little explorers and big adventures.",
    image: "Assets/get%20your%20pair.jpg",
    imageAlt: "Comfortable sneaker for little adventures",
  },
  {
    name: "Bright Steps Low",
    category: "Kids' Sneakers",
    priceUsd: 89.99,
    description: "A fun, colorful favorite made for busy days on the move.",
    image: "Assets/right%20bottom%20sneakes.jpg",
    imageAlt: "Bright retro sneakers",
  },
];

const USD_TO_PKR_RATE = 280;
const formatPKR = (priceUsd) =>
  `PKR ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(
    Math.round(priceUsd * USD_TO_PKR_RATE),
  )}`;

const allProducts = [
  ...featuredProducts.map((product) => ({
    ...product,
    href: "index.html#product-grid",
  })),
  ...summerProducts.map((product) => ({
    ...product,
    href: "index.html#summer-product-grid",
  })),
  ...womenProducts.map((product) => ({
    ...product,
    href: "women.html#women-product-grid",
  })),
  ...kidsProducts.map((product) => ({
    ...product,
    href: "kids.html#kids-product-grid",
  })),
].map((product) => ({
  ...product,
  id: `${product.category}:${product.name}`,
}));

const FAVORITES_STORAGE_KEY = "sole-favorites";
const CART_STORAGE_KEY = "sole-cart";

const readStoredProducts = (key) => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return [];
  }

  const products = JSON.parse(storedValue);
  if (!Array.isArray(products)) {
    throw new TypeError(`Expected an array in localStorage key "${key}".`);
  }
  return products.filter(
    (product) => product && typeof product.id === "string",
  ).map((product) =>
    key === CART_STORAGE_KEY
      ? {
          ...product,
          quantity:
            Number.isInteger(product.quantity) && product.quantity > 0
              ? product.quantity
              : 1,
        }
      : product,
  );
};

const writeStoredProducts = (key, products) => {
  localStorage.setItem(key, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent("sole-store-updated"));
};

const toggleStoredProduct = (key, product) => {
  const products = readStoredProducts(key);
  const exists = products.some((item) => item.id === product.id);
  const nextProducts = exists
    ? products.filter((item) => item.id !== product.id)
    : [...products, product];
  writeStoredProducts(key, nextProducts);
  return !exists;
};

const addCartProduct = (product) => {
  const cart = readStoredProducts(CART_STORAGE_KEY);
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  writeStoredProducts(CART_STORAGE_KEY, cart);
};

const setCartProductQuantity = (productId, quantity) => {
  const cart = readStoredProducts(CART_STORAGE_KEY);
  const updatedCart =
    quantity <= 0
      ? cart.filter((item) => item.id !== productId)
      : cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        );
  writeStoredProducts(CART_STORAGE_KEY, updatedCart);
};

let refreshCartPanel = () => {};

const createIcon = (type) => {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    type === "heart"
      ? "M20.4 8.8c0 4.3-8.4 10-8.4 10s-8.4-5.7-8.4-10a4.2 4.2 0 0 1 8.4-1 4.2 4.2 0 0 1 8.4 1Z"
      : "M5 8h14l1 12H4L5 8Z M9 9V6a3 3 0 0 1 6 0v3",
  );
  icon.append(path);
  return icon;
};

const updateStoreControls = () => {
  const favoriteIds = new Set(
    readStoredProducts(FAVORITES_STORAGE_KEY).map((product) => product.id),
  );
  const cartIds = new Set(
    readStoredProducts(CART_STORAGE_KEY).map((product) => product.id),
  );

  document.querySelectorAll("[data-product-id]").forEach((element) => {
    const id = element.getAttribute("data-product-id");
    const isFavorite = favoriteIds.has(id);
    const isInCart = cartIds.has(id);
    element.querySelectorAll(".favorite-toggle").forEach((button) => {
      button.classList.toggle("is-active", isFavorite);
      button.setAttribute("aria-pressed", String(isFavorite));
      button.setAttribute(
        "aria-label",
        isFavorite ? "Remove from favourites" : "Add to favourites",
      );
    });
    element.querySelectorAll(".cart-toggle").forEach((button) => {
      button.classList.toggle("is-active", isInCart);
      button.setAttribute("aria-pressed", String(isInCart));
      button.setAttribute(
        "aria-label",
        isInCart ? "Add another to cart" : "Add to cart",
      );
    });
  });

  const favoriteCount = favoriteIds.size;
  const savedPairCount = document.querySelector("#favorites-count");
  if (savedPairCount) {
    savedPairCount.textContent = String(favoriteCount);
  }
  const clearFavoritesButton = document.querySelector("#clear-favorites");
  if (clearFavoritesButton instanceof HTMLButtonElement) {
    clearFavoritesButton.hidden = favoriteCount === 0;
  }

  document.querySelectorAll(".header-favorites").forEach((link) => {
    link.setAttribute(
      "aria-label",
      `Favourites${favoriteCount ? `, ${favoriteCount} ${favoriteCount === 1 ? "item" : "items"}` : ""}`,
    );
    link.classList.toggle("has-favorites", favoriteCount > 0);
    const count = link.querySelector(".header-count");
    if (count) {
      count.textContent = String(favoriteCount);
      count.hidden = favoriteCount === 0;
    }
  });

  const cartCount = readStoredProducts(CART_STORAGE_KEY).reduce(
    (total, product) => total + product.quantity,
    0,
  );
  document.querySelectorAll(".header-cart").forEach((button) => {
    button.setAttribute(
      "aria-label",
      `Shopping bag${cartCount ? `, ${cartCount} ${cartCount === 1 ? "item" : "items"}` : ""}`,
    );
    button.classList.toggle("has-items", cartCount > 0);
    const count = button.querySelector(".bag-count");
    if (count) {
      count.textContent = String(cartCount);
      count.hidden = cartCount === 0;
    }
  });
  refreshCartPanel();
};

const makeProductAction = (type, product) => {
  const button = document.createElement("button");
  button.className = `icon-action ${type}-toggle`;
  button.type = "button";
  button.append(createIcon(type === "favorite" ? "heart" : "bag"));
  button.addEventListener("click", () => {
    if (type === "favorite") {
      toggleStoredProduct(FAVORITES_STORAGE_KEY, product);
    } else {
      addCartProduct(product);
    }
    updateStoreControls();
    if (
      type === "favorite" &&
      document.querySelector("#favorites-product-grid")
    ) {
      renderFavorites();
    }
  });
  return button;
};

const renderProductGrid = (selector, products) => {
  const productGrid = document.querySelector(selector);

  if (!(productGrid instanceof HTMLElement)) {
    return;
  }

  const visibleProducts =
    productGrid.id === "favorites-product-grid"
      ? readStoredProducts(FAVORITES_STORAGE_KEY)
      : products;
  productGrid.replaceChildren();

  if (productGrid.id === "favorites-product-grid" && visibleProducts.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "favorites-empty";
    emptyState.innerHTML = `
      <span class="favorites-empty__icon" aria-hidden="true">
        <svg viewBox="0 0 48 48"><path d="M24 39S6 28 6 16a10 10 0 0 1 18-6 10 10 0 0 1 18 6C42 28 24 39 24 39Z"></path></svg>
      </span>
      <p class="favorites-empty__eyebrow">YOUR EDIT IS WAITING</p>
      <h2>No favourites just yet.</h2>
      <p>When a pair catches your eye, tap its heart and we’ll keep it right here for you.</p>
      <a href="index.html#product-grid">Find your first favourite <span aria-hidden="true">→</span></a>
    `;
    productGrid.append(emptyState);
    return;
  }

  for (const product of visibleProducts) {
    const identifiedProduct =
      product.id
        ? product
        : {
            ...product,
            id: `${product.category}:${product.name}`,
          };
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productId = identifiedProduct.id;

    const imageFrame = document.createElement("div");
    imageFrame.className = "product-card__image-frame";

    const image = document.createElement("img");
    image.className = "product-card__image";
    image.src = product.image;
    image.alt = product.imageAlt;
    image.loading = "lazy";
    const imageActions = document.createElement("div");
    imageActions.className = "product-card__image-actions";
    imageActions.append(
      makeProductAction("favorite", identifiedProduct),
      makeProductAction("cart", identifiedProduct),
    );
    imageFrame.append(image, imageActions);

    const details = document.createElement("div");
    details.className = "product-card__details";

    const priceRow = document.createElement("div");
    priceRow.className = "product-card__price-row";

    const price = document.createElement("p");
    price.className = "product-card__price";
    price.textContent = formatPKR(product.priceUsd);

    const category = document.createElement("span");
    category.className = "product-card__category";
    category.textContent = product.category;
    priceRow.append(price, category);

    const name = document.createElement("h3");
    name.className = "product-card__name";
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-card__description";
    description.textContent = product.description;

    const actions = document.createElement("div");
    actions.className = "product-card__actions";

    const addToCart = document.createElement("button");
    addToCart.className = "product-card__button product-card__button--secondary";
    addToCart.type = "button";
    addToCart.textContent = "Add to Cart";
    addToCart.addEventListener("click", () => {
      addCartProduct(identifiedProduct);
      updateStoreControls();
    });

    const buyNow = document.createElement("button");
    buyNow.className = "product-card__button product-card__button--primary";
    buyNow.type = "button";
    buyNow.textContent = "Buy Now";
    actions.append(addToCart, buyNow);

    details.append(priceRow, name, description, actions);
    card.append(imageFrame, details);
    productGrid.append(card);
  }
  updateStoreControls();
};

renderProductGrid("#product-grid", featuredProducts);
renderProductGrid("#summer-product-grid", summerProducts);
renderProductGrid("#women-product-grid", womenProducts);
renderProductGrid("#kids-product-grid", kidsProducts);

const renderFavorites = () => {
  renderProductGrid("#favorites-product-grid", []);
};
renderFavorites();

window.addEventListener("sole-store-updated", updateStoreControls);
window.addEventListener("storage", updateStoreControls);

const clearFavoritesButton = document.querySelector("#clear-favorites");
if (clearFavoritesButton instanceof HTMLButtonElement) {
  clearFavoritesButton.addEventListener("click", () => {
    writeStoredProducts(FAVORITES_STORAGE_KEY, []);
    renderFavorites();
    updateStoreControls();
  });
}

const cartBackdrop = document.createElement("div");
cartBackdrop.className = "cart-backdrop";
cartBackdrop.hidden = true;
cartBackdrop.setAttribute("aria-hidden", "true");
cartBackdrop.innerHTML = `
  <aside class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabindex="-1">
    <header class="cart-drawer__header">
      <div>
        <p class="cart-drawer__eyebrow">YOUR SOLE EDIT</p>
        <h2 id="cart-title">Shopping bag</h2>
        <p class="cart-drawer__count" aria-live="polite"></p>
      </div>
      <button class="cart-drawer__close" type="button" aria-label="Close shopping bag">&times;</button>
    </header>
    <div class="cart-drawer__body">
      <div class="cart-drawer__items"></div>
      <div class="cart-drawer__empty" hidden>
        <span class="cart-drawer__empty-icon" aria-hidden="true">S</span>
        <h3>Your bag is taking a breather.</h3>
        <p>Find a pair you love and it will be waiting here.</p>
        <button class="cart-drawer__continue cart-drawer__continue--empty" type="button">Continue shopping</button>
      </div>
    </div>
    <footer class="cart-drawer__footer">
      <div class="cart-drawer__summary">
        <div><span>Subtotal</span><strong class="cart-drawer__subtotal"></strong></div>
        <div><span>Delivery</span><strong>Free</strong></div>
        <div class="cart-drawer__total"><span>Total</span><strong class="cart-drawer__total-value"></strong></div>
      </div>
      <p class="cart-drawer__notice" role="status" hidden></p>
      <button class="cart-drawer__checkout" type="button">Continue to checkout <span aria-hidden="true">→</span></button>
      <button class="cart-drawer__continue" type="button">Continue shopping</button>
    </footer>
  </aside>
`;
document.body.append(cartBackdrop);

const cartDrawer = cartBackdrop.querySelector(".cart-drawer");
const cartDrawerItems = cartBackdrop.querySelector(".cart-drawer__items");
const cartDrawerEmpty = cartBackdrop.querySelector(".cart-drawer__empty");
const cartDrawerCount = cartBackdrop.querySelector(".cart-drawer__count");
const cartDrawerSubtotal = cartBackdrop.querySelector(".cart-drawer__subtotal");
const cartDrawerTotal = cartBackdrop.querySelector(".cart-drawer__total-value");
const cartDrawerFooter = cartBackdrop.querySelector(".cart-drawer__footer");
const cartDrawerNotice = cartBackdrop.querySelector(".cart-drawer__notice");
let activeCartTrigger = null;
let cartCloseTimer;

const renderCartDrawer = () => {
  const cart = readStoredProducts(CART_STORAGE_KEY);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.priceUsd * item.quantity,
    0,
  );
  cartDrawerItems.replaceChildren();
  cartDrawerCount.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
  cartDrawerEmpty.hidden = cart.length > 0;
  cartDrawerItems.hidden = cart.length === 0;
  cartDrawerFooter.classList.toggle("is-empty", cart.length === 0);
  cartDrawerSubtotal.textContent = formatPKR(subtotal);
  cartDrawerTotal.textContent = formatPKR(subtotal);
  cartDrawerNotice.hidden = true;

  for (const product of cart) {
    const item = document.createElement("article");
    item.className = "cart-item";
    item.dataset.productId = product.id;

    const image = document.createElement("img");
    image.className = "cart-item__image";
    image.src = product.image;
    image.alt = product.imageAlt;
    image.loading = "lazy";

    const details = document.createElement("div");
    details.className = "cart-item__details";
    const category = document.createElement("p");
    category.className = "cart-item__category";
    category.textContent = product.category;
    const name = document.createElement("h3");
    name.className = "cart-item__name";
    name.textContent = product.name;
    const price = document.createElement("p");
    price.className = "cart-item__price";
    price.textContent = formatPKR(product.priceUsd);

    const controls = document.createElement("div");
    controls.className = "cart-item__controls";
    const quantity = document.createElement("div");
    quantity.className = "cart-item__quantity";
    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.setAttribute("aria-label", `Decrease ${product.name} quantity`);
    decrease.textContent = "−";
    decrease.addEventListener("click", () => {
      setCartProductQuantity(product.id, product.quantity - 1);
      updateStoreControls();
    });
    const quantityValue = document.createElement("span");
    quantityValue.textContent = String(product.quantity);
    const increase = document.createElement("button");
    increase.type = "button";
    increase.setAttribute("aria-label", `Increase ${product.name} quantity`);
    increase.textContent = "+";
    increase.addEventListener("click", () => {
      setCartProductQuantity(product.id, product.quantity + 1);
      updateStoreControls();
    });
    quantity.append(decrease, quantityValue, increase);

    const remove = document.createElement("button");
    remove.className = "cart-item__remove";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      setCartProductQuantity(product.id, 0);
      updateStoreControls();
    });
    controls.append(quantity, remove);
    details.append(category, name, price, controls);
    item.append(image, details);
    cartDrawerItems.append(item);
  }
};

refreshCartPanel = renderCartDrawer;
renderCartDrawer();

const closeCartDrawer = (restoreFocus = true) => {
  if (cartBackdrop.hidden) {
    return;
  }
  cartBackdrop.classList.remove("is-open");
  cartBackdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-is-open");
  document.querySelectorAll(".header-cart").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
  window.clearTimeout(cartCloseTimer);
  cartCloseTimer = window.setTimeout(() => {
    cartBackdrop.hidden = true;
    if (restoreFocus) {
      activeCartTrigger?.focus();
    }
  }, 260);
};

document.querySelectorAll(".header-cart").forEach((trigger) => {
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", () => {
    window.clearTimeout(cartCloseTimer);
    activeCartTrigger = trigger;
    renderCartDrawer();
    cartBackdrop.hidden = false;
    cartBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-is-open");
    trigger.setAttribute("aria-expanded", "true");
    cartBackdrop.offsetHeight;
    cartBackdrop.classList.add("is-open");
    cartDrawer.focus();
  });
});

cartBackdrop.querySelector(".cart-drawer__close").addEventListener("click", () => {
  closeCartDrawer();
});
cartBackdrop.querySelectorAll(".cart-drawer__continue").forEach((button) => {
  button.addEventListener("click", () => closeCartDrawer());
});
cartBackdrop.addEventListener("click", (event) => {
  if (event.target === cartBackdrop) {
    closeCartDrawer();
  }
});
cartBackdrop.querySelector(".cart-drawer__checkout").addEventListener("click", () => {
  const cart = readStoredProducts(CART_STORAGE_KEY);
  if (cart.length === 0) {
    cartDrawerNotice.textContent = "Your bag is empty. Add a pair before checking out.";
    cartDrawerNotice.hidden = false;
    return;
  }
  window.location.href = sessionStorage.getItem("sole-preview-auth") === "signed-in"
    ? "checkout.html"
    : "accounts.html?return=checkout";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cartBackdrop.hidden) {
    closeCartDrawer();
  }
});

const headerSearch = document.querySelector(".header-search");

if (headerSearch instanceof HTMLFormElement) {
  const searchTrigger = headerSearch.querySelector(".header-search-trigger");
  const siteHeader = headerSearch.closest(".site-header");
  const searchInput = headerSearch.querySelector(".header-search__input");
  const closeButton = headerSearch.querySelector(".header-search__close");
  const resultsPanel = headerSearch.querySelector(".header-search__results");
  const status = headerSearch.querySelector(".header-search__status");
  const suggestions = headerSearch.querySelector(".header-search__suggestions");
  const productsPanel = headerSearch.querySelector(".header-search__products");

  const closeSearch = () => {
    headerSearch.classList.remove("is-open");
    siteHeader.classList.remove("has-search-open");
    searchTrigger.setAttribute("aria-expanded", "false");
    searchTrigger.setAttribute("aria-label", "Open product search");
    searchInput.value = "";
    searchInput.tabIndex = -1;
    closeButton.tabIndex = -1;
    resultsPanel.hidden = true;
    searchInput.blur();
  };

  const addSectionHeading = (container, text) => {
    const heading = document.createElement("h2");
    heading.className = "header-search__section-title";
    heading.textContent = text;
    container.append(heading);
  };

  const renderSearchResults = () => {
    const query = searchInput.value.trim();
    const normalizedQuery = query.toLocaleLowerCase();
    suggestions.replaceChildren();
    productsPanel.replaceChildren();

    if (!normalizedQuery) {
      status.textContent = "";
      resultsPanel.hidden = true;
      return;
    }

    resultsPanel.hidden = false;
    const matches = allProducts.filter((product) =>
      product.name.toLocaleLowerCase().startsWith(normalizedQuery),
    );

    if (matches.length === 0) {
      status.textContent = `No products start with "${query}".`;
      return;
    }

    status.textContent = `${matches.length} ${matches.length === 1 ? "product" : "products"} found`;
    addSectionHeading(suggestions, "Suggestions");
    for (const product of [...new Map(matches.map((item) => [item.name, item])).values()].slice(0, 4)) {
      const suggestion = document.createElement("button");
      suggestion.className = "header-search__suggestion";
      suggestion.type = "button";
      suggestion.textContent = product.name;
      suggestion.addEventListener("click", () => {
        searchInput.value = product.name;
        searchInput.focus();
        renderSearchResults();
      });
      suggestions.append(suggestion);
    }

    addSectionHeading(productsPanel, "Products");
    for (const product of matches) {
      const result = document.createElement("article");
      result.className = "search-result";
      result.dataset.productId = product.id;

      const productLink = document.createElement("a");
      productLink.className = "search-result__link";
      productLink.href = product.href;

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = "";
      image.loading = "lazy";

      const details = document.createElement("span");
      details.className = "search-result__details";
      const name = document.createElement("span");
      name.className = "search-result__name";
      name.textContent = product.name;
      const category = document.createElement("span");
      category.className = "search-result__category";
      category.textContent = product.category;
      const price = document.createElement("span");
      price.className = "search-result__price";
      price.textContent = formatPKR(product.priceUsd);

      details.append(name, category);
      productLink.append(image, details, price);
      const actions = document.createElement("span");
      actions.className = "search-result__actions";
      actions.append(
        makeProductAction("favorite", product),
        makeProductAction("cart", product),
      );
      result.append(productLink, actions);
      productsPanel.append(result);
    }
    updateStoreControls();
  };

  searchTrigger.addEventListener("click", () => {
    if (headerSearch.classList.contains("is-open")) {
      closeSearch();
      return;
    }

    headerSearch.classList.add("is-open");
    siteHeader.classList.add("has-search-open");
    searchTrigger.setAttribute("aria-expanded", "true");
    searchTrigger.setAttribute("aria-label", "Search products");
    searchInput.tabIndex = 0;
    closeButton.tabIndex = 0;
    window.setTimeout(() => searchInput.focus(), 180);
  });

  searchInput.addEventListener("input", renderSearchResults);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      headerSearch.requestSubmit();
    }
  });
  headerSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstResult = productsPanel.querySelector(".search-result__link");
    if (firstResult instanceof HTMLAnchorElement) {
      window.location.href = firstResult.href;
    }
  });
  closeButton.addEventListener("click", () => {
    closeSearch();
    searchTrigger.focus();
  });

  document.addEventListener("click", (event) => {
    if (!headerSearch.contains(event.target) && headerSearch.classList.contains("is-open")) {
      closeSearch();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && headerSearch.classList.contains("is-open")) {
      closeSearch();
      searchTrigger.focus();
    }
  });
}

const newsletterForm = document.querySelector("#newsletter-form");
const newsletterStatus = document.querySelector("#newsletter-status");

if (
  newsletterForm instanceof HTMLFormElement &&
  newsletterStatus instanceof HTMLElement
) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterStatus.textContent =
      "Newsletter signup is not connected yet. Please check back soon.";
  });
}

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");

if (header instanceof HTMLElement && hero instanceof HTMLElement) {
  const updateHeaderAppearance = () => {
    header.classList.toggle(
      "is-scrolled",
      hero.getBoundingClientRect().bottom <= header.offsetHeight,
    );
  };

  window.addEventListener("scroll", updateHeaderAppearance, { passive: true });
  window.addEventListener("resize", updateHeaderAppearance);
  updateHeaderAppearance();
}

const createSoleFinder = () => {
  const launcher = document.createElement("button");
  launcher.className = "sole-chat-launcher";
  launcher.type = "button";
  launcher.setAttribute("aria-label", "Open SOLE sneaker recommendations chat");
  launcher.setAttribute("aria-expanded", "false");
  launcher.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 9.4c-5.1 0-9.1 3-9.1 7.1v.2c0 2.1 1.1 4 3 5.3v3.4l4.1-2c.7.2 1.3.2 2 .2 5.1 0 9.1-3 9.1-7.1v-.2c0-3.9-4-6.9-9.1-6.9Z" fill="currentColor"></path>
      <path d="M16 9.4V6.8" fill="none" stroke="currentColor"></path>
      <circle cx="16" cy="5.6" r="1.5" fill="currentColor" stroke="none"></circle>
      <circle cx="12.7" cy="16.5" r="1.3" fill="#604a34" stroke="none"></circle>
      <circle cx="19.3" cy="16.5" r="1.3" fill="#604a34" stroke="none"></circle>
    </svg>
  `;

  const panel = document.createElement("section");
  panel.className = "sole-chat";
  panel.id = "sole-chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "sole-chat-title");
  panel.setAttribute("aria-modal", "false");
  panel.hidden = true;
  panel.innerHTML = `
    <header class="sole-chat__header">
      <div class="sole-chat__identity">
        <span class="sole-chat__mark" aria-hidden="true">S</span>
        <div><p>SOLE PERSONAL SHOPPER</p><h2 id="sole-chat-title">Find your pair</h2></div>
      </div>
      <button class="sole-chat__close" type="button" aria-label="Close sneaker finder">&times;</button>
    </header>
    <div class="sole-chat__messages" role="log" aria-live="polite" aria-relevant="additions text"></div>
    <div class="sole-chat__quick-prompts" aria-label="Try a suggestion">
      <button type="button" data-prompt="I need everyday shoes for women under PKR 30000">Everyday under 30k</button>
      <button type="button" data-prompt="Show me kids shoes for play">For kids</button>
      <button type="button" data-prompt="I want running shoes">For running</button>
    </div>
    <form class="sole-chat__form">
      <label class="visually-hidden" for="sole-chat-input">Tell us what kind of sneakers you need</label>
      <input id="sole-chat-input" name="message" type="text" maxlength="240" autocomplete="off" placeholder="Tell me what you're looking for..." required>
      <button type="submit" aria-label="Send message"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 16-8-5.5 16-3.1-6.1L4 12Z"></path><path d="m11.4 13.9 4.4-4.4"></path></svg></button>
    </form>
    <p class="sole-chat__note">Product suggestions are based on this store's catalogue; no AI service or account is used.</p>
  `;

  document.body.append(launcher, panel);

  const messageList = panel.querySelector(".sole-chat__messages");
  const form = panel.querySelector(".sole-chat__form");
  const input = panel.querySelector("#sole-chat-input");
  const submitButton = form.querySelector('button[type="submit"]');
  const closeButton = panel.querySelector(".sole-chat__close");
  const promptButtons = panel.querySelectorAll("[data-prompt]");

  const requirements = {
    category: null,
    budget: null,
    styles: new Set(),
    colors: new Set(),
  };

  const aliases = {
    men: ["men", "mens", "man", "male", "boy", "boys", "larka", "larkay", "ladkon", "mardon"],
    women: ["women", "womens", "woman", "female", "girl", "girls", "ladki", "ladkiyan", "larkiyon", "khawateen"],
    kids: ["kid", "kids", "child", "children", "toddler", "bachay", "bachon", "bacha", "little"],
  };

  const styleTerms = {
    running: ["run", "running", "runner", "jog", "jogging", "sport", "sports", "fitness", "workout", "track", "race", "dorna"],
    walking: ["walk", "walking", "hiking", "travel", "trip", "safar", "walk kar", "chalne"],
    casual: ["casual", "daily", "everyday", "day to day", "rozana", "normal", "routine", "school", "play", "playtime"],
    classic: ["classic", "court", "retro", "timeless", "simple", "clean", "sada"],
    lightweight: ["lightweight", "light", "halka", "halke", "comfortable", "comfort", "aram", "aramdeh"],
  };

  const colorTerms = {
    orange: ["orange", "rust", "narangi"],
    green: ["green", "olive", "sage", "hara", "sabz"],
    yellow: ["yellow", "mustard", "peela", "zard"],
    brown: ["brown", "tan", "beige", "camel", "bhura", "bhoora"],
    white: ["white", "cream", "ivory", "off white", "safed"],
    red: ["red", "maroon", "laal"],
    blue: ["blue", "navy", "neela"],
    black: ["black", "kala", "kaala"],
    neutral: ["neutral", "neutrals", "grey", "gray", "black", "navy", "beige", "white", "cream", "brown"],
  };

  const normalize = (value) =>
    value
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9.\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const containsTerm = (text, term) =>
    new RegExp(`(^|\\s)${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|\\s)`, "i").test(text);

  const isNegated = (text, term) =>
    new RegExp(`(?:no|not|without|nahi|nahin|mat|bghair)\\s+(?:a|an|the)?\\s*${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s|$)`, "i").test(text);

  const detectCategory = (text) => {
    const matches = Object.entries(aliases)
      .map(([category, words]) => ({
        category,
        index: words
          .map((word) => containsTerm(text, normalize(word)) ? text.lastIndexOf(normalize(word)) : -1)
          .filter((index) => index >= 0)
          .sort((a, b) => b - a)[0],
      }))
      .filter((item) => item.index !== undefined)
      .sort((a, b) => b.index - a.index);
    return matches[0]?.category ?? null;
  };

  const parseBudget = (rawText) => {
    const text = rawText.toLocaleLowerCase().replace(/,/g, "").replace(/:/g, " ");
    const amount = "(\\d+(?:\\.\\d+)?)\\s*(k|thousand|hazar|hajaar|lac|lakh)?";
    const match = text.match(new RegExp(
      `(?:under|below|less than|upto|up to|max|budget(?:\\s+(?:is|of|around|about))?|within|tak|kam|se kam|around|about|approx(?:imately)?|rs\\.?|pkr|rupees?|dollars?|\\$)\\s*${amount}|${amount}\\s*(?:tak|budget|maximum|max|pkr|rs\\.?|rupees?)`,
      "i",
    ));
    if (!match) {
      return null;
    }

    const amountValue = Number(match[1] ?? match[3]);
    const amountUnit = match[2] ?? match[4] ?? "";
    let multiplier = 1;
    if (/^(k|thousand|hazar|hajaar)$/i.test(amountUnit)) {
      multiplier = 1000;
    } else if (/^(lac|lakh)$/i.test(amountUnit)) {
      multiplier = 100000;
    }
    if (/(?:\$|dollars?)\s*\d/i.test(text)) {
      multiplier *= USD_TO_PKR_RATE;
    }
    const parsedAmount = amountValue * multiplier;
    return parsedAmount > 0 ? parsedAmount : null;
  };

  const makeMessage = (text, sender) => {
    const bubble = document.createElement("div");
    bubble.className = `sole-chat__message sole-chat__message--${sender}`;
    bubble.textContent = text;
    messageList.append(bubble);
    messageList.scrollTop = messageList.scrollHeight;
    return bubble;
  };

  const makeContactMessage = (romanUrdu) => {
    const bubble = document.createElement("div");
    bubble.className = "sole-chat__message sole-chat__message--bot";
    const intro = document.createElement("span");
    intro.textContent = romanUrdu
      ? "Aap SOLE se yahan rabta kar sakte hain:"
      : "You can contact SOLE here:";
    const email = document.createElement("a");
    email.href = "mailto:abdullahraufrana786@gmai.com";
    email.textContent = "abdullahraufrana786@gmai.com";
    const phone = document.createElement("a");
    phone.href = "tel:03706220584";
    phone.textContent = "03706220584";
    const note = document.createElement("span");
    note.textContent = romanUrdu
      ? "Support ke auqat abhi share nahi kiye gaye."
      : "Support hours have not been provided.";
    bubble.append(intro, document.createElement("br"), email, document.createElement("br"), phone, document.createElement("br"), note);
    messageList.append(bubble);
    messageList.scrollTop = messageList.scrollHeight;
  };

  const makeTypingIndicator = () => {
    const indicator = document.createElement("div");
    indicator.className = "sole-chat__typing";
    indicator.setAttribute("role", "status");
    indicator.setAttribute("aria-label", "SOLE is preparing a reply");
    indicator.innerHTML = `
      <span class="sole-chat__typing-spinner" aria-hidden="true"></span>
      <span class="sole-chat__typing-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="visually-hidden">SOLE is preparing a reply</span>
    `;
    messageList.append(indicator);
    messageList.scrollTop = messageList.scrollHeight;
    return indicator;
  };

  const productCategory = (product) => {
    const category = product.category.toLocaleLowerCase();
    if (category.includes("women")) return "women";
    if (category.includes("kids")) return "kids";
    return "men";
  };

  const productDescription = (product) =>
    normalize(`${product.name} ${product.description} ${product.imageAlt}`);

  const productMatchesStyle = (product, style) => {
    const text = productDescription(product);
    if (style === "casual" && /\b(everyday|daily|versatile|playtime|school)\b/.test(text)) return true;
    if (style === "walking" && /\b(comfortable|comfort|lightweight|everyday|daily|versatile)\b/.test(text)) return true;
    return styleTerms[style].some((term) => containsTerm(text, normalize(term)));
  };

  const updateRequirements = (text, rawText) => {
    if (/\b(?:start over|forget that|new search|instead|actually)\b/i.test(text)) {
      requirements.category = null;
      requirements.budget = null;
      requirements.styles.clear();
      requirements.colors.clear();
    }

    const category = detectCategory(text);
    if (category) requirements.category = category;

    const budget = parseBudget(rawText);
    if (budget !== null) requirements.budget = budget;

    for (const [style, terms] of Object.entries(styleTerms)) {
      if (terms.some((term) => containsTerm(text, normalize(term)) && !isNegated(text, normalize(term)))) {
        requirements.styles.add(style);
      } else if (terms.some((term) => isNegated(text, normalize(term)))) {
        requirements.styles.delete(style);
      }
    }
    for (const [color, terms] of Object.entries(colorTerms)) {
      if (terms.some((term) => containsTerm(text, normalize(term)) && !isNegated(text, normalize(term)))) {
        requirements.colors.add(color);
      } else if (terms.some((term) => isNegated(text, normalize(term)))) {
        requirements.colors.delete(color);
      }
    }
  };

  const hasProductNeed = (text) => {
    const needWords = [
      ...Object.values(aliases).flat(),
      ...Object.values(styleTerms).flat(),
      ...Object.values(colorTerms).flat(),
      "shoe", "shoes", "sneaker", "sneakers", "pair", "joota", "jootay", "kicks",
    ];
    return needWords.some((term) => containsTerm(text, normalize(term)));
  };

  const formatBudget = (amount) => `PKR ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(amount)}`;

  const productMatchesColor = (product, color) => {
    const text = productDescription(product);
    return colorTerms[color].some((term) => containsTerm(text, normalize(term)));
  };

  const scoreProduct = (product) => {
    const text = productDescription(product);
    let score = 0;
    if (requirements.category && productCategory(product) === requirements.category) score += 12;

    for (const style of requirements.styles) {
      if (productMatchesStyle(product, style)) score += 5;
    }
    for (const color of requirements.colors) {
      if (productMatchesColor(product, color)) score += 7;
    }
    if (requirements.budget !== null) {
      const price = Math.round(product.priceUsd * USD_TO_PKR_RATE);
      if (price <= requirements.budget) score += 4;
      else score -= 2;
    }
    return score;
  };

  const renderRecommendations = (romanUrdu) => {
    const allMatches = [...new Map(allProducts.map((product) => [product.id, product])).values()]
      .sort((a, b) => scoreProduct(b) - scoreProduct(a));
    const categoryMatches = requirements.category
      ? allMatches.filter((product) => productCategory(product) === requirements.category)
      : allMatches;
    const inBudget = requirements.budget === null
      ? categoryMatches
      : categoryMatches.filter((product) => Math.round(product.priceUsd * USD_TO_PKR_RATE) <= requirements.budget);
    const budgetMatches = inBudget.length ? inBudget : categoryMatches;
    const matchingColors = requirements.colors.size === 0
      ? budgetMatches
      : budgetMatches.filter((product) =>
          [...requirements.colors].some((color) => productMatchesColor(product, color)),
        );
    const matches = (matchingColors.length ? matchingColors : budgetMatches.length ? budgetMatches : allMatches).slice(0, 3);

    const categoryLabel = requirements.category
      ? requirements.category === "kids"
        ? "kids"
        : requirements.category === "women"
          ? "women's"
          : "men's"
      : null;
    const needSummary = [
      categoryLabel,
      ...requirements.styles,
      ...requirements.colors,
      requirements.budget !== null ? `under ${formatBudget(requirements.budget)}` : null,
    ].filter(Boolean);

    let response = romanUrdu
      ? needSummary.length
        ? `Samajh gaya${categoryLabel ? ` — ${categoryLabel} ke liye` : ""}${requirements.styles.size ? `, ${[...requirements.styles].join(" aur ")}` : ""}${requirements.colors.size ? `, ${[...requirements.colors].join(" ya ")} rang mein` : ""}${requirements.budget !== null ? `, ${formatBudget(requirements.budget)} tak` : ""}. `
        : "Maine current collection se kuch options dhoondhe hain. "
      : needSummary.length
        ? `Got it${categoryLabel ? ` — ${categoryLabel}` : ""}${requirements.styles.size ? `, ${[...requirements.styles].join(" and ")}` : ""}${requirements.colors.size ? `, in ${[...requirements.colors].join(" or ")}` : ""}${requirements.budget !== null ? `, within ${formatBudget(requirements.budget)}` : ""}. `
        : "I found a few popular options from the current collection. ";

    const requestedColorsAvailable = requirements.colors.size === 0 || matches.some((product) =>
      [...requirements.colors].some((color) => productMatchesColor(product, color)),
    );
    const requestedStylesAvailable = requirements.styles.size === 0 || matches.some((product) =>
      [...requirements.styles].some((style) => productMatchesStyle(product, style)),
    );
    if (!requestedColorsAvailable) {
      response += romanUrdu
        ? "Is rang mein exact match nahi mila, is liye qareebi options dikha raha hoon. "
        : "I couldn't find that exact colour in the matching products, so these are the closest options. ";
    }
    if (!requestedStylesAvailable) {
      response += romanUrdu
        ? "Is use ke liye exact pair abhi catalogue mein nahi, is liye qareebi available options pehle rakhe hain. "
        : "I couldn't find an exact match for that use in the current catalogue, so I ranked the closest available pairs. ";
    }
    if (requirements.budget !== null && inBudget.length === 0) {
      response += romanUrdu
        ? `${categoryLabel ? `${categoryLabel} ke ` : ""}liye ${formatBudget(requirements.budget)} ke andar pair nahi mila. Neeche options aapki baqi pasand se match karte hain, lekin budget se upar ho sakte hain. `
        : `There isn't a listed ${categoryLabel ? `${categoryLabel} ` : ""}pair under ${formatBudget(requirements.budget)} yet; these options match your other preferences, though they may be over budget. `;
    }
    response += romanUrdu
      ? `Yeh ${matches.length === 1 ? "pair hai" : "pairs hain"} jo aap dekh sakte hain:`
      : `Here ${matches.length === 1 ? "is a pair" : "are a few pairs"} you can check out:`;
    makeMessage(response, "bot");

    const cards = document.createElement("div");
    cards.className = "sole-chat__products";
    for (const product of matches) {
      const card = document.createElement("article");
      card.className = "sole-chat-product";
      const link = document.createElement("a");
      link.className = "sole-chat-product__main";
      link.href = product.href;
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.imageAlt;
      image.loading = "lazy";
      const details = document.createElement("span");
      details.className = "sole-chat-product__details";
      const name = document.createElement("strong");
      name.textContent = product.name;
      const price = document.createElement("span");
      price.textContent = formatPKR(product.priceUsd);
      details.append(name, price);
      link.append(image, details);

      const actions = document.createElement("div");
      actions.className = "sole-chat-product__actions";
      const favoriteButton = makeProductAction("favorite", product);
      favoriteButton.setAttribute("aria-label", `Add ${product.name} to favourites`);
      const cartButton = makeProductAction("cart", product);
      cartButton.setAttribute("aria-label", `Add ${product.name} to bag`);
      actions.append(favoriteButton, cartButton);
      card.append(link, actions);
      cards.append(card);
    }
    messageList.append(cards);
    messageList.scrollTop = messageList.scrollHeight;
    updateStoreControls();
  };

  const getStoreAnswer = (text, romanUrdu) => {
    const has = (pattern) => pattern.test(text);

    if (has(/\b(order status|track (?:my )?order|tracking (?:my )?order|where is my order|my order status|order tracking|mera order|order kahan)\b/)) {
      return romanUrdu
        ? "Is website se abhi asal order submit nahi hota, is liye order tracking/status available nahi. Agar aap ne store ko direct order diya hai to status ke liye 03706220584 ya abdullahraufrana786@gmai.com par rabta karein."
        : "This website does not submit real orders, so order tracking and status are not available here. If you placed an order directly with the store, contact 03706220584 or abdullahraufrana786@gmai.com for an update.";
    }

    if (has(/\b(website|web site|site|store|brand)\b/) &&
        has(/\b(name|called|what is|what's|which|about|sell|selling|kya|kaun|kon|naam)\b/)) {
      return romanUrdu
        ? "Yeh SOLE hai—sneakers aur footwear ki storefront, jahan men's, women's aur kids ke styles browse kar sakte hain."
        : "This is SOLE, a sneaker and footwear storefront where you can browse styles for men, women, and kids.";
    }

    if (has(/\b(how can i|how do i|how to|can i|want to|place|placing|make|buy|purchase|order|shop|kharid|lena)\b/) &&
        has(/\b(order|buy|purchase|checkout|shop|product|pair|shoes|kharid|lena)\b/)) {
      return romanUrdu
        ? "Products browse karein aur pasandida pair par bag icon dabakar cart mein add karein. Navbar se cart khol kar Checkout par jayein. Checkout se pehle Login ya Sign Up karein; yeh sirf preview sign-in hai, asal account nahi banta. Phir delivery details bharein, Cash on Delivery select karke “Review cash-on-delivery order” dabayein. Yeh checkout preview hai—order store ko send ya confirm nahi hota aur payment process nahi hoti."
        : "Browse the products and tap the bag icon on a pair to add it to your cart. Open the cart from the navbar and choose Checkout. You’ll be asked to use Login or Sign Up first; this is only a preview sign-in and does not create a real account. Then enter your delivery details, select Cash on Delivery, and click “Review cash-on-delivery order.” Checkout is a preview: it does not send or confirm the order with the store, and no payment is processed.";
    }

    if (has(/\b(contact|contacting|reach|email|e mail|mail|phone|call|owner|rabta|raabta|rabtay|phone number|contact number|your number|number to contact)\b/)) {
      return { type: "contact" };
    }

    if (has(/\b(card|credit|debit|payment|payments|pay|paid|cash on delivery|cod|naqad|cash)\b/)) {
      const asksCard = has(/\b(card|credit|debit)\b/);
      const asksCod = has(/\b(cash on delivery|cod|naqad|cash)\b/);
      if (asksCard && asksCod) {
        return romanUrdu
          ? "Card payment connect nahi, aur COD checkout sirf preview hai. Website abhi koi asal payment process ya order submit nahi karti."
          : "Card payments are not connected, and Cash on Delivery is only shown as a checkout preview. The site currently processes no real payments or orders.";
      }
      if (asksCard) {
        return romanUrdu
          ? "Checkout par card ka option nazar aata hai, lekin card payment abhi connect nahi. Is waqt card se asal payment nahi ho sakti; card details bhi nahi maangi ya save ki jati."
          : "The checkout shows a card option, but card payments are not connected yet. You cannot complete an actual card payment right now, and the site does not ask for or store card details.";
      }
      if (has(/\b(cash on delivery|cod|naqad)\b/)) {
        return romanUrdu
          ? "Checkout mein Cash on Delivery ka option bana hua hai, lekin website abhi preview hai—order store ko submit ya confirm nahi hota. Is liye filhaal asal COD order place nahi ho sakta."
          : "Checkout includes a Cash on Delivery option, but this website is still a preview and does not submit or confirm orders. An actual COD order cannot be placed yet.";
      }
      return romanUrdu
        ? "Checkout mein COD ka preview option hai; card payment abhi connect nahi. Website filhaal order ya payment process nahi karti."
        : "The checkout preview includes Cash on Delivery, while card payments are not connected yet. The site does not currently process real orders or payments.";
    }

    if (has(/\b(delivery|deliver|shipping|ship|courier|dispatch|free delivery|delivery charges|shipping charges|pohanch|pohanche|bhej|bhejte)\b/)) {
      return romanUrdu
        ? "Checkout preview mein delivery Free dikhai gayi hai, lekin asal delivery area, charges aur time abhi confirm nahi. Order se pehle store se rabta karein."
        : "The checkout preview currently displays free delivery, but actual delivery areas, fees, and timings have not been confirmed. Please contact the store before placing an order.";
    }

    if (has(/\b(return|returns|refund|exchange|replace|replacement|wapis|wapas|tabdeel)\b/)) {
      return romanUrdu
        ? "Shipping & Returns page ke mutabiq, item wapas bhejne se pehle store se rabta karein; shoes unworn aur original packing mein rakhein. Eligibility, exchange aur charges confirm kar lein. Rabta: 03706220584 ya abdullahraufrana786@gmai.com."
        : "The Shipping & Returns page advises contacting the store before sending an item back and keeping it unworn in its original packaging. Confirm eligibility, exchanges, and any costs first. Contact: 03706220584 or abdullahraufrana786@gmai.com.";
    }

    if (has(/\b(size guide|size chart|shoe size|foot size|size|sizing|measure|measurement|fit|sizing guide|paon|pao|number ka size)\b/)) {
      return romanUrdu
        ? "Size maloom karne ke liye dono paon wall ke saath paper par measure karein, bari measurement use karein, phir Size Guide dekhein. Har brand ka fit thora mukhtalif ho sakta hai: size-guide.html"
        : "Measure both feet against a wall on paper, use the longer measurement, then compare it with our indicative Size Guide. Fit can vary by brand: size-guide.html";
    }

    if (has(/\b(login|log in|sign up|signup|account|google|password|register|registration|account bana)\b/)) {
      return romanUrdu
        ? "Login aur Sign Up page par available hain, lekin account/authentication abhi preview hai. Google sign-in bhi connect nahi, aur credentials bheje ya save nahi hote: accounts.html"
        : "The Login and Sign Up forms are available as a preview, but authentication is not connected. Google sign-in is also unavailable, and credentials are not sent or stored: accounts.html";
    }

    if (has(/\b(favourite|favorites|favourites|wishlist|heart|save for later|pasandida|dil)\b/)) {
      return romanUrdu
        ? "Product card par heart icon dabane se item aapke browser ki Favourites list mein save hota hai. Saved pairs yahan dekhein: favorites.html"
        : "Tap the heart on a product card to save it to this browser’s Favourites list. View saved pairs here: favorites.html";
    }

    if (has(/\b(cart|bag|basket|shopping bag|add to cart|remove item|quantity|checkout|check out|order summary)\b/)) {
      return romanUrdu
        ? "Product ke bag icon se item cart mein add karein; navbar bag icon se quantity badal ya kam karein. Checkout par jane se pehle Login ya Sign Up ka preview step aayega. Is se real account nahi banta, aur checkout se asal order submit nahi hota."
        : "Use a product’s bag icon to add it to your cart, then open the navbar bag to update quantities. Login or Sign Up is required before checkout, but this is only a preview sign-in and does not create a real account. Checkout does not submit an actual order.";
    }

    if (has(/\b(search|find a product|find products|dhoond|talash)\b/)) {
      return romanUrdu
        ? "Navbar mein search icon dabayein aur product ke naam ke shuru ke letters likhein. Search naam ke start se match karta hai."
        : "Open the search icon in the navbar and type the first letters of a product name. Search matches product names from the beginning.";
    }

    if (has(/\b(brand|brands|collection|women|woman|men|kids|children|accessories|products|product list|catalog|catalogue)\b/) && !hasProductNeed(text)) {
      return romanUrdu
        ? "Website par men's, women's, kids, accessories, brands aur collection sections hain. Navigation se category khol sakte hain, ya mujhe shoes ki apni requirement batayein."
        : "The site has Men's, Women's, Kids, Accessories, Brands, and Collection sections. Use the navigation to browse, or tell me what kind of shoes you need and I’ll suggest products.";
    }

    if (has(/\b(who are you|what are you|who is this|tum kon|aap kon|ap kon|what can you do|help|madad)\b/)) {
      return romanUrdu
        ? "Main SOLE ka store assistant hoon. Products suggest karne ke ilawa contact, sizes, payment options, delivery, returns aur website use karne mein madad kar sakta hoon."
        : "I’m the SOLE store assistant. I can suggest products and answer questions about contact, sizing, payment options, delivery, returns, and using the website.";
    }

    if (has(/\b(ai|artificial intelligence|chatbot|bot)\b/)) {
      return romanUrdu
        ? "Main is waqt AI service nahi hoon; main store ke products aur maloomat par based rules se jawab aur recommendations deta hoon."
        : "I’m not connected to a generative AI service. I use rules based on the store’s products and information to answer questions and suggest pairs.";
    }

    return null;
  };

  const processUserMessage = (rawText, text, romanUrdu) => {
    if (/^(hi|hello|hey|salam|assalam|assalamualaikum|aoa|hello there)(\s|$)/i.test(text) && !hasProductNeed(text)) {
      makeMessage(romanUrdu
        ? "Wa-alaikum-assalam! Main products dhoondhne ke saath store ke contact, payment, delivery, returns aur website ke sawalon mein bhi madad kar sakta hoon. Kya jaan'na chahenge?"
        : "Hi! I can help find products and answer questions about store contact, payments, delivery, returns, and using the website. What would you like to know?", "bot");
      return;
    }

    if (/\b(thank|thanks|shukriya|jazakallah)\b/i.test(text) && !hasProductNeed(text)) {
      makeMessage(romanUrdu
        ? "Khushi hui madad karke! Koi aur sawal ho ya pair dhoondhna ho to pooch lein."
        : "You’re welcome! Ask me another question or tell me what kind of pair you’re looking for.", "bot");
      return;
    }

    const storeAnswer = getStoreAnswer(text, romanUrdu);
    if (storeAnswer) {
      if (storeAnswer.type === "contact") {
        makeContactMessage(romanUrdu);
      } else {
        makeMessage(storeAnswer, "bot");
      }
      return;
    }

    const isUnrelatedQuestion =
      /^(what is|who is|who are you|where is|when is|why is|how to|how can|how do|tell me about|define|capital of|weather|news|kya haal|tum kon|ap kon|aap kon|kitne bajay)\b/i.test(text) &&
      !hasProductNeed(text);
    if (isUnrelatedQuestion && !hasProductNeed(text)) {
      makeMessage(romanUrdu
        ? "Main SOLE ka store assistant hoon. Main sneakers suggest kar sakta hoon aur store ke contact, payment, delivery, returns aur website ke bare mein bata sakta hoon."
        : "I’m the SOLE store assistant. I can suggest sneakers and answer questions about store contact, payments, delivery, returns, and the website.", "bot");
      return;
    }

    updateRequirements(text, rawText);
    if (!hasProductNeed(text) && requirements.category === null && requirements.styles.size === 0 && requirements.colors.size === 0 && requirements.budget === null) {
      makeMessage(romanUrdu
        ? "Main aapki baat theek samajhna chahta hoon. Aap website, contact, payment, delivery, returns ya size ke bare mein pooch sakte hain—ya men's, women's, kids, use, rang aur budget bata kar shoes dhoondh sakte hain."
        : "I want to make sure I understand. Ask me about the website, contact, payment, delivery, returns, or sizing—or tell me who the shoes are for, the use, colour, and budget so I can find a pair.", "bot");
      return;
    }

    renderRecommendations(romanUrdu);
  };

  let isReplying = false;
  const handleUserMessage = (rawText) => {
    const text = normalize(rawText);
    if (!text || isReplying) return;
    makeMessage(rawText.trim(), "user");
    const romanUrdu =
      /\b(ma|mujhe|chahiye|ke liye|koi|mera|meri|mujh|dhoond|dhoondh|ker|kar|acha|achay|batao|ap|aap|hain|hai|lena|kharid|ka|ki|ko|kya|kese|kaise|bta|bata|sakta|sakti)\b/i.test(text);

    isReplying = true;
    submitButton.disabled = true;
    promptButtons.forEach((button) => {
      button.disabled = true;
    });

    const typingIndicator = makeTypingIndicator();
    window.setTimeout(() => {
      typingIndicator.remove();
      try {
        processUserMessage(rawText, text, romanUrdu);
      } finally {
        isReplying = false;
        submitButton.disabled = false;
        promptButtons.forEach((button) => {
          button.disabled = false;
        });
        if (!panel.hidden) input.focus();
      }
    }, 500);
  };

  const open = () => {
    panel.hidden = false;
    launcher.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    window.setTimeout(() => input.focus(), 80);
  };
  const close = () => {
    panel.hidden = true;
    launcher.classList.remove("is-open");
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  };

  launcher.setAttribute("aria-controls", panel.id);
  launcher.addEventListener("click", () => (panel.hidden ? open() : close()));
  closeButton.addEventListener("click", close);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isReplying) return;
    const value = input.value;
    input.value = "";
    handleUserMessage(value);
  });
  promptButtons.forEach((button) => {
    button.addEventListener("click", () => handleUserMessage(button.dataset.prompt ?? ""));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) close();
  });

  makeMessage("Assalam-o-alaikum! Shoes suggest karne ke liye apni zaroorat bata dein—kis ke liye, use, rang ya budget. Store ke contact, size, delivery aur payment ke bare mein bhi pooch sakte hain.", "bot");
};

createSoleFinder();
