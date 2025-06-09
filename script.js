document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lyricsForm');
  const lyricsDiv = document.getElementById('lyrics');
  const clearButton = document.getElementById('clear');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const artist = document.getElementById('artist').value.trim();
    const title = document.getElementById('title').value.trim();

    if (!artist || !title) {
      lyricsDiv.innerHTML = `<p class="error">Please enter both artist and title!</p>`;
      return;
    }

    try {
      const apiKey = 'f4b7940b986db5c2d06782510369fc0d'; 
      const query = encodeURIComponent(`${title} ${artist}`);
      const url = `https://api.audd.io/findLyrics/?q=${query}&api_token=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data); 

      if (data.result && data.result.length > 0 && data.result[0].lyrics) {
        lyricsDiv.textContent = data.result[0].lyrics;
      } else {
        lyricsDiv.innerHTML = `<p class="error">Lyrics not found for "${title}" by ${artist}.</p>`;
      }
    } catch (error) {
      console.error(error);
      lyricsDiv.innerHTML = `<p class="error">Error fetching data. Please try again later.</p>`;
    }
  });

  clearButton.addEventListener('click', () => {
    lyricsDiv.textContent = '';
  });
});
