<template>
  <v-app>
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <span>Your Account</span>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      floating
      mobile-breakpoint="960"
    >
      <template v-slot:prepend>
        <v-app-bar flat />
      </template>
      <v-list>
        <v-list-item link to="/rss091.xml">
          <v-list-item-title> Folha </v-list-item-title>
        </v-list-item>
        <v-list-item link to="/feed.xml">
          <v-list-item-title> Tecmundo </v-list-item-title>
        </v-list-item>
        <v-list-item link to="/meira.xml">
          <v-list-item-title> Silvio Meira </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-list nav>
        <router-view :key="$route.fullPath" />
      </v-list>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
};
</script>

<style>
html,
body {
  font-family: Roboto, sans-serif;
}
</style>
