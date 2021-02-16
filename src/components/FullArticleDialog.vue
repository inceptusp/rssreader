<template>
  <v-dialog v-model="dialog" max-width="800" scrollable fullscreen>
    <v-card>
      <v-card-title>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div style="padding-left: 8px;">{{ title }}</div>
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text
        style="text-align: justify; padding-top: 16px"
        v-html="content"
      />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FullArticleDialog",

  props: {
    title: { type: String },
    content: { type: String },
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