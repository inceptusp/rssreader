<template>
  <v-navigation-drawer v-model="drawer" app fixed mobile-breakpoint="960">
    <template v-slot:prepend>
      <v-app-bar flat>
        <v-list-item @click="showAccountDialog()">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-row style="padding: 8px">
            <v-list-item-title>Welcome</v-list-item-title>
            <v-list-item-subtitle>Login or Sing Up</v-list-item-subtitle>
          </v-row>
        </v-list-item>
      </v-app-bar>

      <authenticationDialog v-model="accountDialog"/>
    </template>

    <v-list>
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
import AuthenticationDialog from '../components/AuthenticationDialog.vue'

export default {
  name: "Drawer",

  components: {
    authenticationDialog: AuthenticationDialog
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
  },
};
</script>