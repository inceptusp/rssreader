<template>
  <v-dialog v-model="dialog" max-width="320px">
    <v-card>
      <v-card-title class="headline">{{ $t("Are you sure?") }}</v-card-title>

      <v-card-text>{{
        $t("Are you sure that you want to sign out?")
      }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" text v-on:click="dialog = false">{{
          $t("Close")
        }}</v-btn>
        <v-btn color="#00bfa5" text @click="signOut()">{{
          $t("Sign out")
        }}</v-btn>
      </v-card-actions>
    </v-card>

    <alert-dialog
      v-model="errorDialog"
      v-bind:title="errorTitle"
      v-bind:content="errorContent"
    />
  </v-dialog>
</template>

<script>
import AlertDialog from "../components/AlertDialog";
import websocketHelper from "../websocketHelper";

export default {
  name: "AlertDialog",

  components: {
    AlertDialog,
  },

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.dialog = this.value;
  },

  data: () => ({
    dialog: false,
    errorDialog: false,
    errorTitle: "",
    errorContent: "",
  }),

  methods: {
    signOut() {
      var selfVue = this;

      var obj = new Object();
      obj.variable = window.localStorage.getItem("l");
      obj.uuid = window.localStorage.getItem("sid");
      var jsonString = JSON.stringify(obj);

      var connection = websocketHelper.rssReaderWs();
        connection.onerror = (error) => websocketHelper.onError(error, selfVue);
      connection.onopen = function () {
        var byte = new Uint8Array(1);
        byte[0] = 0x04;
        connection.send("105 ");
        connection.send(jsonString);
        connection.send(byte);
      };
      connection.onclose = function () {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("l");
        window.localStorage.removeItem("pic");
        window.localStorage.removeItem("login");
        window.localStorage.removeItem("sid");
        window.localStorage.removeItem("feeds");
        window.localStorage.removeItem("settings");
        if (window.gapi.auth2.getAuthInstance().isSignedIn) {
          window.gapi.auth2.getAuthInstance().signOut();
        }
        this.dialog = false;
        document.location.replace(window.location.origin);
      };
    },

    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },
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