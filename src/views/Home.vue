<template>
  <div class="home">
    <div style="padding: 8px" v-for="article in articles" :key="article.title">
      <article-card :article="article" />
    </div>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard.vue";
import "../router";
export default {
  name: "Home",

  components: {
    ArticleCard,
  },

  mounted: function () {
    this.loadXml();
  },

  data: () => ({
    articles: [],
  }),

  methods: {
    loadXml() {
      const selfVue = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          this.responseXML.getElementsByTagName("item").forEach((element) => {
            selfVue.articles.push({
              title: element.getElementsByTagName("title")[0].childNodes[0]
                .nodeValue,
              description: element.getElementsByTagName("description")[0]
                .childNodes[0].nodeValue,
              url: element.getElementsByTagName("link")[0].childNodes[0]
                .nodeValue,
              image: this.responseXML
                .getElementsByTagName("image")[0]
                .getElementsByTagName("url")[0].childNodes[0].nodeValue,
            });
          });
        }
      };
      xhttp.open("GET", selfVue.$route.params.feed);
      xhttp.send();
    },
  },
};
</script>
