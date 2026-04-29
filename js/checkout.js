/* =====================================================
   js/checkout.js – Checkout & Success Pages
   ===================================================== */
'use strict';

const CheckoutPage = (() => {

    /* ── Render order review aside ── */
    function _renderAside() {
        const container = document.getElementById('checkoutItems');
        if (!container) return;

        const items = Cart.getItems();
        container.innerHTML = items.map(item => {
            const p = PRODUCTS.find(x => x.id === item.id);
            if (!p) return '';
            return `
        <div class="checkout-item">
          <div class="checkout-item-img-wrap">
            <img src="${p.images[0]}" alt="${p.name}"/>
            <span class="checkout-item-qty-badge">${item.qty}</span>
          </div>
          <div class="checkout-item-info">
            <div class="checkout-item-name">${p.name}</div>
            <div class="checkout-item-unit">Đơn giá: ${fmt(p.price)}</div>
          </div>
          <div class="checkout-item-price">${fmt(p.price * item.qty)}</div>
        </div>`;
        }).join('');

        const total = Cart.total();
        const subEl = document.getElementById('checkoutSubtotal');
        const totEl = document.getElementById('checkoutTotal');
        if (subEl) subEl.textContent = fmt(total);
        if (totEl) totEl.textContent = fmt(total);
    }

    /* ── Validation ── */
    function _validate(id, errId, testFn, msg) {
        const inp = document.getElementById(id);
        const errEl = document.getElementById(errId);
        const val = inp ?.value.trim() || '';
        const ok = testFn(val);
        inp ?.classList.toggle('error', !ok);
        if (errEl) errEl.textContent = ok ? '' : msg;
        return ok;
    }

    function _clearErrors() {
        ['cfName', 'cfPhone', 'cfEmail', 'cfAddr'].forEach(id => {
            document.getElementById(id) ?.classList.remove('error');
            const errEl = document.getElementById(id + 'Err');
            if (errEl) errEl.textContent = '';
        });
    }

    function submit() {
        let valid = true;

        valid &= _validate('cfName', 'cfNameErr',
            v => v.length >= 2,
            'Vui lòng nhập họ và tên (ít nhất 2 ký tự)');

        valid &= _validate('cfPhone', 'cfPhoneErr',
            v => /^(0|\+84)[0-9]{9}$/.test(v.replace(/\s/g, '')),
            'Số điện thoại không hợp lệ (VD: 0912 345 678)');

        const email = document.getElementById('cfEmail') ?.value.trim();
        if (email) {
            valid &= _validate('cfEmail', 'cfEmailErr',
                v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
                'Email không hợp lệ');
        }

        valid &= _validate('cfAddr', 'cfAddrErr',
            v => v.length >= 10,
            'Vui lòng nhập địa chỉ giao hàng đầy đủ');

        if (!valid) return;

        // Animate button
        const btn = document.getElementById('confirmBtn');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner"></span> Đang xử lý...`;
            setTimeout(() => {
                Cart.clear();
                Router.go('success');
                btn.disabled = false;
                btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Xác nhận đặt hàng`;
                _clearErrors();
                // Reset form
                ['cfName', 'cfPhone', 'cfEmail', 'cfAddr', 'cfNote'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });
            }, 1200);
        }
    }

    function enter() {
        _renderAside();
    }

    return {
        enter,
        submit
    };
})();

/* =====================================================
   Success Page
   ===================================================== */
const SuccessPage = (() => {
    function enter() {
        // nothing dynamic needed; just static HTML
    }
    return {
        enter
    };
})();