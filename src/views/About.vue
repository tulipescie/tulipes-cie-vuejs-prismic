<template>
  <div> 
    <h1>
        {{ $prismic.richTextAsPlain(fields.about_title1) }}
    </h1>
    <h2>
      {{ $prismic.richTextAsPlain(fields.about_text1) }}
    </h2>
    <li v-for="(item, index) in fields.about_clients" :key="'client-' + index">
        <prismic-link :field="item.about_clients_link">
            <prismic-image :field="item.about_clients_logo"/>
        </prismic-link>
      </li>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      fields: {
        about_title1: null,
        about_text1: null, 
        about_clients: []
      }
    };
  },
  methods: {
    getContent () {
      this.$prismic.client.getSingle('about')
        .then((document) => {
          this.fields.about_title1 = document.data.about_title1;
          this.fields.about_text1 = document.data.about_text1;
          this.fields.about_clients = document.data.about_clients;
        })
    }
  },
  created () {
    this.getContent();
  }
}
</script>