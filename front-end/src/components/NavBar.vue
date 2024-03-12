<template>
  <div class="nav-bar">
    <router-link to="/Uebersicht" class="nav-link">Übersicht</router-link>
    <router-link to="/GemerkteRezepte" class="nav-link">Gemerkte Rezepte</router-link>
    <div class="logo-wrap">
      <img :src="logo" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'NavBar',
  data() {
    return {
      logo,
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

.nav-link {
  color: #ffffff;
  font-size: 18px;
  text-decoration: none;
  margin-right: 20px;
  font-family: 'Arial', sans-serif; /* Schöne Schriftart */
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffd700; /* Farbe ändern bei Hover */
}

.logo-wrap {
  max-width: 120px;
}

.logo {
  max-width: 100%;
}
</style>
