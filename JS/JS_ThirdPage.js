document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-container div");

    // Map des catégories API pour Entrée, Plat et Dessert
    const apiCategories = {
        "entrée": ["Starter"], 
        "plat": ["Chicken"], 
        "dessert": "Dessert"
    };

    menuItems.forEach((menuItem, index) => {
        const categoryName = Object.keys(apiCategories)[index]; // entrée, plat, dessert
        const apiCategory = apiCategories[categoryName]; // Catégorie API correspondante

        // Fetch de repas dans la catégorie correspondante
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${apiCategory}`)
            .then(response => response.json())
            .then(data => {
                // Choisir un repas aléatoire parmi les résultats
                const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];

                // Obtenir les détails du repas
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`)
                    .then(response => response.json())
                    .then(detailData => {
                        const meal = detailData.meals[0];

                        // Mettre à jour l'image, le nom, et le lien YouTube
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
