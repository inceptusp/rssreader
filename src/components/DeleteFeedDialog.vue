<template>
  <v-dialog v-model="dialog" max-width="320">
    <v-card>

      <v-card-title>{{ $t("Are you sure?") }}</v-card-title>

      <v-card-text>{{ $t("Are you sure that you want to delete this feed?") }}</v-card-text>

      <v-card-actions v-if="!loading">
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" @click="dialog = false" text>
          {{ $t("Cancel") }}
        </v-btn>
        <v-btn color="#00bfa5" @click="removeFeed()" text>
          {{ $t("Confirm") }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-progress-circular color="#00bfa5" indeterminate />
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
import Dexie from 'dexie';

import AlertDialog from "../components/AlertDialog";
import websocketHelper from "../websocketHelper";
import { errorMessages } from "../errorMessages";

export default {
  name: "DeleteFeedDialog",

  components: {
    AlertDialog,
  },

  props: {
    value: { type: Boolean },
    link: { type: String },
  },

  mounted: function () {
    this.dialog = this.value;
  },

  data: () => ({
    dialog: false,
    loading: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    removeFeed: async function() {
      var db = new Dexie('rssReader');
      db.version(1).stores({
        feeds: "feedAddress,feedName,*feedCategories",
      });
      await db.open();
      
      var obj = new Object();
      obj.feedAddress = this.link;
      obj.variable = window.localStorage.getItem("l");
      obj.uuid = window.localStorage.getItem("sid");
      var jsonString = JSON.stringify(obj);

      var message = "";
      var connection = new WebSocket(
        websocketHelper.wssUrl,
        websocketHelper.wssProtocol
      );
      connection.onopen = () => {
        this.loading = true;
        connection.send("305 " + jsonString + "\u0004");
      };
      connection.onerror = (error) => {
        websocketHelper.onError(error, this);
        this.loading = false;
      }
      connection.onmessage = (msg) => {
        message += msg.data;
      };
      connection.onclose = () => {
        var response = JSON.parse(message);
        if (Object.prototype.hasOwnProperty.call(response, "error")) {
          errorMessages(response.error, this);
          this.loading = false;
        } else {
          db.feeds.delete(this.link);
          this.dialog = false;
          this.loading = false;
          this.$emit("feedListUpdate");
        }
      }
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