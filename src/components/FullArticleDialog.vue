<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
    transition="dialog-bottom-transition"
    scrollable
    fullscreen
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
        <v-menu v-bind:close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
            <v-tooltip bottom>
              <template
                v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }"
              >
                <v-btn
                  v-bind="{ ...attrsTooltip, ...attrsMenu }"
                  v-on="{ ...onTooltip, ...onMenu }"
                  icon
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
        v-html="content"
        style="text-align: justify; padding-top: 16px;"
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

.disable-overflow::-webkit-scrollbar {
  display: none;
}

.disable-overflow {
  overflow: scroll;
  text-overflow: unset;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>