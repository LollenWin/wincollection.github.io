// Load theme
document.addEventListener('DOMContentLoaded', () => {
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      document.body.className = `theme-${e.target.value} fade-in`;
    });
  }

  fetch('windows_versions.json')
    .then(res => res.json())
    .then(data => {
      const path = window.location.pathname;
      if (path.includes('isos')) renderISOs(data);
      else if (path.includes('productkeys')) renderKeys(data);
    });

  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  if (searchInput && categoryFilter) {
    searchInput.addEventListener('input', () => filterList());
    categoryFilter.addEventListener('change', () => filterList());
  }
});

function renderISOs(data) {
  const list = document.getElementById('isoList');
  list.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
      <img src="${item.screenshotUrl}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.tooltip}</p>
      <small>${item.year} • Build ${item.build}</small><br/>
      <a href="${item.isoUrl}" target="_blank" class="nav-button">Download ISO</a>
    `;
    card.dataset.category = item.category;
    card.dataset.name = item.name.toLowerCase();
    list.appendChild(card);
  });
}

function renderKeys(data) {
  const list = document.getElementById('keyList');
  list.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p><b>Key:</b> ${item.productKey}</p>
      <small>${item.year} • Build ${item.build}</small>
    `;
    card.dataset.category = item.category;
    card.dataset.name = item.name.toLowerCase();
    list.appendChild(card);
  });
}

function filterList() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesSearch = card.dataset.name.includes(searchValue);
    card.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
  });}
function renderISOs(data) {
  const list = document.getElementById('isoList');
  list.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card fade-in';

    // Minimal card content with basic tooltip
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.tooltip}</p>
      <small>${item.year} • Build ${item.build}</small><br/>
      <a href="${item.isoUrl}" target="_blank" class="nav-button">Download ISO</a>
      <span title="${item.funFact || 'No fun fact available.'}" style="color:#99ccff; cursor:pointer;">ℹ️</span>
    `;

    card.dataset.category = item.category;
    card.dataset.name = item.name.toLowerCase();

    list.appendChild(card);
  });
}
