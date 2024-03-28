<template>
  <div class="search-results">
    <h2>Suchergebnisse</h2>
    <div v-if="results.length">
      <div v-for="recipe in results" :key="recipe.recipe_id" class="search-result-item">
        <!-- Anzeigen der Rezeptdaten -->
        <h3>{{ recipe.recipe_name }}</h3>
        <p>{{ recipe.ingredients }}</p>
        <!-- Weitere Rezeptdaten anzeigen -->
      </div>
    </div>
    <div v-else>
      !Keine Ergebnisse gefunden.
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
    }
  },
  watch: {
    '$route.query.query': function(newVal, oldVal) {
      if (newVal !== oldVal) this.fetchResults();
    }
  }
};
</script>

  
  <style>
  /* Füge hier deinen CSS-Code hinzu */
  </style>
  