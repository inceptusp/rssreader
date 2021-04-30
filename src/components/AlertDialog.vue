<template>
  <v-dialog v-model="dialog" max-width="320px">
    <v-card>
      
      <v-card-title class="headline" style="word-break: break-word;">
        <div v-html="title"/>
      </v-card-title>

      <v-card-text>
        <div v-html="content"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-on:click="dialog = false;"
          color="#00bfa5"
          text
        >
          {{ $t("Close") }}
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AlertDialog",

  props: {
    title: { type: String },
    content: { type: String },
    value: { type: Boolean }
  },

  mounted: function () {
    this.dialog = this.value;
  },

  data: () => ({
    dialog: false
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