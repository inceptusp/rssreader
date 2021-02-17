<template>
  <v-navigation-drawer v-model="drawer" app fixed mobile-breakpoint="960">
    <template v-slot:prepend>
      <v-app-bar flat>
        <v-list-item
          @click="showAccountDialog()"
          two-line
          style="max-height: 64px"
        >
          <v-list-item-avatar color="grey">
            <v-icon color="white" v-if="userPhoto == ''">mdi-account</v-icon>
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

      <authenticationDialog v-model="accountDialog" />
      <logOffDialog v-model="signOutDialog" />
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
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("New feed") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Account") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Settings") }}</span>
        </v-tooltip>
      </v-layout>
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

export default {
  name: "Drawer",

  components: {
    authenticationDialog: AuthenticationDialog,
    logOffDialog: LogOffDialog,
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
    accountDialog: false,
    signOutDialog: false,
    userName: "",
    userPhoto: "",
    searchBar: false,
    search: "",
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
    showAccountDialog() {
      if (!this.logged) {
        this.drawer = null;
        this.accountDialog = !this.accountDialog;
      } else {
        this.drawer = null;
        this.signOutDialog = !this.signOutDialog;
      }
    },

    openSearch() {
      this.searchBar = !this.searchBar;
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