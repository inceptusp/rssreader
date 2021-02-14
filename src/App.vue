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
