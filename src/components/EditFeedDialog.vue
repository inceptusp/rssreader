<template>
  <v-dialog v-model="dialog" v-bind:key="feedAddress" max-width="600">
    <v-card>

      <v-card-title>{{ $t("Edit a feed") }}</v-card-title>

      <!-- Edit feed form -->
      <v-form ref="formRef">

        <!-- Feed name input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Name") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="feedName"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Name') : null"
            v-bind:rules="[required]"
            class="input-width"
            hide-details="auto"
            outlined
          />
        </v-layout>

        <!-- Feed link input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Feed link") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="feedAddress"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Feed link') : null"
            v-bind:rules="[required]"
            class="input-width"
            hide-details="auto"
            outlined
            disabled
          />
        </v-layout>

        <!-- Feed categories input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Categories") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-combobox
            v-model="feedCategories"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Categories') : null"
            class="input-width"
            append-icon=""
            hide-details="auto"
            outlined
            multiple
            small-chips
            deletable-chips
          />
        </v-layout>

        <!-- Instruction on how to use the categories input field -->
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div style="text-align: center;">{{ $t('Press ENTER to add a category') }}</div>
        </v-layout>
      </v-form>

      <v-card-actions v-if="!loading">
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" @click="dialog = false" text>
          {{ $t("Cancel") }}
        </v-btn>
        <v-btn color="#00bfa5" @click="editFeed()" text>
          {{ $t("Save") }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-spacer></v-spacer>
        <v-progress-circular color="#00bfa5" indeterminate />
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
import { errorMessages } from "../errorMessages";

export default {
  name: "EditFeedDialog",

  components: {
    AlertDialog,
  },

  props: {
    value: { type: Boolean },
    name: { type: String, required:true },
    link: { type: String, required:true },
    categories: {type: Array, required:true },
  },

  mounted: function () {
    this.dialog = this.value;
    if(this.dialog) {  
      this.feedName = this.name;
      this.feedAddress = this.link;
      this.feedCategories = this.categories;
    }
  },

  computed: {
    required() {
      return (value) => !!value || this.$t("This field is mandatory");
    },
  },

  data: () => ({
    dialog: false,
    feedName: null,
    feedAddress: null,
    feedCategories: null,
    loading: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    editFeed: async function() {
      if (this.$refs.formRef.validate()) {
        var db = new Dexie('rssReader');
        db.version(1).stores({
          feeds: "feedAddress,feedName,*feedCategories",
        });
        await db.open();

        var obj = new Object();
        obj.feedName = this.feedName;
        obj.feedAddress = this.feedAddress;
        obj.feedCategories = this.feedCategories;
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
          connection.send("303 " + jsonString + "\u0004");
        };
        connection.onerror = (error) => {
          websocketHelper.onError(error, this);
          this.loading = false;
        };
        connection.onmessage = (msg) => {
          message += msg.data;
        };
        connection.onclose = () => {
          var response = JSON.parse(message);
          if (Object.prototype.hasOwnProperty.call(response, "error")) {
            errorMessages(response.error, this);
            this.loading = false;
          } else {
            delete obj.variable;
            delete obj.uuid;
            db.feeds.put(obj);
            this.loading = false;
            this.dialog = false;
            this.$emit("feedListUpdate");
          }
        }
      }
    },
  },

  watch: {
    value: function () {
      this.dialog = this.value;
      if(this.dialog) {  
        this.feedName = this.name;
        this.feedAddress = this.link;
        this.feedCategories = this.categories;
      }
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

<style scoped>
@media only screen and (min-width: 960px) {
  .input-width {
    max-width: 300px !important;
  }
}
</style>