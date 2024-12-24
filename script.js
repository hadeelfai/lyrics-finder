document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lyricsForm');
    const lyricsDiv = document.getElementById('lyrics');
    const clearButton = document.getElementById('clear');
  
    // Fetch lyrics when the form is submitted
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent page reload
      const artist = document.getElementById('artist').value.trim();
      const title = document.getElementById('title').value.trim();
  
      // Check for empty input
      if (!artist || !title) {
        lyricsDiv.innerHTML = `<p class="error">Please enter both artist and title!</p>`;
        return;
      }
  
      // Fetch data from API
      try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await response.json();
  
        if (data.lyrics) {
          lyricsDiv.textContent = data.lyrics;
        } else {
          lyricsDiv.innerHTML = `<p class="error">Lyrics not found for "${title}" by ${artist}.</p>`;
        }
      } catch (error) {
        lyricsDiv.innerHTML = `<p class="error">Error fetching data. Please try again later.</p>`;
      }
    });
  
    // Clear lyrics
    clearButton.addEventListener('click', () => {
      lyricsDiv.textContent = '';
    });
  });
  