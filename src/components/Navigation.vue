<template>
  <nav>
    <ul>
      <li>
        <router-link to='/'>
          Home
        </router-link>
      </li>
      <li>
        <router-link to='/about'>
          About
        </router-link>
      </li>
      <li>
        <router-link to='/realisations'>
          Réalisations
        </router-link>
      </li>
    </ul>
    
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  beforeRouteUpdate (to, from, next) {
    console.log(this)
  }
}
</script>
