const accountTabs = document.querySelectorAll("[data-account-tab]");
const accountForms = document.querySelectorAll("[data-account-form]");
const accountNotice = document.querySelector("#account-notice");
const previewAuthKey = "sole-preview-auth";
const continueToCheckout = new URLSearchParams(window.location.search).get("return") === "checkout";
const checkoutPath = "../pages/checkout.html";
let accountNoticeTimer;

const showAccountNotice = (message, { checkoutRequired = false } = {}) => {
  window.clearTimeout(accountNoticeTimer);
  accountNotice.textContent = message;
  accountNotice.classList.toggle("account-notice--checkout", checkoutRequired);
  accountNotice.hidden = false;

  if (checkoutRequired) {
    accountNoticeTimer = window.setTimeout(() => {
      accountNotice.hidden = true;
      accountNotice.classList.remove("account-notice--checkout");
    }, 10000);
  }
};

if (continueToCheckout && sessionStorage.getItem(previewAuthKey) === "signed-in") {
  window.location.replace(checkoutPath);
} else if (continueToCheckout) {
  showAccountNotice("Please log in first to place your order.", {
    checkoutRequired: true,
  });
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

  window.clearTimeout(accountNoticeTimer);
  accountNotice.hidden = true;
  accountNotice.classList.remove("account-notice--checkout");
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
      window.location.replace(checkoutPath);
      return;
    }

    showAccountNotice(
      "Preview sign-in is active for this tab. No real account was created, and your credentials were not sent or saved.",
    );
  });
}

document.querySelectorAll("[data-account-option]").forEach((option) => {
  option.addEventListener("click", () => {
    showAccountNotice(
      `${option.dataset.accountOption} will be available when your SOLE account is connected.`,
    );
  });
});

document.querySelectorAll("[data-google-continue]").forEach((button) => {
  button.addEventListener("click", () => {
    showAccountNotice(
      "Google sign-in is not connected yet. No account data was sent or saved.",
    );
  });
});
