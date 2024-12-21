let rowDate = document.getElementById("rowDate")
const searchBtn = document.getElementById("searchBtn")
const categoryBtn = document.getElementById("categoryBtn")
const areaBtn = document.getElementById("areaBtn")
const ingredientBtn = document.getElementById("ingredientBtn")
const contactBtn = document.getElementById("contactBtn")

// validation
let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let phoneInput = document.getElementById("phoneInput")
let ageInput = document.getElementById("ageInput")
let passwordInput = document.getElementById("passwordInput")
let rePasswordInput = document.getElementById("rePasswordInput")


// //nav-bar

$("#toggle").on("click", function () {

    $(".nav-links li a").animate({
        top: 500
    }, 500)

    for (let i = 0; i < 5; i++) {
        $(".nav-links li a").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
    // navbar animate
    $(".nav-bar .outer-width").animate({
        width: "toggle"
    }, 1000, function () {

        if ($(".nav-bar .outer-width").is(":visible")) {

            $("#toggle").removeClass("fa-bars")
            $("#toggle").addClass("fa-close")

        } else {

            $("#toggle").addClass("fa-bars")
            $("#toggle").removeClass("fa-close")

        }
    });

});
//close nav after click a
$(".outer-width li a").on("click", function () {
    $(".outer-width").animate({
        width: "toggle"
    }, 1000)
    $("#toggle").addClass("fa-bars")
    $("#toggle").removeClass("fa-close")
    $(".search").addClass("d-none");
    $(".contact").addClass("d-none");



})

$(document).on("click", ".col-md-3", function() {
    $("html,body").scrollTop(0)
});
//section home

async function searchByName() {
    $(".loading").removeClass("d-none")

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let finalResponse = await response.json();
    $(".loading").addClass("d-none")

    displayMeals(finalResponse.meals)


}

searchByName()

function displayMeals(arrMeals) {
    let container = ``;
    for (let i = 0; i < arrMeals.length; i++) {
        container += `<div class="col-md-3">
                    <div onclick="getMealDetalis('${arrMeals[i].idMeal}')" class="meal text-black   ">
                        <img class="w-100" src="${arrMeals[i].strMealThumb}"
                            alt="">
                        <div class="meal-layer d-flex justify-content-center align-items-center">
                            <h2>${arrMeals[i].strMeal}</h2>
                        </div>
                    </div>
                </div>`
    }
    rowDate.innerHTML = container;
}


// get Gategories
let cachedCategories = null;

async function getCategories() {
    if (cachedCategories==null) {
        $(".loading").removeClass("d-none");
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let finalResponse = await response.json();
        cachedCategories = finalResponse.categories;
        $(".loading").addClass("d-none");
    }
    displayCategories(cachedCategories);
}


categoryBtn.addEventListener("click", function () {
    getCategories()
})



function displayCategories(arrMeals) {
    let container = ``;
    for (let i = 0; i < arrMeals.length; i++) {
        container += `<div class="col-md-3 ">
                    <div onclick="getCategoriesMeals('${arrMeals[i].strCategory}')" class="meal text-black  p-3 ">
                        <img class="w-100" src="${arrMeals[i].strCategoryThumb}"
                            alt="">
                        <div class="meal-layer text-center p-1 fs-5">
                            <h2>${arrMeals[i].strCategory}</h2>
                            <p>${arrMeals[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>`
    }
    rowDate.innerHTML = container;
}


// get area

async function getAreas() {
    $(".loading").removeClass("d-none")

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let finalResponse = await response.json();
    displayAreas(finalResponse.meals)
    $(".loading").addClass("d-none")


}

areaBtn.addEventListener("click", function () {
    getAreas()
})



function displayAreas(arrMeals) {
    let container = ``;
    for (let i = 0; i < arrMeals.length; i++) {
        container += `
                <div class="col-md-3">
                    <div onclick="getAreasMeals('${arrMeals[i].strArea}')" class="meal text-white text-center">
                        <i class="fa-solid fa-house fa-4x"></i>
                        <h3>${arrMeals[i].strArea}</h3>
                    </div>
                </div>
            `
    }
    rowDate.innerHTML = container;
}

//  get Ingredients
async function getIngredients() {
    $(".loading").removeClass("d-none")

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let finalResponse = await response.json();
   
    displayIngredients(finalResponse.meals.slice(0, 25))
    $(".loading").addClass("d-none")


}

ingredientBtn.addEventListener("click", function () {
    getIngredients()
})



function displayIngredients(arrMeals) {
    let container = ``;
    for (let i = 0; i < arrMeals.length; i++) {
        container += `
                <div class="col-md-3 ">
                    <div onclick="getIngridientsMeals('${arrMeals[i].strIngredient}')" class="meal cursor-pointer text-white text-center">
                        <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                        <h2 class="">${arrMeals[i].strIngredient}</h2>
                        <p>${(arrMeals[i].strDescription || "").split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            `
    }
    rowDate.innerHTML = container;
}

//get category meals
async function getCategoriesMeals(category) {
    $(".loading").removeClass("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let finalResponse = await response.json();
   
    displayMeals(finalResponse.meals) //call for displayMeals becouse same thing 
    $(".loading").addClass("d-none")


}
//get areas meals
async function getAreasMeals(country) {
    $(".loading").removeClass("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    let finalResponse = await response.json();

    displayMeals(finalResponse.meals) //call for displayMeals becouse same thing 
    $(".loading").addClass("d-none")

}
//get areas meals

async function getIngridientsMeals(ingridients) {
    $(".loading").removeClass("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingridients}`);
    let finalResponse = await response.json();

    displayMeals(finalResponse.meals) //call for displayMeals becouse same thing 
    $(".loading").addClass("d-none")


}


//details by click

async function getMealDetalis(mealId) {
    $(".loading").removeClass("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let finalResponse = await response.json();
    
    displayMealsDetailes(finalResponse.meals[0]) //call for displayMeals becouse same thing 
    $(".loading").addClass("d-none")

}



function displayMealsDetailes(meal) {

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<span class="btn btn-outline-info tag cursor-auto  me-2 mb-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) {
        tags = []
    }

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <span class="tag">${tags[i]}</span>`
    }

    let container = ` <div class="col-md-4">
        <img src="${meal.strMealThumb}" alt="Recipe Image" class="img-fluid recipe-img  w-100 rounded-2">
        <h3 class="mt-3">Instructions</h3>
      </div>
      <div class="col-md-8 text-white ">
        <h2>Instructions</h2>
        <p class="fs-6 custom-font-size fs-6">${meal.strInstructions}</p>
        <h5>Area: <span class="text-warning">${meal.strArea}</span></h5>
        <h5>Category: <span class="text-warning">${meal.strCategory}</span></h5>
        <h5>Recipes:</h5>
        <div class="d-flex flex-wrap">
              ${ingredients}

        </div>
        <h5>Tags:</h5>
        <div>
                 ${tagsStr}

        </div>
        <div class="mt-3">
          <button  class="btn btn-success p-2 me-2"><a target="_blank" href="${meal.strSource}">Source</a></button>
          <button  class="btn btn-danger  p-2"><a target="_blank" href="${meal.strYoutube}">Youtube</a></button>
        </div>
      </div>`
    rowDate.innerHTML = container;
}



//search by name

async function getSearchByName(mealName) {
    try {
        // $(".loading").removeClass("d-none")

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        let result = await response.json()

        displayMeals(result.meals)

        $(".alert-danger").addClass("d-none")

    } catch {
        $(".alert-danger").removeClass("d-none")
        $(".loading").addClass("d-none")

        displayMeals([])
    }

}

searchBtn.addEventListener("click", function () {

    $(".search").removeClass("d-none");
    $(".contact").addClass("d-none");

    rowDate.innerHTML = "";
})
//search by firstLetter

async function getSearchByFirstLetter(firstLetter) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${firstLetter}`)
    let result = await response.json()

    displayMeals(result.meals)


}

//show contact section by click a(contact)

$(".nav-links #contactBtn").on("click", function () {
    $(".contact").removeClass("d-none")
    rowDate.innerHTML = ""
})



// //validation forms
function validationInputs(element) {
    
    let regex = {
        nameInput: /^[a-zA-Z\s]{3,20}$/,
        emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phoneInput: /^\+?[0-9]{10,15}$/,
        ageInput: /^(1[0-1][0-9]|120|[1-9][0-9]?)$/,
        passwordInput: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };

    if (element.id === "rePasswordInput") {
        if (element.value === passwordInput.value) {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            element.nextElementSibling.classList.add("d-none");
        } else {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
            element.nextElementSibling.classList.remove("d-none");
        }
    } 
    else if ((regex[element.id]).test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
    }

    checkFormValidity();
}

function checkFormValidity() {
    const inputs = document.querySelectorAll(".contact input");
    const disableBtn = document.getElementById("disableBtn");

    let allValid = true;
    for (let input of inputs) {
        if (!input.classList.contains("is-valid")) {
            allValid = false;
            break;
        }
        
    }

    if (allValid) {
        disableBtn.classList.remove("disabled");
    } else {
        disableBtn.classList.add("disabled");
    }
}



