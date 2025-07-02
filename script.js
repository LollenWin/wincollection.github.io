document.addEventListener('DOMContentLoaded', () => {
  const isoList = document.getElementById('isoList');
  const keyList = document.getElementById('keyList');
  const filterInput = document.getElementById('filterInput');
  const themeSelect = document.getElementById('themeSelect');

  let windowsData = [];

  // Load JSON data
  fetch('windows_versions.json')
    .then(res => res.json())
    .then(data => {
      windowsData = data;
      renderISOs(windowsData);
      renderKeys(windowsData);
    })
    .catch(err => console.error('Error loading JSON:', err));

  // Render ISOs
  function renderISOs(data) {
    if (!isoList) return;
    isoList.innerHTML = '';

    data.forEach(item => {
      if (!item.isoUrl) return; // Skip if no ISO URL

      const card = document.createElement('div');
      card.className = 'card fade-in';

      card.innerHTML = `
        <img src="${item.screenshotUrl || 'images/default.png'}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.tooltip}</p>
        <small>${item.year} • Build ${item.build}</small><br/>
        <a href="${item.isoUrl}" target="_blank" class="nav-button">Download ISO</a>
        <span class="tooltip-icon" title="${item.funFact ? item.funFact : 'No fun fact available.'}">ℹ️</span>
      `;

      card.dataset.name = item.name.toLowerCase();
      isoList.appendChild(card);
    });
  }

  // Render Product Keys
  function renderKeys(data) {
    if (!keyList) return;
    keyList.innerHTML = '';

    data.forEach(item => {
      if (!item.productKey) return; // Skip if no product key

      const card = document.createElement('div');
      card.className = 'card fade-in';

      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Product Key:</strong> ${item.productKey}</p>
        <small>${item.year} • Build ${item.build}</small><br/>
        <span class="tooltip-icon" title="${item.funFact ? item.funFact : 'No fun fact available.'}">ℹ️</span>
      `;

      card.dataset.name = item.name.toLowerCase();
      keyList.appendChild(card);
    });
  }

  // Filtering
  if (filterInput) {
    filterInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();

      // Filter ISOs
      if (isoList) {
        Array.from(isoList.children).forEach(card => {
          const name = card.dataset.name;
          card.style.display = name.includes(term) ? '' : 'none';
        });
      }

      // Filter Keys
      if (keyList) {
        Array.from(keyList.children).forEach(card => {
          const name = card.dataset.name;
          card.style.display = name.includes(term) ? '' : 'none';
        });
      }
    });
  }

  // Theme switching
  if (themeSelect) {
    themeSelect.addEventListener('change', e => {
      document.body.className = ''; // reset classes
      const theme = e.target.value;
      if (theme) {
        document.body.classList.add(`theme-${theme}`);
      }
    });
  }
});
