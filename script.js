const search = document.getElementById('search');
const submit = document.getElementById('submit');
const dishes = document.getElementById('dish');

const resultHeading = document.getElementsByClassName('result-heading');
const singleDish = document.getElementById('single-dish');

//search meals
function searchDish(e){
    e.preventDefault();

    //clear single dish
    singleDish.innerHTML = "";

    //get search dish
    const term = search.value;
    
    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search Result For ${term} </h2>`;

            if(data.meals === null){
                resultHeading.innerHTML = `<h2>There Are No Search Result For ${term} </h2>`;
            }
             else{
               dishes.innerHTML = data.meals.map(meal=>`
               <div class="food">
                 <img src="${meal.strMealThumb}" alt="${meal.strMeal}"
               </div>
               `);
             }
         });
        }
}


submit.addEventListener('submit',searchDish);