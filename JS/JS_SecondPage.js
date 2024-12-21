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
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div>
                <h2 id="${meal.idMeal}" onclick="openPopup(${meal.idMeal})">${meal.strMeal}</h2>
                <a href="${meal.strSource}" target="_blank">Voir la recette complète</a><br>
                ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">Vidéo YouTube</a>` : ''}
            </div>
        `;

        // Ajouter la carte à la liste des recettes
        recipeListDiv.appendChild(recipeCard);
    });
}

// Fonction pour ouvrir un popup avec les détails de la recette (ingrédients et instructions)
function openPopup(mealId) {
    // URL de l'API TheMealDB pour récupérer les détails d'une recette par ID
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    // Utiliser fetch pour récupérer les détails de la recette
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.meals && data.meals[0]) {
                const meal = data.meals[0];
                // Extraire les ingrédients et les instructions
                const ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];
                    if (ingredient) {
                        ingredients.push(`${measure} ${ingredient}`);
                    }
                }

                const instructions = meal.strInstructions;

                // Créer le contenu du popup
                const popupContent = `
                <span id="close" onclick="closePopup()">&times;</span>
                <div>
                    <h2>${meal.strMeal}</h2>
                    <h3>Ingrédients :</h3>
                    <ul>
                        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3>Instructions :</h3>
                    <p>${instructions}</p>
                </div>
                `;

                // Afficher le popup
                const popup = document.getElementById("popup");
                popup.innerHTML = popupContent;
                popup_container.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des détails de la recette:', error);
        });
}

// Fonction pour fermer le popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup_container.style.display = 'none';
}
