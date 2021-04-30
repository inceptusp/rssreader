<template>
  <div>

    <!-- Shows loading when waits for server data -->
    <div v-if="loading && !netError">
      <v-layout align-center justify-center style="height: 100%; width: 100%; padding: 4px 24px;">
        <v-progress-circular color="#00bfa5" indeterminate />
      </v-layout>
    </div>

    <!-- Shows a internet conection error when websocket's onerror raises -->
    <div v-else-if="netError && !loading">
      <v-layout align-center justify-center style="height: 100%; width: 100%; padding: 4px 24px;">
        <v-row>
          <v-col>
          <v-icon size="92" class="center">mdi-cloud-off-outline</v-icon>
          <h4 id="net-error-text" class="center text-subtitle-1">
            {{ $t("It seems that you don't have internet connection or our server is offline, please check your connection or try again later") }}
          </h4>
          </v-col>
        </v-row>
      </v-layout>
    </div>

    <!-- Shows the articles list otherwise -->
    <div v-else>
      <div v-for="article in articles" v-bind:key="article.title" style="padding: 8px;">
        <article-card v-bind:article="article" />
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
    AlertDialog,
    ArticleCard,
  },

  mounted: function () {
    this.loadFeed();
  },

  data: () => ({
    name: null,
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
      this.name = this.$route.params.name;

      var obj = new Object();
      obj.variable = window.localStorage.getItem("l");
      obj.uuid = window.localStorage.getItem("sid");
      obj.feedAddress = this.$route.query.feed;
      var jsonString = JSON.stringify(obj);

      var message = "";
      var connection = new WebSocket(
        websocketHelper.wssUrl,
        websocketHelper.wssProtocol
      );
      connection.onopen = () => {
        this.loading = true;
        connection.send("304 " + jsonString + "\u0004");
      };
      connection.onerror = () => {
        this.loading = false;
        this.netError = true;
      };
      connection.onmessage = (msg) => {
        message += msg.data;
      }
      connection.onclose = () => {
        var response = JSON.parse(message);
        if (Object.prototype.hasOwnProperty.call(response, "error")) {
          errorMessages(response.error, this);
          this.loading = false;
        } else {
          this.loadXml(response.feedContent);
          this.loading = false;
        }
      }
    },

    loadXml(xmlString) {
      var parser, xmlDoc;

      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlString,"text/xml");
      
      xmlDoc.getElementsByTagName("item").forEach((element) => {
        this.articles.push({
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
#net-error-text {
  width: 80%;
  margin-left: auto !important;
  margin-right: auto !important;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
