/* =====================================================
   js/utils.js – Shared Utilities
   ===================================================== */
'use strict';

/* ── Formatter ── */
const fmt = n => n.toLocaleString('vi-VN') + ' đ';

/* ── Stars HTML ── */
function starsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const full = i <= Math.floor(rating);
        const half = !full && i - rating < 1 && i - rating > 0;
        html += `<span class="star${full ? ' full' : half ? ' half' : ''}">${full || half ? '★' : '☆'}</span>`;
    }
    return html;
}

/* ── Toast ── */
const Toast = (() => {
    let el, msgEl, timer;

    function _ensure() {
        if (el) return;
        el = document.getElementById('toast');
        msgEl = document.getElementById('toastMsg');
    }

    function show(msg, type = 'success') {
        _ensure();
        if (!el) return;
        msgEl.textContent = msg;
        el.className = `toast toast--${type} show`;
        clearTimeout(timer);
        timer = setTimeout(() => el.classList.remove('show'), 3400);
    }

    return {
        show
    };
})();

/* ── Router ── */
const Router = (() => {
    const routes = {};

    function register(name, handler) {
        routes[name] = handler;
    }

    function go(name, params = {}, addToHistory = true) {
        if (!routes[name]) return;

        // Update URL
        const url = `#${name}` + (Object.keys(params).length ? `?${new URLSearchParams(params)}` : '');

        if (addToHistory) {
            history.pushState({
                name,
                params
            }, '', url);
        }

        render(name, params);
    }

    function render(name, params = {}) {
        document.querySelectorAll('.page').forEach(p => p.style.display = 'none');

        const page = document.getElementById(`page-${name}`);
        if (page) page.style.display = 'block';

        routes[name](params);
    }

    function init() {
        window.addEventListener('popstate', e => {
            const state = e.state;
            if (state) {
                render(state.name, state.params);
            } else {
                go('home', {}, false);
            }
        });

        // Load lần đầu
        const hash = location.hash.slice(1);
        if (hash) {
            const [name, query] = hash.split('?');
            const params = Object.fromEntries(new URLSearchParams(query));
            go(name, params, false);
        } else {
            go('home', {}, false);
        }
    }

    return {
        register,
        go,
        init
    };
})();