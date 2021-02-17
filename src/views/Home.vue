<template>
  <v-layout align-center justify-center style="height: 100%; width: 100%">
    <v-row>
      <v-col>
        <v-img
          src="../assets/images/app_icon.png"
          width="256"
          height="256"
          class="center"
        />
        <h3 class="center text-h4">{{ $t("Welcome") + " " + userName == null ? "" : userName }}</h3>
        <h5 class="center text-subtitle-1">
          <div v-if="userName == null" id="welcome-subtitle">
            {{ $t("Welcome to RSS Reader, click on the top left corner to login or sign up so we can start") }}
          </div>
          <div
            v-else-if="userName != null && feedListLenght == 0"
            id="welcome-subtitle"
          >
            {{ $t("Welcome to RSS Reader, click on the + button to add a new feed") }}
          </div>
          <div v-else id="welcome-subtitle">
            {{ $t("Welcome to RSS Reader, select a feed on the left to start") }}
          </div>
        </h5>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: "Home",

  mounted: function () {
    this.sendFeedNameToAppBar();
    if (window.localStorage.getItem("user") != null) {
      this.userName = window.localStorage.getItem("user");
      this.feedListLenght = Number.parseInt(
        window.localStorage.getItem("feeds")
      );
    }
  },

  data: () => ({
    userName: null,
    feedListLenght: 0,
  }),

  methods: {
    sendFeedNameToAppBar() {
      this.$emit("feedName", null);
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

#welcome-subtitle {
  width: 80%;
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>