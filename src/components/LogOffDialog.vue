<template>
  <v-dialog v-model="dialog" max-width="320px">
    <v-card>

      <v-card-title class="headline">{{ $t("Are you sure?") }}</v-card-title>

      <v-card-text>
        {{ $t("Are you sure that you want to sign out?") }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" @click="dialog = false" text>
          {{ $t("Close") }}
        </v-btn>
        <v-btn color="#00bfa5" @click="signOut()" text>
          {{ $t("Sign out") }}
        </v-btn>
      </v-card-actions>

      <alert-dialog
        v-model="errorDialog"
        v-bind:title="errorTitle"
        v-bind:content="errorContent"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import Dexie from 'dexie';

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
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    signOut() {
      var obj = new Object();
      obj.variable = window.localStorage.getItem("l");
      obj.uuid = window.localStorage.getItem("sid");
      var jsonString = JSON.stringify(obj);

      var connection = new WebSocket(
        websocketHelper.wssUrl,
        websocketHelper.wssProtocol
      );
      connection.onopen = () => {
        this.loading = true;
        connection.send("106 " + jsonString + "\u0004");
      };
      connection.onerror = (error) => {
        websocketHelper.onError(error, this);
        this.loading = false;
      };
      connection.onclose = () => {
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
        Dexie.delete('rssReader');
        this.dialog = false;
        document.location.replace(window.location.origin);
      };
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