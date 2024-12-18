import { games } from './games.js';

const container = document.querySelector('.container')

const input = document.querySelector('.input');


document.addEventListener('DOMContentLoaded', function() {
  input.value = '';
});

function createCard(gameName, imageSrc, rating) {
  // Create card element
  const card = document.createElement('div');
  card.className = 'card';

  // Create image element
  const img = document.createElement('img');
  img.className = 'image';
  img.src = imageSrc; // Set the image source
  img.alt = gameName; // Set alt text

  // Create game name element
  const name = document.createElement('p');
  name.className = 'game-name';
  name.textContent = gameName; // Set game name

  // Create rating element
  const rate = document.createElement('div');
  rate.className = 'rate';


  let starIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>'
  let noStarIcon = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon-no-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>'
  for (let p = 0; p < 10; p++) {
    let star = document.createElement('svg')
    if (p < rating) {
      star.innerHTML = starIcon
    } else {
      star.innerHTML = noStarIcon
    }
    rate.appendChild(star)
    star.classList.add('star')
    if (rating == 10) {
      card.style.background = '#1F4529'
      img.style.opacity = '.7'
    }
  }

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(rate);
  return card;
}

games.sort((a, b) => b.rate - a.rate);


function renderCards() {
  // Clear existing cards
  const cardElements = container.querySelectorAll('.card');
  cardElements.forEach(card => {
    container.removeChild(card);
  });

  // Add cards based on the current input value
  for (let i = 0; i < games.length; i++) {
    const card1 = createCard(games[i].game, games[i].link, games[i].rate);
    container.appendChild(card1);
  }
}

// Initial rendering of cards
renderCards();

input.addEventListener('input', () => {
  if (input.value.length === 0) {
    // Clear existing cards and display all
    renderCards();
  } else {
    // Clear existing cards first
    const cardElements = container.querySelectorAll('.card');
    cardElements.forEach(card => {
      container.removeChild(card);
    });

    // Filter and render cards based on input value
    for (let i = 0; i < games.length; i++) {
      if (games[i].game.toLowerCase().includes(input.value.toLowerCase())) {
        const card1 = createCard(games[i].game, games[i].link, games[i].rate);
        container.appendChild(card1);
      }
    }
  }
});