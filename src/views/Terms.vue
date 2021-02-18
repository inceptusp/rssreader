<template>
  <div></div>
</template>

<script>
export default {
  name: "Terms",

  mounted: function () {
    this.sendFeedNameToAppBar();
  },

  methods: {
    sendFeedNameToAppBar() {
      this.$emit("feedName", this.$t("Terms of use"));
    },
  },
};
</script>