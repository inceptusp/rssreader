<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>{{ $t("Add a new feed") }}</v-card-title>

      <v-form ref="formRef">
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Name") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="name"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Name') : null"
            v-bind:rules="[required]"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Feed link") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="link"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Feed link') : null"
            v-bind:rules="[required]"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Categories") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-combobox
            class="input-width"
            v-model="categories"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Categories') : null"
            append-icon=""
            hide-details="auto"
            outlined
            multiple
            small-chips
            deletable-chips
            persistent-hint
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div style="text-align: center;">{{ $t('Press ENTER to add a category') }}</div>
        </v-layout>
      </v-form>

      <v-card-actions v-if="!sending">
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" text v-on:click="dialog = false">{{
          $t("Cancel")
        }}</v-btn
        ><v-btn color="#00bfa5" text v-on:click="addFeed()">{{
          $t("Save")
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
import AlertDialog from "../components/AlertDialog";
import websocketHelper from "../websocketHelper";
import { errorMessages } from "../errorMessages";

export default {
  name: "NewFeedDialog",

  components: {
    AlertDialog,
  },

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.dialog = this.value;
  },

  computed: {
    required() {
      return (value) => !!value || this.$t("This field is mandatory");
    },
  },

  data: () => ({
    dialog: false,
    name: null,
    link: null,
    categories: [],
    sending: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    addFeed() {
      const selfVue = this;
      
      if (this.$refs.formRef.validate()) {
        var obj = new Object();
        obj.feedName = selfVue.name;
        obj.feedAddress = selfVue.link;
        obj.feedCategories = selfVue.categories;
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
          connection.send("301 ");
          connection.send(jsonString);
          connection.send(byte);
        };
        connection.onmessage = function (msg) {
          var response = JSON.parse(msg.data);
          if (Object.prototype.hasOwnProperty.call(response, "error")) {
            errorMessages(response.error, selfVue);
          } else {
            selfVue.dialog = false;
            selfVue.sending = false;
            selfVue.$emit("feedListUpdate");
          }
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

<style scoped>
@media only screen and (min-width: 960px) {
  .input-width {
    max-width: 300px !important;
  }
}
</style>