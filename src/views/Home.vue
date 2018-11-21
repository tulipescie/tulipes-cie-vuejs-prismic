<template>
  <div> 
    <h1>
      {{ $prismic.richTextAsPlain(fields.homepage_h1) }}
    </h1>
    <h2>
      {{ $prismic.richTextAsPlain(fields.homepage_h2) }}
    </h2>
    <div>
      C'est vraiment un super test, je vais ajouter un lien
    </div>
    <a href="https://google.com">
      <prismic-image :field="fields.homepage_img"/>
    </a>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      fields: {
        homepage_h1: null,
        homepage_h2: null,
        homepage_img: null,
      }
    };
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('homepage')
        .then((document) => {
          this.fields.homepage_h1 = document.data.homepage_h1;
          this.fields.homepage_h2 = document.data.homepage_h2;
          this.fields.homepage_img = document.data.homepage_img;
        })
    }
  },
  created () {
    this.getContent();
  }
}
</script>