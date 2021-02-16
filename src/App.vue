<template>
  <v-app>
    <appBar @drawerControl="openCloseDrawer" v-bind:feedName="feedName" />

    <drawer v-model="drawer" />

    <v-main>
      <router-view :key="$route.fullPath" @feedName="sendFeedNameToAppBar" />
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
    }, 500);
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
  },

  data: () => ({
    drawer: null,
    feedName: "",
  }),

  methods: {
    openCloseDrawer() {
      this.drawer = !this.drawer;
    },

    sendFeedNameToAppBar(name) {
      this.feedName = name;
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
