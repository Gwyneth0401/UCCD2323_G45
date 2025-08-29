import { initSwiper } from './utils/swiper.js';
import { foods } from '../data/food.js';

function renderFoodCardByCuisine(cuisine, containerSelector, state = "all") {
  let foodsHTML = '';

  const filterFoods = foods.filter(
    food => food.cuisine === cuisine && (state === "all" || food.state === state)
  );

  if (filterFoods.length === 0) {
    foodsHTML = `
      <div class="swiper-slide">
        <div class="card no-food">
          <div class="card-content">
            <h3 class="card-title">No food available</h3>
            <p class="card-text">Try selecting another state.</p>
          </div>
        </div>
      </div>
    `;
  } else {
    filterFoods.forEach((food) => {
      foodsHTML += `
        <div class="card swiper-slide">
          <div class="card-image">
            <img src="${food.image}" alt="${food.name} image">
            <p class="card-tag">${food.state}</p>
          </div>
          <div class="card-content">
            <h3 class="card-title">${food.name}</h3>
            <p class="card-text">${food.description}</p>
            <div class="card-footer">
              <div class="product-rating-container">
                <img class="product-rating-stars" src="${food.getStarsUrl()}" alt="Rating: 4.5">
                <div class="product-rating-count link-primary">${food.rating.count}</div>
              </div>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="card-button">Share</a>
            </div>
          </div>
        </div>
      `;
    });
  }

  document.querySelector(containerSelector).innerHTML = foodsHTML;
}

function renderAll(state = "all") {
  renderFoodCardByCuisine("Chinese", ".js-card-list-chinese", state);
  renderFoodCardByCuisine("Malay", ".js-card-list-malay", state);
  renderFoodCardByCuisine("Indian", ".js-card-list-indian", state);

  initSwiper();
}

// initial render
renderAll();

// event listener for filter
document.getElementById("stateFilter").addEventListener("change", (e) => {
  renderAll(e.target.value);
});

