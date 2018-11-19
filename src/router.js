import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Preview from './views/Preview.vue'
import Tutorial from './views/Tutorial.vue'

// PAGES 
import Home from './views/Home.vue'
import About from './views/About.vue'
import Projet from './views/Projet.vue'
import Realisations from './views/Realisations.vue'
import Test from './views/Test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/realisations',
      name: 'realisations',
      component: Realisations
    },
    {
      path: '/realisations/:uid',
      name: 'projet',
      component: Projet
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: Tutorial
    },
    {
      path: '*',
      redirect: { name: 'not-found' }
    }
  ]
})
