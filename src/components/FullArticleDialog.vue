<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Close") }}</span>
        </v-tooltip>
        <div class="title">{{ title }}</div>
        <v-spacer />
        <v-menu offset-y v-bind:close-on-content-click="false">
          <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
            <v-tooltip bottom>
              <template
                v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }"
              >
                <v-btn
                  icon
                  v-bind="{ ...attrsTooltip, ...attrsMenu }"
                  v-on="{ ...onTooltip, ...onMenu }"
                >
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("Link to share") }}</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="disable-overflow">{{ url }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
    url: { type: String },
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

<style scoped>
.title {
  padding-left: 8px; text-overflow: ellipsis;text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 65vw;
}

.disable-overflow {
  overflow: scroll;
  text-overflow: unset;
}
</style>