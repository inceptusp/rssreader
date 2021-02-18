<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon
      v-if="
        $router.currentRoute.path.search('confirmEmail') != -1 ||
        $router.currentRoute.path.search('redefinePassword') != -1
      "
      class="hidden-lg-and-down"
    />
    <v-app-bar-nav-icon
      v-else
      @click.stop="drawerControl"
      class="hidden-md-and-up"
    />
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
        <v-radio-group v-model="locale" style="padding: 0 24px 0 24px">
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
    value: { type: Boolean },
    feedName: { type: String },
  },

  components: {
    alertDialog: AlertDialog,
  },

  mounted: function () {
    this.drawer = this.value;
    this.locale = navigator.languages[0].split("-")[0];
    this.aboutTitle = this.$t("About") + " " + this.$t("RSS Reader");
    this.aboutContent =
      "© " +
      new Date().getFullYear() +
      " inceptusp" +
      "<br /><br />" +
      '<a href="/#/policy">' +
      this.$t("Privacy policy") +
      '</a><br/><a href="/#/terms">' +
      this.$t("Terms of use") +
      "</a><br /><br />" +
      this.$t(
        '<div>App icon made by <a href="https://www.freepik.com" target="_blank" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" target="_blank" title="Flaticon">www.flaticon.com</a></div>'
      );
    if (window.localStorage.getItem("settings") != null) {
      this.settings = JSON.parse(window.localStorage.getItem("settings"));
      this.locale = this.settings.locale;
    }
  },

  data: () => ({
    drawer: null,
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
      this.drawer = !this.drawer;
      this.$emit("drawerControl", this.drawer);
    },
  },

  watch: {
    value: function () {
      this.drawer = this.value;
    },

    drawer: function () {
      this.$emit("input", this.drawer);
    },

    locale: function () {
      this.$i18n.locale = this.locale;
      this.settings.locale = this.locale;
      window.localStorage.setItem("settings", JSON.stringify(this.settings));
    },
  },
};
</script>