import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        setRecipes(response.data.recipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        🍴 Recipe Gallery
      </h1>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h5 className="text-xl font-semibold mb-3">{recipe.name}</h5>

              <p>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>

              <p>
                <strong>Difficulty:</strong> {recipe.difficulty}
              </p>

              <p>
                <strong>Rating:</strong> ⭐ {recipe.rating}
              </p>

              <p>
                <strong>Calories:</strong> {recipe.caloriesPerServing}
              </p>
            </div>

            <div className="p-4 border-t">
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold">
                {selectedRecipe.name}
              </h2>

              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-2xl font-bold text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full rounded-lg mb-4"
              />

              <p>
                <strong>Cuisine:</strong> {selectedRecipe.cuisine}
              </p>

              <p>
                <strong>Difficulty:</strong> {selectedRecipe.difficulty}
              </p>

              <p>
                <strong>Prep Time:</strong>{" "}
                {selectedRecipe.prepTimeMinutes} min
              </p>

              <p>
                <strong>Cook Time:</strong>{" "}
                {selectedRecipe.cookTimeMinutes} min
              </p>

              <p>
                <strong>Rating:</strong> ⭐ {selectedRecipe.rating}
              </p>

              <p>
                <strong>Calories:</strong>{" "}
                {selectedRecipe.caloriesPerServing}
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                Ingredients
              </h3>

              <ul className="list-disc pl-6">
                {selectedRecipe.ingredients?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                Instructions
              </h3>

              <ol className="list-decimal pl-6">
                {selectedRecipe.instructions?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;