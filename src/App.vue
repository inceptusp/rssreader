<template>
  <v-app>
    
    <app-bar v-model="drawer" v-bind:feedName="feedName" />

    <drawer v-model="drawer" />

    <v-main>

      <!-- Banner to remind the user that he/she needs to verify his/her email -->
      <v-banner 
        v-if="!verified"
        v-bind:single-line="$vuetify.breakpoint.width > 960"
        v-bind:two-line="$vuetify.breakpoint.width < 960"
        style="z-index: 5; background: cornsilk;" 
        app 
        sticky
      >
        {{ $t("Your email is not verified.") }}
        <template v-slot:actions>
          <v-btn
            v-if="!loading"
            color="#00bfa5"
            @click="resendVerificationEmail()"
            text
          >
            {{ $t("Resend email") }}
          </v-btn>
          <v-progress-circular v-else color="#00bfa5" indeterminate />
        </template>
      </v-banner>

      <router-view
        v-bind:key="$route.fullPath"
        @feedName="sendFeedNameToAppBar"
        @drawerControl="openCloseDrawer"
      />
    </v-main>

  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import Drawer from "./components/Drawer.vue";
import websocketHelper from "./websocketHelper";

export default {
  components: {
    AppBar,
    Drawer,
  },

  mounted: function () {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id:
          "250982835780-6j2u60idrag2lpumgv48nal9vhi8ui8r.apps.googleusercontent.com",
      });
    });
    window.setTimeout(function () {
      if (
        window.localStorage.getItem("sid") === null &&
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
      ) {
        window.gapi.auth2.getAuthInstance().signOut();
      }
    }, 1000);
    this.loadSettings();
  },

  data: () => ({
    drawer: null,
    feedName: null,
    loading: false,
    verified: true,
  }),

  methods: {
    openCloseDrawer(drawer) {
      this.drawer = drawer;
    },

    sendFeedNameToAppBar(name) {
      this.feedName = name;
    },

    loadSettings() {
      if (window.localStorage.getItem("sid") !== null) {
        this.verified = window.localStorage.getItem("verified");
      }
      if (window.localStorage.getItem("settings") !== null) {
        var settings = JSON.parse(window.localStorage.getItem("settings"));
        this.$vuetify.theme.dark = settings.darkMode;
        if(!Object.prototype.hasOwnProperty.call(settings, "feedsOrder")) {
          settings.feedsOrder = "alpha";
          window.localStorage.setItem("settings", JSON.stringify(settings));
        }
      }
    },

    resendVerificationEmail() {
      var obj = new Object();
      obj.variable = window.localStorage.getItem("l");
      obj.uuid = window.localStorage.getItem("sid");
      var jsonString = JSON.stringify(obj);

      var connection = new WebSocket(
        websocketHelper.wssUrl,
        websocketHelper.wssProtocol
      );
      connection.onopen = () => {
        this.loading = true;
        connection.send("102 " + jsonString + "\u0004");
      };
      connection.onerror = (error) => {
        websocketHelper.onError(error, this);
        this.loading = false;
      };
      connection.onclose = () => {
        this.verified = true;
      }
    },
  },
};
</script>

<style>
html,
body {
  font-family: Roboto, sans-serif;
}
</style>
