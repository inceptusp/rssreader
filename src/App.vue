<template>
  <v-app>
    <appBar v-model="drawer" v-bind:feedName="feedName" />

    <drawer v-model="drawer" />

    <v-main>
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

export default {
  components: {
    appBar: AppBar,
    drawer: Drawer,
  },

  mounted: function () {
    window.gapi.load("auth2", function () {
      window.gapi.auth2.init({
        client_id:
          "250982835780-6j2u60idrag2lpumgv48nal9vhi8ui8r.apps.googleusercontent.com",
      });
    });
    window.setTimeout(function () {
      if (
        window.localStorage.getItem("uuid") == null &&
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
      ) {
        window.gapi.auth2.getAuthInstance().signOut();
      }
    }, 1000);
    window.addEventListener("online", function () {
      if (
        window.localStorage.getItem("uuid") == null &&
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
      ) {
        window.setTimeout(function () {
          window.gapi.auth2.getAuthInstance().signOut();
        }, 2000);
      }
    });
    this.loadSettings();
  },

  data: () => ({
    drawer: null,
    feedName: null,
  }),

  methods: {
    openCloseDrawer(drawer) {
      this.drawer = drawer;
    },

    sendFeedNameToAppBar(name) {
      this.feedName = name;
    },

    loadSettings() {
      if (window.localStorage.getItem("settings") != null) {
        var settings = JSON.parse(window.localStorage.getItem("settings"));
        this.$vuetify.theme.dark = settings.darkMode;
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
