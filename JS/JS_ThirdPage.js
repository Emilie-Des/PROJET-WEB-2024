document.addEventListener("DOMContentLoaded", function () {
    // Récupérer tous les divs enfants de "menu-container"
    const menuItems = document.querySelectorAll(".menu-container div");

    // Itérer sur chaque catégorie (Entrée, Plat, Dessert)
    menuItems.forEach((menuItem) => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];

                // Mettre à jour l'image, le nom et le lien
                menuItem.querySelector("img").src = meal.strMealThumb;
                menuItem.querySelector("p").textContent = meal.strMeal;
                const link = menuItem.querySelector("a");
                link.href = meal.strYoutube ? meal.strYoutube : "#";
                link.textContent = meal.strYoutube ? "Voir sur YouTube" : "Lien non disponible";
            })
            .catch(error => console.error("Erreur :", error));
    });
});
