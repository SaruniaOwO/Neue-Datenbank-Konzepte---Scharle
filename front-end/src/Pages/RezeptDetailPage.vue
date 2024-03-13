<template>
  <div>
    <h1>{{ recipeName }}</h1>
    <p>Zutaten:</p>
    <ul>
      <li v-for="ingredient in ingredients" :key="ingredient.name">
        {{ ingredient.name }}{{ ingredient.amount ? ' - ' + ingredient.amount : '' }}
      </li>
    </ul>
  </div>
</template>

<script>
import { recipes } from '@/tempdata';

export default {
  name: 'RezeptDetailPage',
  data() {
    return {
      recipeName: '',
      ingredients: []
    }
  },
  mounted() {
    this.fetchRecipeData();
  },
  methods: {
    fetchRecipeData() {
      const recipeId = this.$route.params.recipeId;
      const recipe = recipes.find(recipe => recipe.recipe_id === Number(recipeId));

      if (recipe) {
        this.recipeName = recipe.recipe_name;
        this.ingredients = recipe.ingredients.map(ingredient => {
          return {
            name: ingredient.name,
            amount: ingredient.amount
          };
        });
      } else {
        console.error('Rezept nicht gefunden.');
      }
    }
  }
}
</script>



<style scoped>
h1 {
  color: #333;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.router-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.router-link:hover {
  background-color: #0056b3;
}
</style>
