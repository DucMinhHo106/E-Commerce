const Cart = (() => {
    const KEY = 'dm_cart';
    let items = [];

    function load() {
        items = JSON.parse(localStorage.getItem(KEY) || '[]');
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
        load();

        const existing = items.find(i => i.id === id);
        if (existing) existing.qty += qty;
        else items.push({
            id,
            qty
        });

        save();

        const p = PRODUCTS.find(x => x.id === id);
        if (p) Toast.show(`Đã thêm ${qty} ${p.name}`);
    }

    function remove(id) {
        load();
        items = items.filter(i => i.id !== id);
        save();
    }

    function setQty(id, qty) {
        load();
        const item = items.find(i => i.id === id);
        if (item) item.qty = Math.max(1, qty);
        save();
    }

    function getItems() {
        load();
        return [...items];
    }

    function total() {
        load();
        return items.reduce((sum, item) => {
            const p = PRODUCTS.find(x => x.id === item.id);
            return sum + (p ? p.price * item.qty : 0);
        }, 0);
    }

    document.addEventListener('DOMContentLoaded', () => {
        load();
        _updateBadge();
    });

    return {
        add,
        remove,
        setQty,
        total,
        getItems
    };
})();