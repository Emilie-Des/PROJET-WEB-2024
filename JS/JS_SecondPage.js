// Fonction pour récupérer des recettes à partir de l'API TheMealDB
function fetchRecipes() {
    // Récupérer le nom du plat depuis le champ de saisie
    const recipeName = document.getElementById("recipe-name").value.trim();
    
    // Vérifier si le champ est vide
    if (!recipeName) {
        alert("Veuillez entrer un nom de plat.");
        return;
    }

    // URL de l'API TheMealDB pour rechercher des recettes par nom
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`;

    // Utiliser fetch pour faire la requête à l'API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Vérifier si des recettes ont été trouvées
            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                document.getElementById("recipe-list").innerHTML = "<p>Aucune recette trouvée.</p>";
            }
        })
        .catch(error => {
            // Afficher une erreur si la requête échoue
            document.getElementById("recipe-list").innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        });
}

// Fonction pour afficher les recettes récupérées sur la page
function displayRecipes(meals) {
    const recipeListDiv = document.getElementById("recipe-list");
    recipeListDiv.innerHTML = '';  // Vider la liste avant de l'actualiser

    meals.forEach(meal => {
        // Créer une carte pour chaque recette
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        
        // Ajouter les informations sur la recette
        recipeCard.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <p><a href="${meal.strSource}" target="_blank">Voir la recette complète</a></p>
            ${meal.strYoutube ? `<p><a href="${meal.strYoutube}" target="_blank">Vidéo YouTube</a></p>` : ''}
        `;
        
        // Ajouter la carte à la liste des recettes
        recipeListDiv.appendChild(recipeCard);
    });
}