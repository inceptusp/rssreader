<template>
  <v-navigation-drawer v-model="drawer" app fixed mobile-breakpoint="960">
    <template v-slot:prepend>
      <v-app-bar flat>
        <v-list-item
          @click="openAccountDialog()"
          two-line
          style="max-height: 64px"
        >
          <v-list-item-avatar color="grey">
            <v-icon color="white" v-if="userPhoto == null || userPhoto == ''">mdi-account</v-icon>
            <v-img v-else>
              <img v-bind:src="userPhoto" referrerpolicy="no-referrer" />
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="fade">{{
              logged ? userName : $t("Welcome")
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              logged ? $t("Sign out") : $t("Login or Sign Up")
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-app-bar>

      <authenticationDialog v-model="showAuthenticationDialog" />
      <logOffDialog v-model="showSignOutDialog" />
    </template>

    <v-list-item v-if="logged">
      <v-layout align-center justify-center>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="openSearch()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Search") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="openNewFeedDialog()"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("New feed") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="openAccountSettingsDialog()"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Account") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="openSettingsDialog()"
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Settings") }}</span>
        </v-tooltip>
      </v-layout>

      <newFeedDialog v-model="showNewFeedDialog" />
      <accountSettingsDialog v-model="showAccountSettingsDialog" />
      <settingsDialog v-model="showSettingsDialog" />
    </v-list-item>

    <v-divider v-if="logged" />

    <v-text-field
      v-if="searchBar"
      v-model="search"
      v-bind:label="$t('Search')"
      outlined
      hide-details="auto"
      style="padding: 8px"
    />

    <v-divider v-if="searchBar" />

    <v-list shaped>
      <v-list-item link to="/">
        <v-list-item-title>{{ $t("Home") }}</v-list-item-title>
      </v-list-item>
      <template v-if="logged">
        <v-list-item link to="/feed/rss091.xml">
          <v-list-item-title> Folha </v-list-item-title>
        </v-list-item>
        <v-list-item link to="/feed/feed.xml">
          <v-list-item-title> Tecmundo </v-list-item-title>
        </v-list-item>
        <v-list-item link to="/feed/meira.xml">
          <v-list-item-title> Silvio Meira </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AuthenticationDialog from "../components/AuthenticationDialog.vue";
import LogOffDialog from "../components/LogOffDialog.vue";
import NewFeedDialog from "../components/NewFeedDialog.vue";
import AccountSettingsDialog from "../components/AccountSettingsDialog.vue";
import SettingsDialog from "../components/SettingsDialog.vue";

export default {
  name: "Drawer",

  components: {
    authenticationDialog: AuthenticationDialog,
    logOffDialog: LogOffDialog,
    newFeedDialog: NewFeedDialog,
    accountSettingsDialog: AccountSettingsDialog,
    settingsDialog: SettingsDialog,
  },

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.drawer = this.value;
    if (window.localStorage.getItem("uuid") != null) {
      this.logged = true;
      this.userName = window.localStorage.getItem("user");
      this.userPhoto = window.localStorage.getItem("pic");
    }
  },

  data: () => ({
    drawer: null,
    showAuthenticationDialog: false,
    showNewFeedDialog: false,
    showAccountSettingsDialog: false,
    showSettingsDialog: false,
    showSignOutDialog: false,
    userName: null,
    userPhoto: null,
    searchBar: false,
    search: null,
    logged: false,
  }),

  watch: {
    value: function () {
      this.drawer = this.value;
    },

    drawer: function () {
      this.$emit("input", this.drawer);
    },
  },

  methods: {
    openAccountDialog() {
      if (!this.logged) {
        this.drawer = null;
        this.showAuthenticationDialog = !this.showAuthenticationDialog;
      } else {
        this.drawer = null;
        this.showSignOutDialog = !this.showSignOutDialog;
      }
    },

    openSearch() {
      this.searchBar = !this.searchBar;
    },

    openNewFeedDialog() {
      this.drawer = null;
      this.showNewFeedDialog = !this.showNewFeedDialog;
    },

    openAccountSettingsDialog() {
      this.drawer = null;
      this.showAccountSettingsDialog = !this.showAccountSettingsDialog;
    },

    openSettingsDialog() {
      this.drawer = null;
      this.showSettingsDialog = !this.showSettingsDialog;
    },
  },
};
</script>

<style>
.fade {
  width: 128px;
}

@media only screen and (min-width: 960px) {
  .v-toolbar__content {
    padding: 0px;
  }
}
</style>