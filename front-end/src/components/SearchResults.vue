<template>
  <div class="search-results">
    <h2>Suchergebnisse</h2>
    <div v-if="results.length">
      <div v-for="recipe in results" :key="recipe.recipe_id" class="search-result-item">
        <h3>{{ recipe.recipe_name }}</h3>
        <p>Zutaten: {{ getIngredients(recipe.ingredients) }}</p>
        <button @click="goToDetailPage(recipe.recipe_id)">Detailansicht</button>
      </div>
    </div>
    <div v-else>
      <p>Keine Ergebnisse gefunden.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchResults',
  data() {
    return {
      results: [],
    };
  },
  created() {
    this.fetchResults();
  },
  methods: {
    fetchResults() {
      const query = this.$route.query.query;
      if (query) {
        axios.get(`http://localhost:8000/api/recipes/search?query=${query}`)
          .then(response => {
            this.results = response.data;
          })
          .catch(error => {
            console.error('Fehler bei der Suche:', error);
          });
      }
    },
    goToDetailPage(recipeId) {
      this.$router.push(`/rezept-detail/${recipeId}`);
    },
    getIngredients(ingredients) {
      return ingredients.map(ingredient => ingredient.name).join(', ');
    },
  },
  watch: {
    '$route.query.query': function(newVal, oldVal) {
      if (newVal !== oldVal) this.fetchResults();
    }
  }
};
</script>

  
  <style>
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
  