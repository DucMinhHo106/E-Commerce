/* =====================================================
   js/app.js – App Bootstrap & Global Bindings
   ===================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ── Register pages with Router ── */
    Router.register('home', () => HomePage.init());
    Router.register('products', params => ProductsPage.enter(params));
    Router.register('detail', params => DetailPage.enter(params));
    Router.register('cart', () => CartPage.enter());
    Router.register('checkout', () => CheckoutPage.enter());
    Router.register('success', () => SuccessPage.enter());

    /* ── One-time inits ── */
    ProductsPage.init();
    DetailPage.init();

    /* ── Header scroll shadow ── */
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 10);
    }, {
        passive: true
    });

    /* ── Search bar ── */
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function doSearch() {
        const q = searchInput ?.value.trim() || '';
        ProductsPage.setSearch(q);
        Router.go('products', {
            search: q
        });
    }

    searchBtn ?.addEventListener('click', doSearch);
    searchInput ?.addEventListener('keydown', e => {
        if (e.key === 'Enter') doSearch();
    });

    /* ── Mobile menu toggle ── */
    document.getElementById('menuToggle') ?.addEventListener('click', () => {
        document.getElementById('mobileMenu') ?.classList.toggle('open');
    });
    document.getElementById('mobileMenuClose') ?.addEventListener('click', () => {
        document.getElementById('mobileMenu') ?.classList.remove('open');
    });

    /* ── Start on Home ── */
    Router.init();
});