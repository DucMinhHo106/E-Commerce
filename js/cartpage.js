/* =====================================================
   js/cartpage.js – Cart Page Rendering
   ===================================================== */
'use strict';

const CartPage = (() => {

    function render() {
        const items = Cart.getItems();
        const container = document.getElementById('cartItems');
        const subEl = document.getElementById('summarySubtotal');
        const totEl = document.getElementById('summaryTotal');
        if (!container) return;

        if (!items.length) {
            container.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h3>Giỏ hàng trống</h3>
          <p>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          <button class="btn btn-primary-lg" onclick="Router.go('products')">Tiếp tục mua sắm</button>
        </div>`;
            if (subEl) subEl.textContent = fmt(0);
            if (totEl) totEl.textContent = fmt(0);
            // Remove old subtotal row
            document.getElementById('cartSubtotalRow') ?.remove();
            return;
        }

        container.innerHTML = items.map(item => {
            const p = PRODUCTS.find(x => x.id === item.id);
            if (!p) return '';
            return `
        <div class="cart-item" id="cart-item-${p.id}">
          <img class="cart-item-img"
               src="${p.images[0]}"
               alt="${p.name}"
               onclick="Router.go('detail',{id:${p.id}})"
               style="cursor:pointer"/>
          <div class="cart-item-body">
            <div class="cart-item-name" onclick="Router.go('detail',{id:${p.id}})"
                 style="cursor:pointer">${p.name}</div>
            <div class="cart-item-price">${fmt(p.price)}</div>
            <div class="qty-ctrl" style="margin-top:10px">
              <button class="qty-btn" onclick="CartPage.changeQty(${p.id},-1)">−</button>
              <input  class="qty-input" id="cqty-${p.id}" type="number"
                      value="${item.qty}" min="1" readonly />
              <button class="qty-btn" onclick="CartPage.changeQty(${p.id},1)">+</button>
            </div>
          </div>
          <div class="cart-item-right">
            <div class="cart-item-subtotal">${fmt(p.price * item.qty)}</div>
            <button class="cart-delete-btn" onclick="CartPage.removeItem(${p.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
              Xóa
            </button>
          </div>
        </div>`;
        }).join('');

        // Subtotal bar
        const total = Cart.total();
        if (subEl) subEl.textContent = fmt(total);
        if (totEl) totEl.textContent = fmt(total);

        // Inline subtotal row
        let subRow = document.getElementById('cartSubtotalRow');
        if (!subRow) {
            subRow = document.createElement('div');
            subRow.id = 'cartSubtotalRow';
            subRow.className = 'cart-subtotal-row';
            container.after(subRow);
        }
        subRow.innerHTML = `<span>Tạm tính:</span><strong>${fmt(total)}</strong>`;
    }

    function changeQty(id, delta) {
        const inp = document.getElementById(`cqty-${id}`);
        if (!inp) return;

        const newVal = Math.max(1, parseInt(inp ?.value || 1) + delta);
        Cart.setQty(id, newVal);
        render();
    }

    function removeItem(id) {
        const el = document.getElementById(`cart-item-${id}`);

        if (el) {
            el.style.opacity = '0';
            setTimeout(() => {
                Cart.remove(id);
                render();
            }, 200);
        } else {
            Cart.remove(id);
            render();
        }
    }

    function enter() {
        render();
    }

    return {
        enter,
        render,
        changeQty,
        removeItem
    };
})();