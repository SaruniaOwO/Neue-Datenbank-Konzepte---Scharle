<template>
  <div>
    <h1>Übersicht</h1>
    <p>Hier ist eine Übersicht von leckeren Rezepten:</p>
    <div class="recipe-grid">
      <div v-for="recipe in recipes" :key="recipe.recipe_id" class="recipe-item">
        <h3>{{ recipe.recipe_name }}</h3>
        <p>Zutaten: {{ getIngredients(recipe.ingredients) }}</p>
        <button @click="goToDetailPage(recipe.recipe_id)">Detailansicht</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UebersichtPage',
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.fetchRecipes();
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
    goToDetailPage(recipeId) {
    console.log('recipeId:', recipeId); 
    this.$router.push(`/rezept-detail/${recipeId}`);
    },
    getIngredients(ingredients) {
      return ingredients.map(ingredient => ingredient.name).join(', ');
    },
  },
};
</script>




<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.recipe-item {
  border: 1px solid #ccc;
  padding: 10px;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
