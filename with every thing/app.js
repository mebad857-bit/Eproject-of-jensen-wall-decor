    
 
document.addEventListener('DOMContentLoaded', function () {

  // ============== SWIPER INIT ==============
  document.querySelectorAll('.mySwiper, .mySwiper2').forEach(el => {
    new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev')
      },
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }
    });
  });

  // ============== FILTER + SORT ==============
  const brandSelect = document.getElementById('brandFilter');
  const sortSelect = document.getElementById('sortOption');

  function applyFiltersAndSort() {
    const brand = brandSelect.value;
    const sortOpt = sortSelect.value;

    document.querySelectorAll('.swiper-wrapper').forEach(wrapper => {
      const slides = Array.from(wrapper.children).map(slide => {
        const card = slide.querySelector('.cardPopout');
        return {
          el: slide,
          brand: card?.dataset.brand || '',
          price: parseFloat(card?.dataset.price || 0),
          popularity: parseInt(card?.dataset.popularity || 0)
        };
      });

      // filter
      slides.forEach(item => {
        item.el.style.display = (brand === 'all' || item.brand === brand) ? '' : 'none';
      });

      // sort visible
      const visible = slides.filter(i => i.el.style.display !== 'none');
      visible.sort((a, b) => {
        if (sortOpt === 'priceLowHigh') return a.price - b.price;
        if (sortOpt === 'priceHighLow') return b.price - a.price;
        return b.popularity - a.popularity;
      });
      visible.forEach(i => wrapper.appendChild(i.el));

      // refresh swiper
      if (wrapper.closest('.swiper')?.swiper) {
        wrapper.closest('.swiper').swiper.update();
      }
    });
  }

  brandSelect.addEventListener('change', applyFiltersAndSort);
  sortSelect.addEventListener('change', applyFiltersAndSort);
  applyFiltersAndSort();

 
  // ============== CART / WISHLIST ==============
  function addItemTo(key, item) {
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(item);
    localStorage.setItem(key, JSON.stringify(arr));
  }

  document.addEventListener('click', function (e) {
    let t = e.target;

    if (t.matches('.add-to-cart')) {
      e.preventDefault();
      const card = t.closest('.cardPopout');
      const item = {
        title: t.dataset.title || card.querySelector('h2').innerText,
        brand: t.dataset.brand || card.dataset.brand,
        price: t.dataset.price || card.dataset.price
      };
      addItemTo('jensen_cart', item);
      window.location.href = 'cart.html';
    }

    if (t.matches('.add-to-wish')) {
      e.preventDefault();
      const card = t.closest('.cardPopout');
      const item = {
        title: t.dataset.title || card.querySelector('h2').innerText,
        brand: t.dataset.brand || card.dataset.brand,
        price: t.dataset.price || card.dataset.price
      };
      addItemTo('jensen_wishlist', item);
      window.location.href = 'wishlist.html';
    }
  });

  // Update header counters
  try {
    const c = JSON.parse(localStorage.getItem('jensen_cart') || '[]').length;
    const w = JSON.parse(localStorage.getItem('jensen_wishlist') || '[]').length;
    if (document.getElementById('cartCount')) document.getElementById('cartCount').textContent = c;
    if (document.getElementById('wishCount')) document.getElementById('wishCount').textContent = w;
  } catch (err) {}
});
document.querySelectorAll('.compare-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const title = btn.dataset.title;
    const brand = btn.dataset.brand;
    const price = btn.dataset.price;

    // yahan aap apna compare logic likh sakte ho
    console.log('Compare clicked:', title, brand, price);
  });
});
// Scroll to category function
function scrollToCategory(id){
    const el = document.getElementById(id);
    if(el){
        el.scrollIntoView({behavior:'smooth'});
    }
}

document.addEventListener('DOMContentLoaded', function () {
  // array to hold selected items
  const compareItems = [];
  const compareBody = document.getElementById('compareBody');
  const compareModalEl = document.getElementById('compareModal');

  // attach click to all compare buttons
  document.querySelectorAll('.compare-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      // read data from button
      const item = {
        title: btn.dataset.title,
        brand: btn.dataset.brand,
        price: btn.dataset.price
      };

      // toggle if already added
      const idx = compareItems.findIndex(i => i.title === item.title && i.brand === item.brand);
      if (idx >= 0) {
        compareItems.splice(idx, 1);
      } else {
        compareItems.push(item);
      }

      // build table
      if (!compareItems.length) {
        compareBody.innerHTML = '<p class="text-muted">No products selected yet.</p>';
      } else {
        let html = '<div class="table-responsive"><table class="table table-bordered text-center">';
        html += '<thead><tr>';
        compareItems.forEach(i => html += `<th>${i.title}</th>`);
        html += '</tr></thead><tbody>';

        // brand row
        html += '<tr>';
        compareItems.forEach(i => html += `<td>${i.brand}</td>`);
        html += '</tr>';

        // price row
        html += '<tr>';
        compareItems.forEach(i => html += `<td>${i.price}</td>`);
        html += '</tr>';

        html += '</tbody></table></div>';
        compareBody.innerHTML = html;
      }

      // show modal
      new bootstrap.Modal(compareModalEl).show();
    });
  });
});


