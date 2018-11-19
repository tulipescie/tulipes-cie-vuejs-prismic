<template>
  <div> 
    <h1>
        {{ $prismic.richTextAsPlain(fields.homepage_h1) }}
    </h1>
    <h2>
      {{ $prismic.richTextAsPlain(fields.homepage_h2) }}
    </h2>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      fields: {
        homepage_h1: null,
        homepage_h2: null,
      }
    };
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('homepage')
        .then((document) => {
          this.fields.homepage_h1 = document.data.homepage_h1;
          this.fields.homepage_h2 = document.data.homepage_h2;
        })
    }
  },
  created () {
    this.getContent();
  }
}
</script>