<template>
  <div id="app">
    <navigation/>

    <br>

    <router-view/>
    <footer-prismic/>
  </div>
</template>

<script>
import FooterPrismic from './components/FooterPrismic.vue'
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    FooterPrismic,
    Navigation
  }
}
</script>

<style>
@import "./assets/css/resetr.css";
@import "./assets/css/prismic-edit-button.css";
</style>
