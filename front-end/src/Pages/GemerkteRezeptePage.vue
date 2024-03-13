<template>
  <div>
    <h1>Gemerkte Rezepte</h1>
    <p>Hier sind deine gemerkten Rezepte:</p>
    <div v-if="markedRecipes.length > 0">
      <div v-for="recipeId in markedRecipes" :key="recipeId" class="recipe-item">
        <h3>{{ getRecipeName(recipeId) }}</h3>
        <ul>
          <li v-for="ingredient in getRecipeIngredients(recipeId)" :key="ingredient.name">
            {{ ingredient.amount ? ingredient.amount + ' ' : '' }}{{ ingredient.name }}
          </li>
        </ul>
      </div>
    </div>
    <p v-else>Keine Rezepte gemerkt.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GemerkteRezeptePage',
  data() {
    return {
      recipes: [],
      markedRecipes: [],
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await axios.get('http://localhost:8000/api/recipes');
        this.recipes = response.data;
      } catch (error) {
        console.error('Fehler beim Abrufen der Rezepte:', error);
      }
    },
    getRecipeName(recipeId) {
      const recipe = this.recipes.find(recipe => recipe._id === recipeId);
      return recipe ? recipe.recipe_name : '';
    },
    getRecipeIngredients(recipeId) {
      const recipe = this.recipes.find(recipe => recipe._id === recipeId);
      return recipe ? recipe.ingredients : [];
    },
  },
};
</script>


<style scoped>
.recipe-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-left: 20px;
}
</style>
