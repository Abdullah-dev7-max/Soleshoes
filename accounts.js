const accountTabs = document.querySelectorAll("[data-account-tab]");
const accountForms = document.querySelectorAll("[data-account-form]");
const accountNotice = document.querySelector("#account-notice");
const previewAuthKey = "sole-preview-auth";
const continueToCheckout = new URLSearchParams(window.location.search).get("return") === "checkout";

if (continueToCheckout && sessionStorage.getItem(previewAuthKey) === "signed-in") {
  window.location.replace("checkout.html");
} else if (continueToCheckout) {
  accountNotice.textContent =
    "Please log in or sign up to continue to checkout. This is a preview sign-in only; it does not create a real account.";
  accountNotice.hidden = false;
}

const setAccountTab = (name) => {
  for (const tab of document.querySelectorAll(".account-tabs [data-account-tab]")) {
    const isActive = tab.dataset.accountTab === name;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  }

  for (const form of accountForms) {
    form.hidden = form.dataset.accountForm !== name;
  }

  accountNotice.hidden = true;
};

for (const tab of accountTabs) {
  tab.addEventListener("click", () => {
    setAccountTab(tab.dataset.accountTab);
  });
}

for (const form of accountForms) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sessionStorage.setItem(previewAuthKey, "signed-in");
    form.reset();

    if (continueToCheckout) {
      window.location.replace("checkout.html");
      return;
    }

    accountNotice.textContent =
      "Preview sign-in is active for this tab. No real account was created, and your credentials were not sent or saved.";
    accountNotice.hidden = false;
  });
}

document.querySelectorAll("[data-account-option]").forEach((option) => {
  option.addEventListener("click", () => {
    accountNotice.textContent =
      `${option.dataset.accountOption} will be available when your SOLE account is connected.`;
    accountNotice.hidden = false;
  });
});

document.querySelectorAll("[data-google-continue]").forEach((button) => {
  button.addEventListener("click", () => {
    accountNotice.textContent =
      "Google sign-in is not connected yet. No account data was sent or saved.";
    accountNotice.hidden = false;
  });
});
