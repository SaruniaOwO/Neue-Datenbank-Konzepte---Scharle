<template>
  <div>
    <div v-if="recipe">
      <h1>{{ recipe.recipe_name }}</h1>
      <p>Zutaten:</p>
      <ul>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
          {{ ingredient.name }}{{ ingredient.amount ? ' - ' + ingredient.amount : '' }}
        </li>
      </ul>
      <button @click="deleteRecipe" class="delete-button">Rezept löschen</button>
      <p v-if="deletionMessage" class="deletion-message">{{ deletionMessage }}</p>
    </div>
    <div v-else>
      <p>Das Rezept konnte nicht gefunden werden.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DetailPage',
  data() {
    return {
      recipe: null,
      deletionMessage: ''
    };
  },
  mounted() {
    this.fetchRecipe();
  },
  methods: {
    async fetchRecipe() {
      const recipeId = this.$route.params.recipeId;
      try {
        const response = await axios.get(`http://localhost:8000/api/recipes/${recipeId}`);
        this.recipe = response.data;
        if (!this.recipe) {
          console.error('Rezept nicht gefunden');
        }
      } catch (error) {
        console.error('Fehler beim Abrufen des Rezepts:', error);
      }
    },
    async deleteRecipe() {
      const recipeId = this.$route.params.recipeId;
      try {
        await axios.delete(`http://localhost:8000/api/recipes/${recipeId}`);
        this.deletionMessage = 'Rezept erfolgreich gelöscht'; 
        setTimeout(() => {
          this.$router.push('/uebersicht');
        }, 4000);
      } catch (error) {
        console.error('Fehler beim Löschen des Rezepts:', error);
      }
    },
  },
};
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

.delete-button {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-button:hover {
  background-color: #2980b9;
}

.deletion-message {
  color: green;
}

</style>
