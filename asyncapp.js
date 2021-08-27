const searchFood = async () => {
    const SearchField = document.getElementById('search-input')
    const searchFieldvalue = SearchField.value;
    // console.log(searchFieldvalue);
    SearchField.value = ''
    // get data By Api
    const dataUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldvalue}`
    //console.log(dataUrl);

    const res = await fetch(dataUrl);
    const data = await res.json();
    displaySearchResult(data.meals);

    // fetch(dataUrl)
    //     .then(response => response.json())
    //     .then(data => displaySearchResult(data.meals));


}



const displaySearchResult = meals => {
    const serachResult = document.getElementById('search-result');
    serachResult.textContent = '';
    meals.forEach(meal => {
        //console.log(meal);

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
           <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title">${meal.strMeal}</h5>
             <p> ${meal.strInstructions.slice(0, 250)}</p>
           </div>
        </div>
        `
        serachResult.appendChild(div)
    })

}



const loadMealDetail = async mealId => {

    const dataUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    // console.log(dataUrl);
    const res = await fetch(dataUrl);
    const data = await res.json();
    displayMealDetails(data.meals[0]);

    // fetch(dataUrl)
    //     .then(response => response.json())
    //     .then(data => displayMealDetails(data.meals[0]));
    // // console.log(data.meals[0]);
}

const displayMealDetails = meals => {
    const bigcard = document.getElementById('bigcard')
    bigcard.textContent = ''
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${meals.strMealThumb}" class="card-img" alt="...">
    <div class="card-img-overlay">
        <h5 class="card-title">${meals.strMeal}</h5>
        <p class="card-text">${meals.strInstructions.slice(0, 300)}</p>
       
    </div>`;

    bigcard.appendChild(div);

}