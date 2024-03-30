<template>
  <div class="nav-bar">
    <div class="logo-wrap">
      <router-link to="/Uebersicht">
        <img :src="logo" alt="Logo" class="logo" />
      </router-link>
    </div>
    <div class="nav-center">
      <router-link to="/Uebersicht" class="nav-link">Übersicht</router-link>
      <router-link to="/RezeptErsteller" class="nav-link">Rezept erstellen</router-link>
    </div>
    <div class="nav-right">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" @keyup.enter="searchRecipes" class="search-input" placeholder="Rezepte suchen..." />
      </div>
      <button class="search-button" @click="searchRecipes">Suchen</button>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: 'NavBar',
  components: {
  },
  data() {
    return {
      logo,
      searchQuery: '',
    }
  },
  methods: {
    searchRecipes() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'SearchResults', query: { query: this.searchQuery } });
      }
    }
  }
}
</script>

<style>
.nav-bar {
  background-color: #2c3e50;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo-wrap {
  flex: 0 0 auto;
}

.logo {
  max-height: 60px;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #ffffff;
  font-size: 18px;
  text-decoration: none;
  margin-right: 20px;
  font-family: 'Arial', sans-serif;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffd700;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-button {
  background-color: transparent;
  color: #ffffff;
  border: none;
  font-size: 16px;
  margin-top: 5px; 
  cursor: pointer;
}

.search-button:hover {
  color: #ffd700;
}

</style>
