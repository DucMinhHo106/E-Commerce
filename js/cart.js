/* =====================================================
   js/cart.js – Cart State & Logic
   ===================================================== */
'use strict';

const Cart = (() => {
    const KEY = 'dm_cart';
    let items = JSON.parse(localStorage.getItem(KEY) || '[]');

    if (document.getElementById('page-cart') ?.style.display === 'block') {
        CartPage.render();
    }

    function emitChange() {
        document.dispatchEvent(new Event('cart:change'));
    }

    function save() {
        localStorage.setItem(KEY, JSON.stringify(items));
        _updateBadge();
        document.dispatchEvent(new CustomEvent('cart:updated'));
    }

    function _updateBadge() {
        const total = items.reduce((s, i) => s + i.qty, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = total;
            el.style.display = total ? '' : 'none';
        });
    }

    function add(id, qty = 1) {
        items = JSON.parse(localStorage.getItem(KEY) || '[]');
        const existing = items.find(i => i.id === id);

        if (existing) existing.qty += qty;
        else items.push({
            id,
            qty
        });
        save();

        const p = PRODUCTS.find(x => x.id === id);
        if (p) Toast.show(`Đã thêm ${qty > 1 ? qty + 'x ' : ''}${p.name} vào giỏ hàng`);
        emitChange();
    }

    function remove(id) {
        items = items.filter(i => i.id !== id);
        localStorage.setItem(KEY, JSON.stringify(items));

        save();
        emitChange();
    }

    function setQty(id, qty) {
        items = JSON.parse(localStorage.getItem(KEY) || '[]');
        const item = items.find(i => i.id === id);

        if (item) {
            item.qty = Math.max(1, qty);
            save();
        }
        emitChange();
    }

    function total() {
        items = JSON.parse(localStorage.getItem(KEY) || '[]');
        return items.reduce((sum, item) => {
            const p = PRODUCTS.find(x => x.id === item.id);
            return sum + (p ? p.price * item.qty : 0);
        }, 0);
    }

    function count() {
        items = JSON.parse(localStorage.getItem(KEY) || '[]');
        return items.reduce((s, i) => s + i.qty, 0);
    }

    function clear() {
        items = [];
        save();
    }

    function getItems() {
        items = JSON.parse(localStorage.getItem(KEY) || '[]');
        return [...items];
    }
    // Init badge on load
    document.addEventListener('DOMContentLoaded', _updateBadge);

    return {
        add,
        remove,
        setQty,
        total,
        count,
        clear,
        getItems
    };
})();