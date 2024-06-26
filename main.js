
const CONTAINER = document.querySelector(".js-container");
const API_URL = 'https://dummyjson.com/recipes?limit=100'
const INPUT = document.querySelector(".js-input")
const FORM = document.querySelector(".js-form")
const BUTTON = document.querySelector(".js-button")

const RECIPES = await fetchData(API_URL);

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.recipes;
}


/*
fetch(API_URL)
  .then(response => response.json())
  .then(data => render(data.recipes));
*/
/*First*/
function render(data) {
  const recipes = data.map(recipe => createRecipeTemplate(recipe)).join('');
  console.log(recipes)

  CONTAINER.innerHTML = recipes;

}
/* Second */
function createRecipeTemplate(recipe) {
  console.log(recipe)
  const starsHTML = createStar(recipe.rating);
  const ingredients = createParagraph(recipe.ingredients);
  const instructions = createParagraph(recipe.instructions);

  return `<div class="recipe">
    <div class="recipe-top">
      <img
        src=${recipe.image}
        alt=${recipe.name}
      />
    </div>
    <div class="recipe-bottom">
    <div class="recipe-heading">
        <h2>${recipe.name}</h2>
        <div class="recipe-rating flex-around-center">
          <div>
          ${starsHTML}
          </div>
          <p>${recipe.rating}</p>
        </div>
      </div>
      <div class="recipe-data flex-around-center">
        <i class="fa-regular fa-clock"></i>
        <p>Prep: <span>${recipe.prepTimeMinutes} min</span></p>
        <p>Cooking: <span>${recipe.cookTimeMinutes}</span></p>
      </div>
      <div class="recipe-text">
        <h3>Ingredients:</h3>
        <div class="recipe-grid">
        ${ingredients}
        </div>
      </div>
      <div class="recipe-text">
         ${instructions}
      </div>
    </div>
  </div>`
}
/* Third */
function createStar(recipeRating) {
  let rating = Math.floor(recipeRating);
  let rest = Math.round((recipeRating - rating) * 10);
  let starsHTML = ``;

  // half <i class="fa-solid fa-star-half-stroke"></i>

  for (let i = 0; i < 5; i++) {

    if (rating > 0) {
      starsHTML += `<i class="fa-solid fa-star"></i>`;
      rating -= 1;
    } else if (rest > 0) {
      if (rest < 4) {
        starsHTML += `<i class="fa-regular fa-star"></i>`
      } else if (rest < 7) {
        starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;

      } else {
        starsHTML += `<i class="fa-solid fa-star"></i>`;
      }
      rest = 0;
    } else {
      starsHTML += `<i class="fa-regular fa-star"></i>`;
    }
  }

  return starsHTML;
}
/* Fourth */
function createParagraph(list) {
  return list.map((item) => `<p>${item}</p>`).join("");
}

/* Fifth */

function inputEventHandler() {
  const filterValue = INPUT.value.toLowerCase();
  const filteredData = RECIPES.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(filterValue) || recipe.ingredients.join('').toLowerCase().includes(filterValue)
    );
  });
  render(filteredData);
}

// INPUT.addEventListener('input', inputEventHandler)
FORM.addEventListener('submit', e => e.preventDefault())
BUTTON.addEventListener('click', inputEventHandler)

render(RECIPES);