<template>
  <v-dialog v-model="dialog" max-width="320">
    <v-card>
      <v-card-title>{{ $t("Are you sure?") }}</v-card-title>

      <v-card-text>{{ $t("Are you sure that you want to delete this feed?") }}</v-card-text>

      <v-card-actions v-if="!sending">
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" text v-on:click="dialog = false">{{
          $t("Cancel")
        }}</v-btn
        ><v-btn color="#00bfa5" text v-on:click="removeFeed()">{{
          $t("Confirm")
        }}</v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-progress-circular indeterminate color="#00bfa5" />
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
    sending: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    removeFeed: async function() {
      const selfVue = this;

      var db = new Dexie('rssReader');
      db.version(1).stores({
        feeds: "feedAddress,feedName,*feedCategories",
      });
      await db.open();
      
      var obj = new Object();
      obj.feedAddress = selfVue.link;
      obj.variable = window.localStorage.getItem("l");
      obj.uuid = window.localStorage.getItem("sid");
    
      var jsonString = JSON.stringify(obj);

      var connection = websocketHelper.rssReaderWs();
      connection.onerror = function (error) {
        websocketHelper.onError(error, selfVue);
        selfVue.sending = false;
      }
      connection.onopen = function () {
        selfVue.sending = true;
        var byte = new Uint8Array(1);
        byte[0] = 0x04;
        connection.send("305 ");
        connection.send(jsonString);
        connection.send(byte);
      };
      connection.onmessage = function (msg) {
        var response = JSON.parse(msg.data);
        if (Object.prototype.hasOwnProperty.call(response, "error")) {
          errorMessages(response.error, selfVue);
        } else {
          db.feeds.delete(selfVue.link);
          selfVue.dialog = false;
          selfVue.sending = false;
          selfVue.$emit("feedListUpdate");
        }
      }
    },
  },

  watch: {
    value: function () {
      this.dialog = this.value;
    },

    dialog: function () {
      if (this.$refs.formRef != undefined) {
        this.$refs.formRef.reset();
      }
      this.$emit("input", this.dialog);
    },
  },
};
</script>