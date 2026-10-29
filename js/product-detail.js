const productDetail = document.querySelector("#product-detail");
const productNotFound = document.querySelector("#product-not-found");
const productId = new URLSearchParams(window.location.search).get("id");
const selectedProduct = allProducts.find((product) => product.id === productId);

if (!(productDetail instanceof HTMLElement) || !(productNotFound instanceof HTMLElement)) {
  throw new Error("Product detail page is missing required markup.");
}

if (!selectedProduct) {
  productNotFound.hidden = false;
  document.title = "Product Not Found — SOLE";
} else {
  productDetail.hidden = false;
  const productSections = [
    document.querySelector("#product-detail-terms"),
    document.querySelector("#product-detail-reviews"),
    document.querySelector("#product-detail-suggestions"),
  ];
  if (!productSections.every((section) => section instanceof HTMLElement)) {
    throw new Error("Product detail page is missing its information sections.");
  }
  productSections.forEach((section) => {
    section.hidden = false;
  });
  document.title = `${selectedProduct.name} — SOLE`;

  const productImage = document.querySelector("#product-image");
  const breadcrumbName = document.querySelector("#product-breadcrumb-name");
  const category = document.querySelector("#product-category");
  const name = document.querySelector("#product-name");
  const price = document.querySelector("#product-price");
  const description = document.querySelector("#product-description");
  const sizes = document.querySelector("#product-sizes");
  const status = document.querySelector("#product-status");
  const addButton = document.querySelector("#product-add");
  const buyButton = document.querySelector("#product-buy");
  const favoriteButton = document.querySelector("#product-favorite");

  if (
    !(productImage instanceof HTMLImageElement) ||
    !(breadcrumbName instanceof HTMLElement) ||
    !(category instanceof HTMLElement) ||
    !(name instanceof HTMLElement) ||
    !(price instanceof HTMLElement) ||
    !(description instanceof HTMLElement) ||
    !(sizes instanceof HTMLElement) ||
    !(status instanceof HTMLElement) ||
    !(addButton instanceof HTMLButtonElement) ||
    !(buyButton instanceof HTMLButtonElement) ||
    !(favoriteButton instanceof HTMLButtonElement)
  ) {
    throw new Error("Product detail page is missing required product fields.");
  }

  breadcrumbName.textContent = selectedProduct.name;
  category.textContent = selectedProduct.category;
  name.textContent = selectedProduct.name;
  price.textContent = formatPKR(selectedProduct.pricePkr);
  description.textContent = selectedProduct.description;
  productImage.src = resolveProductImage(selectedProduct.image);
  productImage.alt = selectedProduct.imageAlt;

  let selectedSize = "";
  const isKidsProduct = selectedProduct.category.toLowerCase().includes("kids");
  const availableSizes = isKidsProduct
    ? ["28", "29", "30", "31", "32", "33", "34", "35"]
    : ["38", "39", "40", "41", "42", "43", "44", "45"];

  for (const size of availableSizes) {
    const option = document.createElement("button");
    option.className = "product-detail__size";
    option.type = "button";
    option.textContent = size;
    option.setAttribute("aria-pressed", "false");
    option.setAttribute("aria-label", `EU size ${size}`);
    option.addEventListener("click", () => {
      selectedSize = size;
      sizes.querySelectorAll(".product-detail__size").forEach((sizeOption) => {
        sizeOption.classList.toggle("is-selected", sizeOption === option);
        sizeOption.setAttribute("aria-pressed", String(sizeOption === option));
      });
      status.textContent = `EU ${size} selected.`;
    });
    sizes.append(option);
  }

  const savedProductIds = new Set(
    readStoredProducts(FAVORITES_STORAGE_KEY).map((product) => product.id),
  );
  const updateFavoriteButton = () => {
    const isFavorite = savedProductIds.has(selectedProduct.id);
    favoriteButton.classList.toggle("is-active", isFavorite);
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.setAttribute(
      "aria-label",
      isFavorite ? "Remove from favourites" : "Add to favourites",
    );
  };
  updateFavoriteButton();

  favoriteButton.addEventListener("click", () => {
    toggleStoredProduct(FAVORITES_STORAGE_KEY, selectedProduct);
    if (savedProductIds.has(selectedProduct.id)) {
      savedProductIds.delete(selectedProduct.id);
    } else {
      savedProductIds.add(selectedProduct.id);
    }
    updateFavoriteButton();
    updateStoreControls();
  });

  const addSelectedSizeToCart = () => {
    if (!selectedSize) {
      status.textContent = "Please select your shoe size before adding this pair.";
      sizes.querySelector(".product-detail__size")?.focus();
      return false;
    }
    addCartProduct({ ...selectedProduct, selectedSize });
    updateStoreControls();
    status.textContent = `Added to your bag in EU size ${selectedSize}.`;
    return true;
  };

  addButton.addEventListener("click", addSelectedSizeToCart);
  buyButton.addEventListener("click", () => {
    if (!addSelectedSizeToCart()) {
      return;
    }
    window.location.href = sessionStorage.getItem("sole-preview-auth") === "signed-in"
      ? `${SITE_ROOT}pages/checkout.html`
      : `${SITE_ROOT}pages/accounts.html?return=checkout`;
  });

  const recommendations = allProducts
    .filter((product) => product.id !== selectedProduct.id)
    .sort((first, second) =>
      Number(second.category === selectedProduct.category) -
      Number(first.category === selectedProduct.category),
    )
    .slice(0, 4);
  renderProductGrid("#related-product-grid", recommendations);
}
