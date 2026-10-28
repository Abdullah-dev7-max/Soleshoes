const INFO_PAGE_ROOT = window.location.pathname.includes("/pages/") ? "../" : "";

const infoPages = {
  contact: {
    title: "Contact Us",
    eyebrow: "HERE WHEN YOU NEED US",
    description: "Questions about a pair, sizing, or your next step? Get in touch with the SOLE team.",
    content: `
      <div class="info-card-grid">
        <article class="info-card info-contact-card">
          <span class="info-card__eyebrow">EMAIL</span>
          <h2>Write to us</h2>
          <p>For product, fit, or order questions, send us a message and include any details that will help us assist you.</p>
          <a class="info-contact-link" href="mailto:abdullahraufrana786@gmai.com">abdullahraufrana786@gmai.com <span aria-hidden="true">↗</span></a>
        </article>
        <article class="info-card info-contact-card">
          <span class="info-card__eyebrow">PHONE</span>
          <h2>Give us a call</h2>
          <p>Prefer to speak with someone? Call us about products, sizing, or general store questions.</p>
          <a class="info-contact-link" href="tel:03706220584">03706220584 <span aria-hidden="true">↗</span></a>
        </article>
      </div>
      <p class="info-note"><strong>Store preview:</strong> Contact details are provided by the store owner. Support hours and response times have not been specified.</p>
    `,
  },
  faq: {
    title: "Frequently Asked Questions",
    eyebrow: "A FEW QUICK ANSWERS",
    description: "Helpful notes about finding a pair, sizing, and using the SOLE storefront.",
    content: `
      <div class="info-faq-list">
        <details class="info-faq" open><summary>How do I find the right pair?</summary><p>Browse the collection by category or use the search icon in the navigation. Product cards include the available description and displayed price.</p></details>
        <details class="info-faq"><summary>How should I choose my size?</summary><p>Measure your foot and compare it with the indicative chart on our <a href="size-guide.html">Size Guide</a>. When between sizes, consider the wider foot and the fit you prefer.</p></details>
        <details class="info-faq"><summary>Can I save products for later?</summary><p>Yes. Tap the heart on a product card to add it to your favourites. Your saved list is kept in this browser.</p></details>
        <details class="info-faq"><summary>Can I place an order or make a payment here?</summary><p>This storefront is a design preview. Checkout and payment processing are not connected, so no order or payment can be completed here.</p></details>
        <details class="info-faq"><summary>How do shipping and returns work?</summary><p>See the <a href="shipping-returns.html">Shipping &amp; Returns</a> page for general sample guidance. Confirm the final terms with the store before purchasing.</p></details>
        <details class="info-faq"><summary>How can I contact SOLE?</summary><p>Email <a href="mailto:abdullahraufrana786@gmai.com">abdullahraufrana786@gmai.com</a> or call <a href="tel:03706220584">03706220584</a>.</p></details>
      </div>
    `,
  },
  shipping: {
    title: "Shipping & Returns",
    eyebrow: "DELIVERY, MADE CLEAR",
    description: "A simple overview of delivery and return expectations for your SOLE purchase.",
    content: `
      <div class="info-policy-banner"><span aria-hidden="true">✦</span><p><strong>Sample policy for this storefront preview.</strong> Delivery coverage, timelines, fees, and return terms must be confirmed by the store before accepting orders.</p></div>
      <div class="info-split">
        <article class="info-card"><span class="info-card__eyebrow">DELIVERY</span><h2>Getting your pair to you</h2><ul class="info-list"><li>Delivery coverage and charges depend on the destination.</li><li>Orders are normally prepared after the order details are confirmed.</li><li>Transit time can vary due to location, courier schedules, and public holidays.</li><li>Keep your contact details available so the courier can coordinate delivery.</li></ul></article>
        <article class="info-card"><span class="info-card__eyebrow">RETURNS</span><h2>If the fit is not right</h2><ul class="info-list"><li>Contact the store before sending an item back.</li><li>Keep the shoes unworn and return them with their original packaging.</li><li>Include your order reference and a short note describing the issue.</li><li>Eligibility, exchange options, and any return costs must be confirmed with the store.</li></ul></article>
      </div>
      <div class="info-callout"><h2>Need help with an order?</h2><p>Contact us before arranging a return so we can confirm the next steps.</p><a class="info-button" href="contact.html">Contact the store <span aria-hidden="true">→</span></a></div>
    `,
  },
  size: {
    title: "Size Guide",
    eyebrow: "A MORE COMFORTABLE FIT",
    description: "Use foot length as a starting point, then compare the conversion with the sizing on your preferred pair.",
    content: `
      <div class="info-policy-banner"><span aria-hidden="true">✦</span><p><strong>Indicative sizing only.</strong> Conversions differ between brands and shoe shapes. Check the product details or contact the store if you are unsure.</p></div>
      <article class="info-card info-measure-card"><span class="info-card__eyebrow">STEP 01 · MEASURE</span><h2>Measure both feet at home</h2><ol class="info-steps"><li>Place a sheet of paper against a wall on a hard floor.</li><li>Stand on it with your heel lightly touching the wall.</li><li>Mark the end of your longest toe and measure from the wall to the mark.</li><li>Repeat for the other foot and use the longer measurement.</li></ol></article>
      <div class="info-table-wrap"><table class="info-size-table"><caption>Approximate adult size conversion</caption><thead><tr><th scope="col">Foot length</th><th scope="col">EU</th><th scope="col">UK</th><th scope="col">US men</th></tr></thead><tbody><tr><td>24.0 cm</td><td>38</td><td>5</td><td>6</td></tr><tr><td>25.0 cm</td><td>40</td><td>6.5</td><td>7</td></tr><tr><td>26.0 cm</td><td>41</td><td>7.5</td><td>8</td></tr><tr><td>27.0 cm</td><td>42.5</td><td>8.5</td><td>9</td></tr><tr><td>28.0 cm</td><td>44</td><td>9.5</td><td>10</td></tr><tr><td>29.0 cm</td><td>45</td><td>10.5</td><td>11</td></tr></tbody></table></div>
      <p class="info-note">If your measurement falls between sizes, or one foot is longer, use the larger foot as your guide. For a personal recommendation, <a href="contact.html">contact us</a>.</p>
    `,
  },
  story: {
    title: "Our Story",
    eyebrow: "MADE FOR EVERY STEP",
    description: "SOLE is built around a simple idea: everyday sneakers should feel as good as they look.",
    content: `
      <article class="info-story-card"><span class="info-card__eyebrow">THE SOLE POINT OF VIEW</span><h2>Find your fit. Make it your own.</h2><p>We believe the right pair does more than finish an outfit. It gives you the confidence to take the long way, try something new, and feel at home wherever the day leads.</p><p>SOLE brings together versatile silhouettes, considered details, and easy-to-wear styles for the everyday rotation.</p></article>
      <div class="info-card-grid"><article class="info-card"><span class="info-card__eyebrow">OUR APPROACH</span><h2>Everyday, considered</h2><p>We keep the edit focused on wearable styles that are easy to make your own.</p></article><article class="info-card"><span class="info-card__eyebrow">OUR PROMISE</span><h2>Choose with confidence</h2><p>Clear product details, fit guidance, and helpful support should make choosing your next pair feel simple.</p></article></div>
      <div class="info-callout"><h2>Your next step starts here.</h2><p>Explore the latest pairs and find the one that feels like you.</p><a class="info-button" href="${INFO_PAGE_ROOT}index.html#product-grid">Discover sneakers <span aria-hidden="true">→</span></a></div>
    `,
  },
  fit: {
    title: "Find Your Fit",
    eyebrow: "COMFORT STARTS HERE",
    description: "A few thoughtful checks can help you choose a pair that feels right from the first step.",
    content: `
      <div class="info-fit-grid">
        <article class="info-card info-fit-card"><span class="info-step-number">01</span><span class="info-card__eyebrow">START WITH A MEASURE</span><h2>Check your foot length</h2><p>Measure both feet at the end of the day, when they are naturally at their largest. Use the longer measurement as your reference.</p></article>
        <article class="info-card info-fit-card"><span class="info-step-number">02</span><span class="info-card__eyebrow">THINK ABOUT SOCKS</span><h2>Wear your usual pair</h2><p>Try shoes with the socks you plan to wear most often. This gives you a more realistic sense of room and comfort.</p></article>
        <article class="info-card info-fit-card"><span class="info-step-number">03</span><span class="info-card__eyebrow">CHECK THE TOE ROOM</span><h2>Leave a little space</h2><p>Your toes should be able to move comfortably without the heel slipping. The fit should feel secure, not tight.</p></article>
        <article class="info-card info-fit-card"><span class="info-step-number">04</span><span class="info-card__eyebrow">COMPARE BOTH FEET</span><h2>Fit the larger foot</h2><p>It is common for one foot to be slightly longer. Choose a size that accommodates the larger foot and use the <a href="size-guide.html">size guide</a> as a starting point.</p></article>
      </div>
      <p class="info-note">Fit varies by style and brand. If you have questions about a specific pair, <a href="contact.html">reach out to us</a>.</p>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    eyebrow: "YOUR INFORMATION, RESPECTED",
    description: "A plain-language overview of how this storefront preview handles information.",
    content: `
      <div class="info-policy-banner"><span aria-hidden="true">✦</span><p><strong>Preview notice.</strong> This is general sample privacy information, not a substitute for a policy reviewed for a live business.</p></div>
      <div class="info-legal"><section><h2>Information you enter</h2><p>The login and sign-up forms on this preview are demonstrations only. They do not authenticate users or send or store the credentials entered.</p></section><section><h2>Saved favourites and cart</h2><p>Favourites and cart items are stored in your browser using local storage so they remain available on this device. You can remove saved items from the site or clear your browser storage.</p></section><section><h2>Orders and payments</h2><p>Checkout and payment processing are not connected on this preview. Do not submit payment details through this website.</p></section><section><h2>Contact</h2><p>For questions about this sample notice, contact <a href="mailto:abdullahraufrana786@gmai.com">abdullahraufrana786@gmai.com</a> or call <a href="tel:03706220584">03706220584</a>.</p></section><p class="info-note">A live store should publish a complete policy describing its actual data collection, service providers, retention periods, and applicable user rights.</p></div>
    `,
  },
  terms: {
    title: "Terms of Service",
    eyebrow: "A FEW IMPORTANT NOTES",
    description: "These sample terms explain the current SOLE storefront preview and its limitations.",
    content: `
      <div class="info-policy-banner"><span aria-hidden="true">✦</span><p><strong>Preview notice.</strong> This page is general sample copy and has not been reviewed as legal terms for a live business.</p></div>
      <div class="info-legal"><section><h2>Storefront preview</h2><p>This website is a product and design preview. Product listings, descriptions, and displayed prices are illustrative and may change.</p></section><section><h2>No completed orders</h2><p>Checkout and payment services are not connected. Adding an item to the cart does not place an order or reserve inventory.</p></section><section><h2>Product information</h2><p>We aim to present products clearly, but images, colors, availability, and sizing details may vary. Contact the store if you need confirmation before making a decision.</p></section><section><h2>Using the website</h2><p>Please use the site lawfully and do not interfere with its operation or attempt to misuse its content or features.</p></section><section><h2>Questions</h2><p>For questions about these sample terms, contact <a href="mailto:abdullahraufrana786@gmai.com">abdullahraufrana786@gmai.com</a> or call <a href="tel:03706220584">03706220584</a>.</p></section><p class="info-note">Before accepting real orders, the store owner should replace this sample with complete terms that reflect the actual business and applicable law.</p></div>
    `,
  },
};

const pageKey = document.body.dataset.infoPage;
const page = infoPages[pageKey];

if (!page) {
  throw new Error(`Unknown information page: ${pageKey}`);
}

document.title = `${page.title} — SOLE`;
document.body.innerHTML = `
  <header class="site-header site-header--light">
    <a class="brand" href="${INFO_PAGE_ROOT}index.html#collection" aria-label="SOLE home"><span class="brand__mark" aria-hidden="true">S</span><span>SOLE<span class="brand__period">.</span></span></a>
    <nav class="site-nav" aria-label="Main navigation">
      <a href="${INFO_PAGE_ROOT}index.html#collection">Men</a><a href="${INFO_PAGE_ROOT}pages/women.html">Women</a><a href="${INFO_PAGE_ROOT}pages/kids.html">Kids</a><a href="${INFO_PAGE_ROOT}pages/accessories.html">Accessories</a><a href="${INFO_PAGE_ROOT}pages/collection.html">Collection</a><a href="${INFO_PAGE_ROOT}pages/brands.html">Brands</a>
    </nav>
    <div class="header-actions" aria-label="Store shortcuts">
      <form class="header-search" role="search">
        <button class="header-search-trigger" type="button" aria-label="Open product search" aria-expanded="false" aria-controls="header-search-results"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6"></circle><path d="m16 16 4.2 4.2"></path></svg></button>
        <input class="header-search__input" type="search" aria-label="Search products" placeholder="Search..." autocomplete="off" tabindex="-1">
        <button class="header-search__close" type="button" aria-label="Close search" tabindex="-1">&times;</button>
        <div class="header-search__results" id="header-search-results" hidden><p class="header-search__status" role="status" aria-live="polite"></p><div class="header-search__suggestions"></div><div class="header-search__products"></div></div>
      </form>
      <a class="header-icon header-account" href="${INFO_PAGE_ROOT}pages/accounts.html" aria-label="My account"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.2"></circle><path d="M5.8 20c.4-3.5 2.6-5.5 6.2-5.5s5.8 2 6.2 5.5"></path></svg></a>
      <a class="header-icon header-favorites" href="${INFO_PAGE_ROOT}pages/favorites.html" aria-label="Favourites"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 8.8c0 4.3-8.4 10-8.4 10s-8.4-5.7-8.4-10a4.2 4.2 0 0 1 8.4-1 4.2 4.2 0 0 1 8.4 1Z"></path></svg><span class="header-count" hidden></span></a>
      <button class="header-icon header-icon--bag header-cart" type="button" aria-label="Shopping bag"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 12H4L5 8Z"></path><path d="M9 9V6a3 3 0 0 1 6 0v3"></path></svg><span class="bag-count" hidden></span></button>
    </div>
  </header>
  <main class="info-page">
    <nav class="info-breadcrumb" aria-label="Breadcrumb"><a href="${INFO_PAGE_ROOT}index.html">Home</a><span aria-hidden="true">/</span><span>${page.title}</span></nav>
    <section class="info-hero"><div><p class="info-hero__eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p>${page.description}</p></div><div class="info-hero__mark" aria-hidden="true">S<span>.</span></div></section>
    <section class="info-content" aria-label="${page.title} information">${page.content}</section>
    <div class="info-back-link"><a href="${INFO_PAGE_ROOT}index.html#collection"><span aria-hidden="true">←</span> Back to the collection</a></div>
  </main>
  <footer class="site-footer">
    <div class="footer-main">
      <div class="footer-brand-column"><a class="footer-brand" href="${INFO_PAGE_ROOT}index.html#collection">SOLE<span>.</span></a><p>Everyday sneakers for wherever life takes you. Find your fit and make every step your own.</p><div class="footer-socials" aria-label="Social media"><a href="${INFO_PAGE_ROOT}index.html#collection" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle class="footer-socials__dot" cx="17.7" cy="6.8" r="1"></circle></svg></a><a href="${INFO_PAGE_ROOT}index.html#collection" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.5a4 4 0 1 1-3-3.9M14 4c.5 2.8 2.3 4.7 5 5.2"></path></svg></a><a href="${INFO_PAGE_ROOT}index.html#collection" aria-label="Pinterest"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 3.5c-4.7 0-7.6 3.2-7.6 6.8 0 2.1.8 4 2.5 4.7.3.1.5 0 .6-.3l.3-1c.1-.3.1-.4-.2-.7-.5-.6-.8-1.4-.8-2.5 0-3.2 2.4-6.1 6.2-6.1 3.4 0 5.2 2.1 5.2 4.9 0 3.7-1.6 6.8-4 6.8-1.3 0-2.2-1.1-1.9-2.4.4-1.6 1.1-3.3 1.1-4.4 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.4-2.3 3.2 0 1.2.4 2 .4 2s-1.4 5.8-1.7 6.8c-.5 2-.1 4.5 0 4.7.1.1.2.1.3 0 .1-.2 1.9-2.3 2.5-4.2l.8-3.1c.4.8 1.7 1.4 3 1.4 4 0 6.7-3.6 6.7-8.5 0-3.7-3.1-7.2-7.5-7.2Z"></path></svg></a></div></div>
      <div class="footer-links"><h2>Shop</h2><a href="${INFO_PAGE_ROOT}index.html#product-grid">New Arrivals</a><a href="${INFO_PAGE_ROOT}index.html#collection">Men's Sneakers</a><a href="${INFO_PAGE_ROOT}pages/women.html">Women's Sneakers</a><a href="${INFO_PAGE_ROOT}pages/kids.html">Kids' Sneakers</a></div>
      <div class="footer-links"><h2>Help</h2><a href="${INFO_PAGE_ROOT}pages/contact.html">Contact Us</a><a href="${INFO_PAGE_ROOT}pages/faq.html">FAQs</a><a href="${INFO_PAGE_ROOT}pages/shipping-returns.html">Shipping &amp; Returns</a><a href="${INFO_PAGE_ROOT}pages/size-guide.html">Size Guide</a></div>
      <div class="footer-links"><h2>About</h2><a href="${INFO_PAGE_ROOT}pages/our-story.html">Our Story</a><a href="${INFO_PAGE_ROOT}pages/find-your-fit.html">Find Your Fit</a><a href="${INFO_PAGE_ROOT}pages/privacy-policy.html">Privacy Policy</a><a href="${INFO_PAGE_ROOT}pages/terms-of-service.html">Terms of Service</a></div>
    </div>
    <div class="footer-bottom"><p>© 2026 SOLE. All rights reserved.</p><p>Made for every step.</p></div>
  </footer>
`;
