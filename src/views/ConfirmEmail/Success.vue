<template>
  <div>

    <v-img
      src="../../assets/images/success.png"
      style="
        padding: 0px 0px 16px 0px;
        width: 30%;
        margin-left: auto;
        margin-right: auto;
      "
    />

    <p
      style="
        padding: 16px 16px 16px 16px;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
      "
    >
      {{ $t("Your email address has been successfully confirmed, thanks.") }}
    </p>

    <v-btn @click="backToHome()">
      {{ $t("Back to home") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SuccessConfirmEmail",

  mounted: function () {
    window.setTimeout(() => {
      this.$emit("drawerControl", false);
    }, 500);
  },

  methods: {
    backToHome() {
      window.location.replace(window.origin);
    },
  },
};
</script>

<style scoped>
#success {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 16px 16px 16px 16px;
}
</style>