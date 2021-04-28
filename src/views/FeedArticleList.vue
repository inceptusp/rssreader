<template>
  <div class="FeedArticleList">
    <div v-if="loading && !netError">
      <v-layout align-center justify-center style="height: 100%; width: 100%; padding: 4px 24px">
        <v-progress-circular color="#00bfa5" indeterminate />
      </v-layout>
    </div>

    <div v-else-if="netError && !loading">
      <v-layout align-center justify-center style="height: 100%; width: 100%; padding: 4px 24px">
        <v-row>
          <v-col>
          <v-icon size="92" class="center">mdi-cloud-off-outline</v-icon>
          <h4 class="center text-subtitle-1">
            {{ $t("It seems that you don't have internet connection or our server is offline, please check your connection or try again later") }}
          </h4>
          </v-col>
        </v-row>
      </v-layout>
    </div>

    <div v-else>
      <div style="padding: 8px" v-for="article in articles" :key="article.title">
        <article-card :article="article" />
      </div>
    </div>

    <alert-dialog
      v-model="errorDialog"
      v-bind:title="errorTitle"
      v-bind:content="errorContent"
    />
  </div>
</template>

<script>
import AlertDialog from "../components/AlertDialog";
import ArticleCard from "../components/ArticleCard.vue";
import websocketHelper from "../websocketHelper";
import { errorMessages } from "../errorMessages";
import "../router";

export default {
  name: "FeedArticleList",

  components: {
    ArticleCard,
    AlertDialog,
  },

  mounted: function () {
    this.loadFeed();
  },

  data: () => ({
    name: "Feed",
    netError: false,
    loading: true,
    articles: [],
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    loadFeed() {
      const selfVue = this;
      
      this.name = this.$route.params.name;

      var obj = new Object();
      obj.variable = window.localStorage.getItem("l");
      obj.uuid = window.localStorage.getItem("sid");
      obj.feedAddress = this.$route.query.feed;
      
      var jsonString = JSON.stringify(obj);

      var message = "";
      var connection = websocketHelper.rssReaderWs();
      connection.onerror = function (error) {
        selfVue.loading = false;
        selfVue.netError = true;
        error;
      }
      connection.onopen = function () {
        selfVue.loading = true;
        var byte = new Uint8Array(1);
        byte[0] = 0x04;
        connection.send("304 ");
        connection.send(jsonString);
        connection.send(byte);
      };
      connection.onmessage = function(msg) {
        message += msg.data;
      }
      connection.onclose = function () {
        var response = JSON.parse(message);
        if (Object.prototype.hasOwnProperty.call(response, "error")) {
          errorMessages(response.error, selfVue);
        } else {
          selfVue.loadXml(response.feedContent);
          selfVue.loading = false;
        }
      }
    },

    loadXml(xmlString) {
      const selfVue = this;
      
      var parser, xmlDoc;

      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlString,"text/xml");
      console.log(xmlDoc);
      
      xmlDoc.getElementsByTagName("item").forEach((element) => {
        selfVue.articles.push({
          title: element.getElementsByTagName("title")[0].childNodes[0]
            .nodeValue,
          description: element.getElementsByTagName("description")[0]
            .childNodes[0].nodeValue,
          content:
            element.getElementsByTagName("content:encoded").length == 0
              ? null
              : element.getElementsByTagName("content:encoded")[0]
                  .childNodes[0].nodeValue,
          url: element.getElementsByTagName("link")[0].childNodes[0]
            .nodeValue,
          image: xmlDoc
            .getElementsByTagName("image")[0]
            .getElementsByTagName("url")[0].childNodes[0].nodeValue,
        });
      });
    },
  },

  watch: {
    name: function() {
      this.$emit("feedName", this.name);
    },

    errorDialog: function() {
      if(!this.errorDialog) {
        this.$router.push('/');
      }
    }
  },
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
