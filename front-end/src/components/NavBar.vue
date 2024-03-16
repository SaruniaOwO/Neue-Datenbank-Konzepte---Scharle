<template>
  <div class="nav-bar">
    <div class="logo-wrap">
      <router-link to="/">
        <img :src="logo" alt="Logo" class="logo" />
      </router-link>
    </div>
    <div class="nav-center">
      <router-link to="/Uebersicht" class="nav-link">Übersicht</router-link>
      <router-link to="/GemerkteRezepte" class="nav-link">Gemerkte Rezepte</router-link>
    </div>
    <div class="nav-right">
      <div class="search-bar">
        <input type="text" placeholder="Suchen..." class="search-input">
      </div>
      <button class="search-button">Suchen</button>
      <button class="login-button" @click="openLoginModal">Login</button>
    </div>
    <login-modal v-if="showLoginModal" @close="closeLoginModal"></login-modal>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import LoginModal from './LoginModal.vue';

export default {
  name: 'NavBar',
  data() {
    return {
      logo,
      showLoginModal: false,
    }
  },
  components: {
    LoginModal
  },
  methods: {
    openLoginModal() {
      this.showLoginModal = true;
    },
    closeLoginModal() {
      this.showLoginModal = false;
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
  margin-top: 5px; /* Abstand zwischen Suchleiste und Suchbutton */
  cursor: pointer;
}

.search-button:hover {
  color: #ffd700;
}

.login-button {
  background-color: transparent;
  color: #ffffff;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.login-button:hover {
  color: #ffd700;
}
</style>
