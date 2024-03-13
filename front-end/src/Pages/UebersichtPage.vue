<template>
  <div>
    <h1>Übersicht</h1>
    <p>Hier ist eine Übersicht von leckeren Rezepten:</p>
    <div class="recipe-grid">
      <div v-for="recipe in recipes" :key="recipe.recipe_id" class="recipe-item">
        <h3>{{ recipe.recipe_name }}</h3>
        <button @click="goToDetailPage(recipe.recipe_id)">Detailansicht</button>
        <button @click="toggleMarked(recipe.recipe_id)">
          {{ isMarked(recipe.recipe_id) ? 'Markierung aufheben' : 'Markieren' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { recipes } from '@/tempdata';

export default {
  name: 'UebersichtPage',
  data() {
    return {
      recipes,
      markedRecipes: [],
    };
  },
  methods: {
    goToDetailPage(recipeId) {
      this.$router.push(`/Uebersicht/${recipeId}`);
    },
    toggleMarked(recipeId) {
      const index = this.markedRecipes.indexOf(recipeId);
      if (index !== -1) {
        this.markedRecipes.splice(index, 1);
      } else {
        this.markedRecipes.push(recipeId);
      }
    },
    isMarked(recipeId) {
      return this.markedRecipes.includes(recipeId);
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
