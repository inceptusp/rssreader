<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card> </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AccountSettingsDialog",

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.dialog = this.value;
  },

  data: () => ({
    dialog: false,
  }),

  watch: {
    value: function () {
      this.dialog = this.value;
    },

    dialog: function () {
      this.$emit("input", this.dialog);
    },
  },
};
</script>