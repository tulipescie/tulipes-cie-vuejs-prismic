<template>
  <div> 
    <h1>
        {{ $prismic.richTextAsPlain(fields.realisations_title) }}
    </h1>

    <br>

    <u>FILTRES</u>

    <li v-for="(client, index) in clientList" 
    :key="'client-item-' + index"
    v-on:click="filterClients(client)">
      {{ client }}
    </li>

    <br>

     <li v-for="(secteur, index) in secteurList" 
     :key="'secteur-item-' + index"
     v-on:click="filterSecteurs(secteur)">
      {{ secteur }}
    </li>

    <br>

    <button v-on:click="reverseOrder">Inverser l'ordre</button><br>
    <button v-on:click="filterBy($prismic.richTextAsPlain(fields.realisations_title))">Filtrer</button><br>

    <br><br>

    <u>PROJETS</u>

    <br><br>

    <ul>
      <li v-for="(item, index) in projectsDisplayed" :key="'projet-item-' + index">
        <div v-if="item.isVisible">
          <router-link :to="`/realisations/${item.uid}`">
          <div>
            <!-- {{ item }}<br><br> -->

            {{ item.uid }}<br>
            <iframe :src="$prismic.richTextAsPlain(item.data.projet_link_vimeo)
            +'?api=1&loop=1&autoplay=0&background=1'" frameborder="0"
            v-on:mouseover="playVideoOnMouseOver"
            v-on:mouseleave="stopVideoOnMouseleave"></iframe>
          </div>
          </router-link>
        </div>
        <br><br><br>

      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      fields: {
        realisations_title: null
      },
      // contient des documents
      projects: [],
      projectsDisplayed: [],
      secteurList: [],
      clientList: []
    };
  },
  methods: {
    // METHODS POUR L'ENVOI DE DONNEES
    getContent () {
      // init la PAGE réalisations
      this.$prismic.client.getSingle('realisations')
        .then((document) => {
          this.fields.realisations_title = document.data.realisations_title;
        })
      
      // récupère tous les DOCUMENTS projets pour les lister
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'projet'),
        { orderings : '[my.projet.date desc]' }
      ).then((response) => {
        let isVisible = true;
        response.results.forEach(result => {
          result.isVisible = true;
          });
        // stock les données dans le tableau projects
        this.projects = response.results;
        // copie dans le tableau des projects affiches
        this.projectsDisplayed = response.results;
        // set filters
        this.initFilters();
      });
    },
    filterClients(e) {
    // on compare tous les projets
      this.projectsDisplayed.forEach(document => {
        document.data.projet_client_group.forEach(element => {
          if (element.projet_client === e) {
            console.log('oui');
          } else {
            console.log('non')
          }
        });
      },);
    },
    filterSecteurs(e) {
    // on compare tous les projets
      this.projectsDisplayed.forEach(document => {
        document.data.projet_secteurs_group.forEach(element => {
          if (element.projet_secteur === e) {
            console.log('oui');
          } else {
            console.log('non')
          }
        });
      },);
    },

    setActive(projet) {
      console.log(projet)
    },
    
    reverseOrder () {
      this.projectsDisplayed.reverse()
    },
    initFilters() {
      this.$prismic.client.query(
      this.$prismic.Predicates.at('document.type', 'projet'),
      // récupère le document avec juste la valeur 
      { fetch : ['projet.projet_client_group', 'projet.projet_secteurs_group']}

      // récupère tout le document 
      // { fetchLinks : 'projet.projet_title' }
      ).then((response) => {
        response.results.forEach(element => {
          element.data.projet_client_group.forEach(element => {
            if (this.clientList.includes(element.projet_client) == false) {
              this.clientList.push(element.projet_client)
            }
          });
          element.data.projet_secteurs_group.forEach(element => {
            console.log(this.secteurList.includes(element.projet_secteur))
            if (this.secteurList.includes(element.projet_secteur) == false) {
              this.secteurList.push(element.projet_secteur)
            }
            console.log(this.secteurList)
          });

        });
      });
    },
    filterBy () {
      console.log('console')
    },

    updateProjectsDisplayed() {
      // à voir si on l'utilise
    },

    // METHODS POUR GERER LES VIDEOS
    playVideoOnMouseOver (e) {
      // on récupère la vidéo cible
      var iframe = e.target;
      // on la passe dans l'API Viméo
      var player = new Vimeo.Player(iframe);
      player.play();
      
      // checker mettre une durée à la vidéo
    },
    stopVideoOnMouseleave (e) {
      // on récupère la vidéo cible
      var iframe = e.target;
      // on la passe dans l'API Viméo
      var player = new Vimeo.Player(iframe);
      player.pause();
    }
  },
  mounted () {    
  },
  created () {
    this.getContent();
  }
}
</script>