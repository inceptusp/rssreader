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
            <v-icon color="white">mdi-account</v-icon>
            <!-- <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img> -->
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Welcome</v-list-item-title>
            <v-list-item-subtitle>Login or Sing Up</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-app-bar>

      <authenticationDialog v-model="accountDialog" />
    </template>

    <v-list-item>
      <v-layout align-center justify-center>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="openSearch()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Search</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span>New feed</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>Account</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>Settings</span>
        </v-tooltip>
      </v-layout>
    </v-list-item>

    <v-divider />

    <v-text-field
      v-if="searchBar"
      v-model="search"
      label="Search"
      outlined
      hide-details="auto"
      style="padding: 8px"
    />

    <v-divider v-if="searchBar" />

    <v-list shaped>
      <v-list-item link to="/">
        <v-list-item-title> Home </v-list-item-title>
      </v-list-item>
      <v-list-item link to="/feed/rss091.xml">
        <v-list-item-title> Folha </v-list-item-title>
      </v-list-item>
      <v-list-item link to="/feed/feed.xml">
        <v-list-item-title> Tecmundo </v-list-item-title>
      </v-list-item>
      <v-list-item link to="/feed/meira.xml">
        <v-list-item-title> Silvio Meira </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AuthenticationDialog from "../components/AuthenticationDialog.vue";

export default {
  name: "Drawer",

  components: {
    authenticationDialog: AuthenticationDialog,
  },

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.drawer = this.value;
  },

  data: () => ({
    drawer: null,
    accountDialog: false,
    searchBar: false,
    search: "",
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
      this.drawer = null;
      this.accountDialog = !this.accountDialog;
    },

    openSearch() {
      this.searchBar = !this.searchBar;
    },
  },
};
</script>

<style>
@media only screen and (min-width: 960px) {
  .v-toolbar__content {
    padding: 0px;
  }
}
</style>