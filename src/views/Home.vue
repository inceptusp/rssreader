<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-list>
        <v-img src="../assets/images/app_icon.png" width="256" height="256" class="center" />
        <h3 class="center text-h4">Welcome</h3>
        <h5 class="center text-subtitle-1">Welcome to our RSS Reader, click on the top left corner to login or sing up so we can start</h5>
      </v-list>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  mounted: function () {
    this.sendFeedNameToAppBar();
  },

  methods: {
    sendFeedNameToAppBar() {
      this.$emit("feedName", "");
    },
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