const search = document.getElementById('search');
const submit = document.getElementById('submit');
const dishes = document.getElementById('meals');
const container = document.getElementById('container');

const singleDish = document.getElementById('single-dish');

//search meals
const searchDish = (e) =>{
    e.preventDefault();
    //get search dish
    const term = search.value;
    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        .then(res => res.json())
        .then(data => {
            if(data.meals === null){
                // resultHeading.innerHTML = `<h2>There Are No Search Result For ${term} </h2>`;
            }
             else{
                  foods = data.meals;
                   dishes.innerHTML = foods.map((f)=>`
                   <div onclick=displayFoodDetail("${f.idMeal}") class="card">
                         <img src="${f.strMealThumb}" alt="${f.strMeal}">
                          <p>${f.strMeal}</p>
                       </div>
                   `).join("");
             }
         });
        }
        else{
            alert("Please Insert  Value In Searchbox");
        }
    }

submit.addEventListener('submit',searchDish);

const displayFoodDetail = (id) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => seeFullIngredients(data.meals[0]));
}

const seeFullIngredients = (food) => {
    container.style.display = 'none';
    const foodDetail = document.getElementById('food-detail');
    foodDetail.innerHTML =`
    <div class="card2">
    <img src="${food.strMealThumb}" alt="John" style="width:100%">
     <div class="text">
     <h2>${food.strMeal}</h2>
     <h4>Ingredients</h4>
      <ol>
        <li><span></span>${food.strIngredient1}</li>
        <li>${food.strIngredient2}</li>
        <li>${food.strIngredient3}</li>
        <li>${food.strIngredient4}</li>
        <li>${food.strIngredient5}</li>
        <li>${food.strIngredient6}</li>
      </ol>
     </div>
    </div>
    `;
}