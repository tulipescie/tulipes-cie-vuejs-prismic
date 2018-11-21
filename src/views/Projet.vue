<template>
  <div> 
    <h1 v-if="textValid(fields.projet_title)">
      {{ $prismic.richTextAsPlain(fields.projet_title) }}
    </h1>
    
    <div v-if="textValid(fields.projet_subtitle)">
        {{ $prismic.richTextAsPlain(fields.projet_subtitle) }}
    </div>

    <br>

    <div id="video" style="position: relative">
      <div class="hover" style="position: absolute; width: 100%; height: 100%; z-index: 999"></div>
    </div>

    <button class="play" id="play-button">play</button>
    <button class="pause" id="pause-button">pause</button>
    <br>

    <div v-if="textValid(fields.projet_description)">
          <prismic-rich-text :field="fields.projet_description"/> 
    </div>

    <br>
    <div v-if="imgValid(fields.projet_img_main)">
      <prismic-image :field="fields.projet_img_main"/>
    </div>

    <br>
    <div v-if="fields.projet_content_group" v-for="(item, index) in fields.projet_content_group" :key="'content-' + index">        
        <h2 v-if="textValid(item.projet_content_title)">
          {{ $prismic.richTextAsPlain(item.projet_content_title) }}
        </h2>

        <prismic-rich-text 
        v-if="textValid(item.projet_content_description)"
        :field="item.projet_content_description"/> 

        <prismic-image v-if="imgValid(item.projet_content_img)"
        :field="item.projet_content_img"/>
    </div>
    
    <div v-if="this.previousProject">
      <router-link :to="'/realisations/' + this.previousProject.uid">
        projet d'avant
      </router-link>
    </div>
    <div v-if="this.nextProject">
      <router-link :to="'/realisations/' + this.nextProject.uid">
        projet d'après
      </router-link>
    </div>
    <!-- {{ this.previousProject.uid }} -->
    
  </div>
</template>
 
<script>
export default {
  name: 'Projet',
  data () {
    return {
      fields: {
        documentId: '',
        projet_title: null,
        projet_subtitle: null,
        projet_description: null,
        projet_img_main: null,
        projet_link_vimeo: null,
        projet_content_group: null
      },
      nextProject: null,
      previousProject: null,
    };
  },
  methods: {
    textValid (element) {
      if (element && element.length > 0 && element[0].text) {
        return true
      } else {
        return false
      }
    },
    imgValid (element) {
      if (element && element.url) {
        return true
      } else {
        return false
      }
    },
    console (item) {
      console.log(item);
    },
    getContent (uid) {
      this.$prismic.client.getByUID('projet', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.documentDate = document.first_publication_date
            this.fields.projet_title = document.data.projet_title
            this.fields.projet_subtitle = document.data.projet_subtitle
            this.fields.projet_description = document.data.projet_description
            this.fields.projet_img_main = document.data.projet_img_main
            this.fields.projet_link_vimeo = document.data.projet_link_vimeo,
            this.fields.projet_content_group = document.data.projet_content_group,
            this.initVimeo(this.fields.projet_link_vimeo)
            this.initBtn()
          } else {
            this.$router.push({ name: 'not-found' })
          }
        })
    },
    initBtn () {
      this.$prismic.client.query(
        this.$prismic.Predicates
        .at('document.type', 'projet'),
      ).then((response) => {
        // retourne l'index du projet visionné pour chopper celui d'avant et d'après
        const index = response.results.findIndex(projets => projets.id === this.documentId);
        this.previousProject = response.results[index - 1]
        this.nextProject = response.results[index + 1]
      });
    },
    initVimeo (objvimeo) {
      // console.log("INIT VIMEO")
      let linkvimeo = objvimeo[0].text
      // console.log(linkvimeo)
      let options = {
        id: linkvimeo,
        api: true,
        loop:true,
        autoplay: true,
        background:true
      };

      let video01Player = new Vimeo.Player('video', options);
      video01Player.pause()
      video01Player.setVolume(0);

      // on ne peut pas sélectionner l'iframe directement 
      // donc il faut tricker en créant une div par dessus et lui appliquer le listener

      let hovervideo = document.getElementById('video');

      hovervideo.onmouseenter = function() {
        video01Player.play()
      };
      hovervideo.onmouseleave = function() {
        video01Player.pause()
      };

      var playButton = document.getElementById("play-button");
      var pauseButton = document.getElementById("pause-button");

      playButton.addEventListener("click", function() {
        video01Player.play()
      });

      pauseButton.addEventListener("click", function() {
        video01Player.pause()
      });
    }
  },
  render: function (createElement) {
    return createElement('h1', this.blogTitle)
  },
  created () {
    this.getContent(this.$route.params.uid)
  },
  mounted() {
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>