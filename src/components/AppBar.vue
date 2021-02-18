<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon @click.stop="drawerControl" class="hidden-md-and-up" />
    <v-toolbar-title>
      {{ $t("RSS Reader") }}
      <div v-if="feedName != null" style="display: inline">-</div>
      {{ feedName }}
    </v-toolbar-title>
    <v-spacer />
    <v-menu offset-y v-bind:close-on-content-click="false">
      <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }">
            <v-btn
              icon
              v-bind="{ ...attrsTooltip, ...attrsMenu }"
              v-on="{ ...onTooltip, ...onMenu }"
            >
              <v-icon>mdi-web</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Language") }}</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-radio-group v-model="locale" style="padding: 0 24px 0 24px;">
          <v-radio label="English" value="en" />
          <v-radio label="Português" value="pt" />
        </v-radio-group>
      </v-list>
    </v-menu>
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
    this.locale = navigator.languages[0].split("-")[0];
    this.aboutTitle = this.$t("About") + " " + this.$t("RSS Reader");
    this.aboutContent =
      "© " +
      new Date().getFullYear() +
      " inceptusp" +
      "<br/><br/>" +
      this.$t(
        '<div>App icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>'
      );
    if (window.localStorage.getItem("settings") != null) {
      this.settings = JSON.parse(window.localStorage.getItem("settings"));
      this.locale = this.settings.locale;
    }
  },

  data: () => ({
    showAbout: false,
    aboutTitle: null,
    aboutContent: null,
    settings: {},
    locale: null,
  }),

  methods: {
    showAboutDialog() {
      this.showAbout = !this.showAbout;
    },

    drawerControl() {
      this.$emit("drawerControl");
    },
  },

  watch: {
    locale: function () {
      this.$i18n.locale = this.locale;
      this.settings.locale = this.locale;
      window.localStorage.setItem("settings", JSON.stringify(this.settings));
    }
  },
};
</script>