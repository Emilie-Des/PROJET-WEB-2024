document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-container div");

    const mealCategories = ["Chicken", "Beef", "Miscellaneous", "Seafood", "Lamb", "Goat", "Pasta", "Pork", "Vegetarian"]
    const randomCategory = mealCategories[Math.floor(Math.random() * mealCategories.length)]
    
    const apiCategories = {
        "entrée": "Starter", 
        "plat": randomCategory, 
        "dessert": "Dessert"
    };

    menuItems.forEach((menuItem, index) => {
        const categoryName = Object.keys(apiCategories)[index]; 
        const apiCategory = apiCategories[categoryName]; 

        
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${apiCategory}`)
            .then(response => response.json())
            .then(data => {
                
                const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];

                
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`)
                    .then(response => response.json())
                    .then(detailData => {
                        const meal = detailData.meals[0];

                        
                        menuItem.querySelector("img").src = meal.strMealThumb;
                        menuItem.querySelector("p").textContent = meal.strMeal;
                        const link = menuItem.querySelector("a");
                        link.href = meal.strYoutube ? meal.strYoutube : "#";
                        link.textContent = meal.strYoutube ? "Voir sur YouTube" : "Lien non disponible";
                    });
            })
            .catch(error => console.error("Erreur :", error));
    });
});
