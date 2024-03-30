<template>
  <form class="formular" @submit.prevent="bestätigen">
    <div class="eingaben">
      <label>Titel</label>
      <input type="text" v-model="recipeData.recipe_name" required />
    </div>
    <div class="eingaben">
      <label>Zutaten</label>
      <div v-for="(ingredient, index) in recipeData.ingredients" :key="index">
        <input type="text" v-model="ingredient.name" placeholder="Zutat" required />
        <input type="text" v-model="ingredient.amount" placeholder="Menge" required />
        <button type="button" @click="removeIngredient(index)">Entfernen</button>
      </div>
      <button type="button" @click="addIngredient">Zutat hinzufügen</button>
    </div>
    <div v-if="fehlermeldung" class="fehlermeldung">
      {{ fehlermeldung }}
    </div>
    <div v-if="erfolgsmeldung" class="erfolgsmeldung">
      {{ erfolgsmeldung }}
    </div>
    <button type="submit">Bestätigen und Hinzufügen</button>
  </form>
</template>

<script>
import axios from 'axios'; 

export default {
  name: "RezeptErsteller",
  data() {
    return {
      recipeData: {
        recipe_name: "",
        ingredients: [{ name: "", amount: "" }]
      },
      fehlermeldung: "",
      erfolgsmeldung: "", 
    };
  },
  methods: {
    generateId() {
      return Math.floor(Math.random() * Date.now());
    },
    async bestätigen() {
      this.recipeData.recipe_id = this.generateId();
      console.log("Aktuelle recipeData vor dem Senden:", this.recipeData);
      try {
        const response = await axios.post('http://localhost:8000/api/recipes', this.recipeData);
        if (response.status === 201) {
          this.erfolgsmeldung = "Rezept erfolgreich erstellt!";
          this.recipeData = { recipe_name: "", ingredients: [{ name: "", amount: "" }] }; 
          setTimeout(() => { this.erfolgsmeldung = ""; this.$router.push('Uebersicht'); }, 3000); 
        }
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Rezepts:", error);
        this.fehlermeldung = "Leider konnte das Rezept nicht erstellt werden. Bitte versuchen Sie es erneut.";
      }
    },
    addIngredient() {
      this.recipeData.ingredients.push({ name: "", amount: "" });
    },
    removeIngredient(index) {
      this.recipeData.ingredients.splice(index, 1);
    }
  },
};

</script>

<style scoped>
.recipe-form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.formular {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

.ingredient-group {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.remove-btn {
  margin-left: 5px;
  background-color: #ff7f7f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.fehlermeldung {
  color: #ff7f7f;
  margin-top: 10px;
}

.erfolgsmeldung {
  color: green;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
}

</style>
