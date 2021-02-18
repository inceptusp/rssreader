<template>
  <div id="success">
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
      {{
        $t(
          "Your password has been successfully changed, you can now login to our services using your new password."
        )
      }}
    </p>
    <v-btn @click="closeWindow()">
      {{ $t("Back to home") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SuccessRedefinePassword",

  mounted: function () {
    const selfVue = this;
    window.setTimeout(function() {
      selfVue.$emit("drawerControl", false);
    }, 500);
  },

  methods: {
    closeWindow() {
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