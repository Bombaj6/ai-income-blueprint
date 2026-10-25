// Interactive Logic for AI Income Blueprint Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCurrency = 'NGN'; // 'NGN' | 'USD'
  
  const exchangeRates = {
    regularPrice: { NGN: '₦25,000', USD: '$50' },
    salePrice: { NGN: '₦5,000', USD: '$10' },
    discountPct: '80%',
    bonusTotal: { NGN: '₦85,000+', USD: '$120+' },
    services: [
      { name: 'AI Commercial Flyer & Brand Visuals', baseNGN: 15000, baseUSD: 25 },
      { name: 'AI Copywriting, Ad Copy & Emails', baseNGN: 25000, baseUSD: 45 },
      { name: 'Viral Faceless Video & Reels Creation', baseNGN: 40000, baseUSD: 75 },
      { name: 'Full AI Growth & Content Retainer', baseNGN: 65000, baseUSD: 110 }
    ]
  };

  // 1. Currency Switcher Elements
  const currencyBtns = document.querySelectorAll('.currency-toggle-btn');
  const priceDisplays = document.querySelectorAll('[data-currency-price]');
  const oldPriceDisplays = document.querySelectorAll('[data-currency-old-price]');
  const bonusDisplays = document.querySelectorAll('[data-currency-bonus]');

  function updateCurrency(curr) {
    currentCurrency = curr;
    
    currencyBtns.forEach(btn => {
      const active = btn.dataset.currency === curr;
      btn.classList.toggle('bg-red-600', active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('bg-slate-800', !active);
      btn.classList.toggle('text-slate-300', !active);
    });

    priceDisplays.forEach(el => {
      el.textContent = exchangeRates.salePrice[curr];
    });

    oldPriceDisplays.forEach(el => {
      el.textContent = exchangeRates.regularPrice[curr];
    });

    bonusDisplays.forEach(el => {
      el.textContent = exchangeRates.bonusTotal[curr];
    });

    // Recompute earnings calculator
    updateIncomeCalculator();
  }

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateCurrency(btn.dataset.currency);
    });
  });

  // 2. Interactive Income Calculator
  const clientSlider = document.getElementById('client-slider');
  const clientCountDisplay = document.getElementById('client-count-display');
  const serviceSelect = document.getElementById('service-select');
  const estimatedIncomeDisplay = document.getElementById('estimated-income');
  const hoursEstimateDisplay = document.getElementById('hours-estimate');

  function updateIncomeCalculator() {
    if (!clientSlider || !serviceSelect || !estimatedIncomeDisplay) return;

    const clientCount = parseInt(clientSlider.value, 10);
    clientCountDisplay.textContent = clientCount;

    const selectedServiceIndex = parseInt(serviceSelect.value, 10);
    const service = exchangeRates.services[selectedServiceIndex];

    const baseRate = currentCurrency === 'NGN' ? service.baseNGN : service.baseUSD;
    const totalEarnings = clientCount * baseRate;

    if (currentCurrency === 'NGN') {
      estimatedIncomeDisplay.textContent = '₦' + totalEarnings.toLocaleString('en-US');
    } else {
      estimatedIncomeDisplay.textContent = '$' + totalEarnings.toLocaleString('en-US');
    }

    const estimatedHours = Math.max(1, Math.round(clientCount * 1.5));
    if (hoursEstimateDisplay) {
      hoursEstimateDisplay.textContent = `~${estimatedHours} hrs/week`;
    }
  }

  if (clientSlider) {
    clientSlider.addEventListener('input', updateIncomeCalculator);
  }
  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateIncomeCalculator);
  }

  // 3. Accordion FAQ
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });

  // 5. Before & After Toggle Tabs
  const beforeBtn = document.getElementById('tab-before-btn');
  const afterBtn = document.getElementById('tab-after-btn');
  const beforeContent = document.getElementById('tab-before-content');
  const afterContent = document.getElementById('tab-after-content');

  if (beforeBtn && afterBtn && beforeContent && afterContent) {
    beforeBtn.addEventListener('click', () => {
      beforeBtn.classList.add('bg-slate-800', 'text-white', 'border-red-500');
      beforeBtn.classList.remove('bg-transparent', 'text-slate-400', 'border-transparent');
      afterBtn.classList.remove('bg-slate-800', 'text-white', 'border-emerald-500');
      afterBtn.classList.add('bg-transparent', 'text-slate-400', 'border-transparent');

      beforeContent.classList.remove('hidden');
      afterContent.classList.add('hidden');
    });

    afterBtn.addEventListener('click', () => {
      afterBtn.classList.add('bg-slate-800', 'text-white', 'border-emerald-500');
      afterBtn.classList.remove('bg-transparent', 'text-slate-400', 'border-transparent');
      beforeBtn.classList.remove('bg-slate-800', 'text-white', 'border-red-500');
      beforeBtn.classList.add('bg-transparent', 'text-slate-400', 'border-transparent');

      afterContent.classList.remove('hidden');
      beforeContent.classList.add('hidden');
    });
  }

  // 6. Live Social Proof Toast Popups
  const socialToast = document.getElementById('social-toast');
  const toastUser = document.getElementById('toast-user');
  const toastLocation = document.getElementById('toast-location');
  const toastTime = document.getElementById('toast-time');

  const buyers = [
    { name: 'Emeka O.', loc: 'Lagos, Nigeria', time: '2 minutes ago' },
    { name: 'Blessing K.', loc: 'Abuja, Nigeria', time: '4 minutes ago' },
    { name: 'Tunde A.', loc: 'Ibadan, Nigeria', time: '7 minutes ago' },
    { name: 'David M.', loc: 'Nairobi, Kenya', time: '11 minutes ago' },
    { name: 'Ngozi E.', loc: 'Enugu, Nigeria', time: '14 minutes ago' },
    { name: 'Kwame A.', loc: 'Accra, Ghana', time: '18 minutes ago' },
    { name: 'Aisha B.', loc: 'Kaduna, Nigeria', time: '21 minutes ago' },
    { name: 'Samuel W.', loc: 'London, UK', time: '26 minutes ago' }
  ];

  let buyerIndex = 0;

  function showSocialToast() {
    if (!socialToast || !toastUser) return;
    const buyer = buyers[buyerIndex % buyers.length];
    buyerIndex++;

    toastUser.textContent = buyer.name;
    toastLocation.textContent = buyer.loc;
    toastTime.textContent = buyer.time;

    socialToast.classList.remove('hidden-toast');

    setTimeout(() => {
      socialToast.classList.add('hidden-toast');
    }, 4500);
  }

  // First toast after 5s, then every 22s
  setTimeout(() => {
    showSocialToast();
    setInterval(showSocialToast, 22000);
  }, 5000);

  // 7. Sticky Bottom CTA Bar Visibility
  const stickyBar = document.getElementById('sticky-cta-bar');
  const heroSection = document.getElementById('hero-section');

  if (stickyBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 100) {
        stickyBar.classList.remove('translate-y-full');
        stickyBar.classList.add('translate-y-0');
      } else {
        stickyBar.classList.add('translate-y-full');
        stickyBar.classList.remove('translate-y-0');
      }
    });
  }

  // Initial trigger
  updateIncomeCalculator();
});
