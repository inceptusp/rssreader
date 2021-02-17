<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon @click.stop="drawerControl" class="hidden-md-and-up" />
    <v-toolbar-title>
      {{ $t("RSS Reader") }}
      <div v-if="feedName != null" style="display: inline">-</div>
      {{ feedName }}
    </v-toolbar-title>
    <v-spacer />
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click.stop="showAboutDialog">
          <v-icon>mdi-information</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("About") }}</span>
    </v-tooltip>

    <alertDialog
      v-bind:title="aboutTitle"
      v-bind:content="aboutContent"
      v-model="showAbout"
    />
  </v-app-bar>
</template>

<script>
import AlertDialog from "../components/AlertDialog.vue";

export default {
  name: "AlertDialog",

  props: {
    feedName: { type: String },
  },

  components: {
    alertDialog: AlertDialog,
  },

  mounted: function () {
    this.aboutTitle = this.$t("About") + " " + this.$t("RSS Reader");
    this.aboutContent =
      "© " +
      new Date().getFullYear() +
      " inceptusp" +
      "<br/><br/>" +
      this.$t(
        '<div>App icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>'
      );
  },

  data: () => ({
    showAbout: false,
    aboutTitle: null,
    aboutContent: null,
  }),

  methods: {
    showAboutDialog() {
      this.showAbout = !this.showAbout;
    },

    drawerControl() {
      this.$emit("drawerControl");
    },
  },
};
</script>