<template>
  <div> 
    <h1>
        {{ $prismic.richTextAsPlain(fields.realisations_title) }}
    </h1>

    <br>

    <u>FILTRES</u>

    <br><br>

    <button v-for="(client, index) in clientList" 
    :key="'client-item-' + index"
    v-on:click="filterClients(client)">
      {{ client }}
    </button>

    <br>

     <button v-for="(secteur, index) in secteurList" 
     :key="'secteur-item-' + index"
     v-on:click="filterSecteurs(secteur)">
      {{ secteur }}
    </button>

    <br>

    <button v-for="(thematique, index) in thematiqueList" 
    :key="'thematique-item-' + index"
    v-on:click="filterThematiques(thematique)">
      {{ thematique }}
    </button>

    <br>

    <button v-for="(format, index) in formatList" 
    :key="'format-item-' + index"
    v-on:click="filterFormats(format)">
      {{ format }}
    </button>

    <br>

    <button v-for="(realisateur, index) in realisateurList" 
    :key="'realisateur-item-' + index"
    v-on:click="filterRealisateurs(realisateur)">
      {{ realisateur }}
    </button>

    <br><br>

    <button @:click="reverseOrder">Inverser l'ordre</button><br>
    <button @:click="deleteFilters">Reinitialiser les filtres</button><br>

    <br><br>

    <u>PROJETS</u>

    <br><br>

    <ul>
      <li v-for="(item, index) in projectsDisplayed" 
      :key="'projet-item-' + index" 
      v-bind:disabled="item.isVisible">
      <!-- <li v-for="(item, index) in projectsDisplayed" :key="'projet-item-' + index" 
      v-if="item.isVisible"> -->
        <div>
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
      clientList: [],
      thematiqueList: [],
      formatList: [],
      realisateurList: []
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
      let compare = function(element) {
        return element.projet_client === e;
      };
      this.projectsDisplayed.forEach(document => {
        let array = document.data.projet_client_group;
          if (array.length < 1) {
            document.isVisible = false;
          } else {
            if (document.data.projet_client_group.some(compare)) {
                document.isVisible = true;
              } else {
                document.isVisible = false;
              }
          }
      },);
    },
    filterSecteurs(e) {
      let compare = function(element) {
        return element.projet_secteur === e;
      };
      this.projectsDisplayed.forEach(document => {
        let array = document.data.projet_secteur_group;
          if (array.length < 1) {
            document.isVisible = false;
          } else {
            if (document.data.projet_secteur_group.some(compare)) {
                document.isVisible = true;
              } else {
                document.isVisible = false;
              }
          }
      },);
    },
    filterThematiques(e) {
    let compare = function(element) {
        return element.projet_thematique === e;
      };
      this.projectsDisplayed.forEach(document => {
        let array = document.data.projet_thematique_group;
          if (array.length < 1) {
            document.isVisible = false;
          } else {
            if (document.data.projet_thematique_group.some(compare)) {
                document.isVisible = true;
              } else {
                document.isVisible = false;
              }
          }
      },);
    },
    filterFormats(e) {
    let compare = function(element) {
        return element.projet_format === e;
      };
      this.projectsDisplayed.forEach(document => {
        let array = document.data.projet_format_group;
          if (array.length < 1) {
            document.isVisible = false;
          } else {
            if (document.data.projet_format_group.some(compare)) {
                document.isVisible = true;
              } else {
                document.isVisible = false;
              }
          }
      },);
    },
    filterRealisateurs(e) {
    let compare = function(element) {
        return element.projet_realisateur === e;
      };
      this.projectsDisplayed.forEach(document => {
        let array = document.data.projet_realisateur_group;
          if (array.length < 1) {
            document.isVisible = false;
          } else {
            if (document.data.projet_realisateur_group.some(compare)) {
                document.isVisible = true;
              } else {
                document.isVisible = false;
              }
          }
      });
    },
    initFilters() {
      this.$prismic.client.query(
      this.$prismic.Predicates.at('document.type', 'projet'),
      // récupère le document avec juste la valeur 
      { fetch : [
      'projet.projet_client_group', 
      'projet.projet_secteur_group',
      'projet.projet_format_group',
      'projet.projet_thematique_group',
      'projet.projet_realisateur_group'
      ]}

      // récupère tout le document 
      // { fetchLinks : 'projet.projet_title' }
      ).then((response) => {
        response.results.forEach(element => {
          // console.log(element)
          element.data.projet_client_group.forEach(element => {
            if (this.clientList.includes(element.projet_client) == false) {
              this.clientList.push(element.projet_client)
            }
          });
          element.data.projet_secteur_group.forEach(element => {
            if (this.secteurList.includes(element.projet_secteur) == false) {
              this.secteurList.push(element.projet_secteur)
            }
          });
          element.data.projet_thematique_group.forEach(element => {
            if (this.thematiqueList.includes(element.projet_thematique) == false) {
              this.thematiqueList.push(element.projet_thematique)
            }
          });
          element.data.projet_format_group.forEach(element => {
            if (this.formatList.includes(element.projet_format) == false) {
              this.formatList.push(element.projet_format)
            }
          });
          element.data.projet_realisateur_group.forEach(element => {
            if (this.realisateurList.includes(element.projet_realisateur) == false) {
              this.realisateurList.push(element.projet_realisateur)
            }
          });

        });
      });
    },
    deleteFilters () {
      this.projectsDisplayed.forEach(element => {
        element.isVisible = true;
      });
    },
    reverseOrder () {
      this.projectsDisplayed.reverse()
    },
    filterBy () {
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
  },
  destroyed () {
    console.log('destroyed')
  }
}
</script>