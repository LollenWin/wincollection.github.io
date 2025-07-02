<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Windows Product Keys</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <header>
      <h1>Windows Product Keys</h1>
    </header>

    <nav>
      <button onclick="window.location.href='index.html'">Home</button>
      <button onclick="window.location.href='isos.html'">ISOs</button>

      <label for="themeSelect">Theme:</label>
      <select id="themeSelect">
        <option value="">Default</option>
        <option value="xp">XP</option>
        <option value="vista">Vista</option>
        <option value="longhorn">Longhorn</option>
        <option value="win11">Windows 11</option>
      </select>
    </nav>

    <input type="text" id="filterInput" placeholder="Search Windows versions..." autocomplete="off" />

    <section id="keyList" class="cards-list">
      <!-- Product key cards get rendered here -->
    </section>
  </div>

  <script src="script.js"></script>
</body>
</html>
