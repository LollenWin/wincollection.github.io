document.addEventListener('DOMContentLoaded', () => {
  const isoList = document.getElementById('isoList');
  const keyList = document.getElementById('keyList');
  const wikiList = document.getElementById('wikiList');
  const filterInput = document.getElementById('filterInput');
  const themeSelect = document.getElementById('themeSelect');

  let data = [];

  // Load Windows builds data from JSON file
  fetch('windows_versions.json')
    .then(res => res.json())
    .then(json => {
      data = json;
      if (isoList) renderISOs(data);
      if (keyList) renderKeys(data);
      if (wikiList) renderWiki(data);
    })
    .catch(err => {
      console.error('Failed to load windows_versions.json', err);
    });

  // Render ISOs page cards
  function renderISOs(items) {
    isoList.innerHTML = '';
    items.forEach(item => {
      if (!item.isoUrl) return;
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.name = item.name.toLowerCase();

      card.innerHTML = `
        <img src="${item.screenshotUrl || 'images/default.png'}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.tooltip}</p>
        <small>${item.year} • Build ${item.build}</small><br/>
        <button class="nav-button download-btn" data-url="${item.isoUrl}" data-name="${item.name}">Download ISO</button>
        <span class="tooltip-icon" data-funfact="${item.funFact || 'No fun fact available.'}">ℹ️</span>
      `;

      isoList.appendChild(card);
    });

    // Add download handlers for all download buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url;
        const name = btn.dataset.name.replace(/\s+/g, '_') + '.iso';
        downloadFile(url, name);
      });
    });
  }

  // Render Product Keys page cards
  function renderKeys(items) {
    keyList.innerHTML = '';
    items.forEach(item => {
      if (!item.productKey) return;
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.name = item.name.toLowerCase();

      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Product Key:</strong> ${item.productKey}</p>
        <small>${item.year} • Build ${item.build}</small><br/>
        <span class="tooltip-icon" data-funfact="${item.funFact || 'No fun fact available.'}">ℹ️</span>
      `;

      keyList.appendChild(card);
    });
  }

  // Render Wiki page cards
  function renderWiki(items) {
    wikiList.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.name = item.name.toLowerCase();

      card.innerHTML = `
        <
