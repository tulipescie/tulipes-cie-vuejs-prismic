<template>
  <div> 
    <h1>
      INSIDE THE PROJECT
    </h1>

      <br>

      {{ $prismic.richTextAsPlain(fields.projet_title) }}

      <div v-if="fields.projet_subtitle"> 
        {{ $prismic.richTextAsPlain(fields.projet_subtitle) }}
      </div>

      {{ $prismic.richTextAsPlain(fields.projet_link_vimeo) }}
      <br><br>

      <div id="video" style="position: relative">
        <div class="hover" style="position: absolute; width: 100%; height: 100%; z-index: 999"></div>
      </div>

      <button class="play" id="play-button">play</button>
      <button class="pause" id="pause-button">pause</button>
      <br>

      <div v-if="fields.projet_description">
            <prismic-rich-text :field="fields.projet_description"/> 
      </div>

      <br>

      <div v-if="fields.projet_description">
          <prismic-image :field="fields.projet_img_main"/>
      </div>
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
        projet_link_vimeo: null
      }
    };
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getByUID('projet', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.projet_title = document.data.projet_title
            this.fields.projet_subtitle = document.data.projet_subtitle
            this.fields.projet_description = document.data.projet_description
            this.fields.projet_img_main = document.data.projet_img_main
            this.fields.projet_link_vimeo = document.data.projet_link_vimeo
            this.initVimeo(this.fields.projet_link_vimeo)

          } else {
            this.$router.push({ name: 'not-found' })
          }
        })
    },
    initVimeo (objvimeo) {
      let linkvimeo = objvimeo[0].text
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

      // video01Player.on('play', function() {
      //   console.log('Played the first video');
      // });
    }
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