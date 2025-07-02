fetch('windows_versions.json')
  .then(res => res.json())
  .then(data => {
    const releasedList = document.getElementById('released-list');
    const betaList = document.getElementById('beta-list');

    data.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.isoUrl;
      a.textContent = `${item.name} (Build ${item.build})`;
      a.target = "_blank";
      li.appendChild(a);

      if (item.category === "Beta") {
        betaList.appendChild(li);
      } else {
        releasedList.appendChild(li);
      }
    });

    document.getElementById("toggle-beta").addEventListener("click", () => {
      const betaList = document.getElementById("beta-list");
      const toggle = document.getElementById("toggle-beta");
      if (betaList.style.display === "none") {
        betaList.style.display = "block";
        toggle.textContent = "Hide Betas ▲";
      } else {
        betaList.style.display = "none";
        toggle.textContent = "Show Betas ▼";
      }
    });
  });
