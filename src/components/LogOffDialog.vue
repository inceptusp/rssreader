<template>
  <v-dialog v-model="dialog" max-width="320px">
    <v-card>
      <v-card-title class="headline">{{ $t("Are you sure?") }}</v-card-title>

      <v-card-text>{{ $t("Are you sure that you want to sign out?") }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="#00bfa5"
          text
          v-on:click="dialog = false;"
        >{{ $t("Close") }}</v-btn>
        <v-btn
          color="#00bfa5"
          text
          @click="signOut()"
        >{{ $t("Sign out") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AlertDialog",

  props: {
    value: { type: Boolean }
  },

  mounted: function () {
    this.dialog = this.value;
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    signOut() {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("pic");
        window.localStorage.removeItem("login");
        window.localStorage.removeItem("uuid");
        window.gapi.auth2.getAuthInstance().signOut();
        this.dialog = false;
        document.location.replace(window.location.origin);
    }
  },

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