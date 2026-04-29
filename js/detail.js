/* =====================================================
   js/detail.js – Product Detail Page (with Image Gallery)
   ===================================================== */
'use strict';

const DetailPage = (() => {
    let current = null;
    let activeImg = 0;

    /* ── Gallery ── */
    function _renderGallery(images) {
        const main = document.getElementById('galleryMain');
        const thumbs = document.getElementById('galleryThumbs');
        if (!main || !thumbs) return;

        activeImg = 0;
        main.innerHTML = `
      <div class="gallery-main-inner">
        <img id="galleryMainImg" src="${images[0]}" alt="" />
        ${images.length > 1 ? `
          <button class="gallery-arrow gallery-arrow--prev" id="galleryPrev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button class="gallery-arrow gallery-arrow--next" id="galleryNext">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>` : ''}
        <div class="gallery-dots" id="galleryDots">
          ${images.map((_, i) => `<span class="gallery-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`).join('')}
        </div>
      </div>`;

        thumbs.innerHTML = images.map((src, i) => `
      <div class="gallery-thumb${i === 0 ? ' active' : ''}" data-idx="${i}">
        <img src="${src}" alt="Ảnh ${i + 1}" loading="lazy"/>
      </div>`).join('');

        // Arrow clicks
        document.getElementById('galleryPrev') ?.addEventListener('click', () => _slideGallery(-1, images));
        document.getElementById('galleryNext') ?.addEventListener('click', () => _slideGallery(1, images));

        // Thumb clicks
        thumbs.querySelectorAll('.gallery-thumb').forEach(th => {
            th.addEventListener('click', () => _setSlide(parseInt(th.dataset.idx), images));
        });

        // Dot clicks
        document.getElementById('galleryDots') ?.querySelectorAll('.gallery-dot').forEach(dot => {
            dot.addEventListener('click', () => _setSlide(parseInt(dot.dataset.idx), images));
        });

        // Keyboard navigation
        document.addEventListener('keydown', _onKey);
    }

    function _onKey(e) {
        if (!document.getElementById('page-detail') ?.classList.contains('active')) return;
        if (!current) return;
        if (e.key === 'ArrowLeft') _slideGallery(-1, current.images);
        if (e.key === 'ArrowRight') _slideGallery(1, current.images);
    }

    function _setSlide(idx, images) {
        activeImg = (idx + images.length) % images.length;
        const mainImg = document.getElementById('galleryMainImg');
        if (mainImg) {
            mainImg.classList.add('gallery-fade');
            setTimeout(() => {
                mainImg.src = images[activeImg];
                mainImg.classList.remove('gallery-fade');
            }, 180);
        }
        document.querySelectorAll('.gallery-thumb').forEach((th, i) =>
            th.classList.toggle('active', i === activeImg));
        document.querySelectorAll('.gallery-dot').forEach((d, i) =>
            d.classList.toggle('active', i === activeImg));
    }

    function _slideGallery(dir, images) {
        _setSlide(activeImg + dir, images);
    }

    /* ── Quantity ── */
    function _changeQty(delta) {
        const inp = document.getElementById('detailQty');
        if (inp) inp.value = Math.max(1, parseInt(inp.value || 1) + delta);
    }

    /* ── Render full page ── */
    function _render(p) {
        current = p;

        // Breadcrumb
        const bc = document.getElementById('detailBreadcrumb');
        if (bc) bc.innerHTML = `
      <a onclick="Router.go('home')">Trang chủ</a>
      <span class="bc-sep">›</span>
      <a onclick="Router.go('products',{cat:'${p.category}'})">${p.category}</a>
      <span class="bc-sep">›</span>
      <span>${p.name}</span>`;

        // Gallery
        _renderGallery(p.images);

        // Info
        const setEl = (id, val) => {
            const e = document.getElementById(id);
            if (e) e.textContent = val;
        };
        const setHTML = (id, val) => {
            const e = document.getElementById(id);
            if (e) e.innerHTML = val;
        };

        setEl('detailName', p.name);
        setEl('detailPrice', fmt(p.price));

        const badgeEl = document.getElementById('detailBadge');
        if (badgeEl) {
            badgeEl.textContent = p.discount ? `-${p.discount}%` : '';
            badgeEl.style.display = p.discount ? '' : 'none';
        }

        const oldEl = document.getElementById('detailOldPrice');
        if (oldEl) {
            oldEl.textContent = p.oldPrice ? fmt(p.oldPrice) : '';
            oldEl.style.display = p.oldPrice ? '' : 'none';
        }

        setHTML('detailRating',
            starsHTML(p.rating) +
            `<span class="rating-text">${p.rating} (${p.reviews} đánh giá)</span>`);

        setEl('detailDesc', p.desc);

        const qtyEl = document.getElementById('detailQty');
        if (qtyEl) qtyEl.value = 1;

        // Specs
        const specBox = document.getElementById('specBox');
        if (specBox) {
            const rows = Object.entries(p.specs)
                .map(([k, v]) => `<tr><td class="spec-key">${k}:</td><td class="spec-val">${v}</td></tr>`)
                .join('');
            specBox.innerHTML = `
        <h3 class="spec-title">Thông số kỹ thuật</h3>
        <table class="spec-table">${rows}</table>`;
        }

        // Wire up buttons
        document.getElementById('detailAddBtn') ?.addEventListener('click', () => {
            const qty = parseInt(document.getElementById('detailQty') ?.value || 1);
            Cart.add(p.id, qty);
        }, {
            once: false
        });

        document.getElementById('detailBuyBtn') ?.addEventListener('click', () => {
            const qty = parseInt(document.getElementById('detailQty') ?.value || 1);
            Cart.add(p.id, qty);
            Router.go('checkout');
        }, {
            once: false
        });
    }

    function enter(params = {}) {
        const p = PRODUCTS.find(x => x.id === params.id);
        if (!p) {
            Router.go('products');
            return;
        }
        // Remove old keydown listener before adding new
        document.removeEventListener('keydown', _onKey);
        _render(p);
    }

    function init() {
        // Qty buttons (static in HTML)
        document.getElementById('detailQtyMinus') ?.addEventListener('click', () => _changeQty(-1));
        document.getElementById('detailQtyPlus') ?.addEventListener('click', () => _changeQty(1));
    }

    return {
        init,
        enter
    };
})();