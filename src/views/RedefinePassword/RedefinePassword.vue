<template>
  <div>

    <!-- Text that appears on top of the page -->
    <div id="preamble">
      <v-icon size="48" style="padding: 16px;">mdi-key</v-icon>
      <h2 style="padding: 8px;">{{ $t("Redefine password") }}</h2>
      <p style="padding: 8px; opacity: 0.8.">
        {{ $t("Enter your new password in the fields below to change it.") }}
      </p>
    </div>

    <!-- Redefine password form -->
    <v-form ref="formRef">

      <!-- New password input field -->
      <v-layout align-center justify-center style="padding: 4px 20%;">
        <div v-if="$vuetify.breakpoint.width > 960">
          {{ $t("New password") }}
        </div>
        <v-spacer v-if="$vuetify.breakpoint.width > 960" />
        <v-text-field
          v-model="newPassword"
          v-bind:label="$vuetify.breakpoint.width < 960 ? $t('New password') : null"
          v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPass1 ? 'text' : 'password'"
          v-bind:rules="[required, minLength]"
          @click:append="showPass1 = !showPass1"
          class="input-width"
          hide-details="auto"
          outlined
        />
      </v-layout>

      <!-- Repeat new password input field -->
      <v-layout align-center justify-center style="padding: 4px 20%;">
        <div v-if="$vuetify.breakpoint.width > 960">
          {{ $t("Repeat password") }}
        </div>
        <v-spacer v-if="$vuetify.breakpoint.width > 960" />
        <v-text-field
          v-model="repeatNewPassword"
          v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Repeat password') : null"
          v-bind:append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPass2 ? 'text' : 'password'"
          v-bind:rules="[required, minLength, passwordMatch]"
          @click:append="showPass2 = !showPass2"
          class="input-width"
          hide-details="auto"
          outlined
        />
      </v-layout>
    </v-form>

    <!-- Confirm fab -->
    <v-fab-transition>
      <v-btn v-bind:disabled="!loading" @click="redefinePassword()" fab large bottom right fixed>
        <div v-if="!loading">
          <v-icon>mdi-check</v-icon>
        </div>
        <div v-else>
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </v-btn>
    </v-fab-transition>

    <alert-dialog
      v-model="errorDialog"
      v-bind:title="errorTitle"
      v-bind:content="errorContent"
    />
  </div>
</template>

<script>
import AlertDialog from "../../components/AlertDialog.vue";
import { errorMessages } from '../../errorMessages';
import websocketHelper from "../../websocketHelper";

export default {
  name: "RedefinePassword",

  components: {
    AlertDialog,
  },

  mounted: function () {
    window.setTimeout(() => {
      this.$emit("drawerControl", false);
    }, 250);
  },

  computed: {
    passwordMatch() {
      return () =>
        this.newPassword === this.repeatNewPassword ||
        this.$t("The passwords don't match");
    },

    required() {
      return (value) => !!value || this.$t("This field is mandatory");
    },

    minLength() {
      return (value) =>
        (value !== null && value.length >= 6) ||
        this.$t("The password is to short");
    },
  },

  data: () => ({
    showPass1: false,
    showPass2: false,
    newPassword: null,
    repeatNewPassword: null,
    loading: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    redefinePassword() {
      if (this.$refs.formRef.validate()) {
        const urlParams = this.$router.currentRoute.query;

        var obj = new Object();
        obj.email = urlParams.email;
        obj.authId = urlParams.authId;
        obj.password = this.newPassword;
        var jsonString = JSON.stringify(obj);

        var message = "";
        var connection = new WebSocket(
          websocketHelper.wssUrl,
          websocketHelper.wssProtocol
        );
        connection.onopen = () => {
          this.loading = true;
          connection.send("103 " + jsonString + "\u0004");
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
          } else {
            this.$router.push("/redefinePassword/success");
          }
        };
      }
    },
  },
};
</script>

<style scoped>
#preamble {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 16px 16px 0px 16px;
}

@media only screen and (min-width: 960px) {
  .input-width {
    max-width: 400px !important;
  }
}
</style>