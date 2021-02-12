<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-list>
        <v-img src="assets/images/appIcon.png" width="256" height="256" />
        <p>TESTE</p>
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