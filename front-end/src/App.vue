<template>
  <NavBar/>
  <h1> REZEPTE </h1>
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  }
};
</script>

<style>
</style>