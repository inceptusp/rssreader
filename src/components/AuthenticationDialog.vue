<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-layout align-center justify-center style="padding: 8px">
        <v-btn
          text
          @click="loginOrSingUp = 'login'"
          v-bind:color="loginOptionColor"
          >{{ $t("Login") }}</v-btn
        >
        <v-btn
          text
          @click="loginOrSingUp = 'signup'"
          v-bind:color="signupOptionColor"
          >{{ $t("Sign up") }}</v-btn
        >
      </v-layout>

      <v-form v-if="loginOrSingUp == 'login'" ref="formRef">
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Email") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="email"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Email') : null"
            v-bind:rules="[required]"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="password"
            v-bind:label="
              $vuetify.breakpoint.width < 960 ? $t('Password') : null
            "
            v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPass1 ? 'text' : 'password'"
            v-bind:rules="[required, minLength]"
            @click:append="showPass1 = !showPass1"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <div>
            <a @click="forgotPassword()">{{ $t("Forgot my password") }}</a>
          </div>
        </v-layout>
        <v-layout
          align-center
          justify-center
          style="padding: 8px 24px 16px 24px"
        >
          <v-layout>
            <v-row
              align="center"
              justify="center"
              style="padding: 8px 0 0 0"
              v-if="$vuetify.breakpoint.width < 960"
            >
              <v-btn
                id="gBtn"
                style="margin: 8px"
                v-bind:loading="sending"
                v-bind:disabled="sending"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px"
                />
                {{ $t("Login with Google") }}
              </v-btn>
              <v-btn
                style="margin: 8px"
                v-bind:loading="sending"
                v-bind:disabled="sending"
                @click="sendData()"
                >{{ $t("Login") }}</v-btn
              >
            </v-row>
            <v-layout v-else>
              <v-btn
                id="gBtn"
                v-bind:loading="sending"
                v-bind:disabled="sending"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px"
                />
                {{ $t("Login with Google") }}
              </v-btn>
              <v-spacer />
              <v-btn
                v-bind:loading="sending"
                v-bind:disabled="sending"
                @click="sendData()"
                >{{ $t("Login") }}</v-btn
              >
            </v-layout>
          </v-layout>
        </v-layout>
      </v-form>

      <v-form v-if="loginOrSingUp == 'signup'" ref="formRef">
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
            {{ $t("Email") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="email"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Email') : null"
            v-bind:rules="[required]"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="password"
            v-bind:label="
              $vuetify.breakpoint.width < 960 ? $t('Password') : null
            "
            v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPass1 ? 'text' : 'password'"
            v-bind:rules="[required, minLength]"
            @click:append="showPass1 = !showPass1"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Repeat password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="repeatPassword"
            v-bind:label="
              $vuetify.breakpoint.width < 960 ? $t('Repeat password') : null
            "
            v-bind:append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPass2 ? 'text' : 'password'"
            v-bind:rules="[required, minLength, passwordMatch]"
            @click:append="showPass2 = !showPass2"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout
          align-center
          justify-center
          style="padding: 8px 24px 16px 24px"
        >
          <v-layout>
            <v-row
              align="center"
              justify="center"
              style="padding: 8px 0 0 0"
              v-if="$vuetify.breakpoint.width < 960"
            >
              <v-btn
                id="gBtn"
                style="margin: 8px"
                v-bind:loading="sending"
                v-bind:disabled="sending"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px"
                />
                {{ $t("Sign up with Google") }}
              </v-btn>
              <v-btn
                style="margin: 8px"
                v-bind:loading="sending"
                v-bind:disabled="sending"
                @click="sendData()"
                >{{ $t("Sign up") }}</v-btn
              >
            </v-row>
            <v-layout v-else>
              <v-btn
                id="gBtn"
                v-bind:loading="sending"
                v-bind:disabled="sending"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px"
                />
                {{ $t("Sign up with Google") }}
              </v-btn>
              <v-spacer />
              <v-btn
                v-bind:loading="sending"
                v-bind:disabled="sending"
                @click="sendData()"
                >{{ $t("Sign up") }}</v-btn
              >
            </v-layout>
          </v-layout>
        </v-layout>
      </v-form>
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

export default {
  name: "AuthenticationDialog",

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
    loginOptionColor() {
      return this.loginOrSingUp == "login" ? "#00bfa5" : "black";
    },

    signupOptionColor() {
      return this.loginOrSingUp == "signup" ? "#00bfa5" : "black";
    },

    passwordMatch() {
      return () =>
        this.password === this.repeatPassword ||
        this.$t("The passwords don't match");
    },

    required() {
      return (value) => !!value || this.$t("This field is mandatory");
    },

    minLength() {
      return (value) =>
        (value != null && value.length >= 6) ||
        this.$t("The password is to short");
    },
  },

  data: () => ({
    dialog: false,
    loginOrSingUp: null,
    email: null,
    password: null,
    name: null,
    repeatPassword: null,
    showPass1: false,
    showPass2: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
    sending: false,
  }),

  methods: {
    onSignIn(user) {
      this.sendData(user);
    },

    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    forgotPassword() {
      this.errorTitle = this.$t("A recovery email has been sent");
      this.errorContent = this.$t(
        "We have sent a password recovery email to your inbox. Check it (or the spam folder) for more instructions."
      );
      this.showErrorDialog();
    },

    sendData(user) {
      if (this.$refs.formRef.validate() || user != undefined) {
        const selfVue = this;

        var obj = new Object();
        if (selfVue.loginOrSingUp == "login") {
          if (user == undefined) {
            obj.email = selfVue.email;
            obj.password = selfVue.password;
          } else {
            obj.jwt = user.getAuthResponse().id_token;
          }
        } else {
          if (user == undefined) {
            obj.name = selfVue.name;
            obj.email = selfVue.email;
            obj.password = selfVue.password;
          } else {
            obj.jwt = user.getAuthResponse().id_token;
          }
        }
        var jsonString = JSON.stringify(obj);

        var connection = new WebSocket(
          "wss://rssreader.aplikoj.com/wss/",
          "PDRAUM"
        );
        connection.onerror = function (error) {
          selfVue.errorTitle = "Comunication error";
          selfVue.errorContent =
            '<p>There was a communication error with the server and/or the internet. Check your connection or try again later.</p><p style="opacity: 0.8">Error code: ' +
            "websocket_" +
            error.type +
            "</p>";
          selfVue.showErrorDialog();
          selfVue.sending = false;
        };
        connection.onopen = function () {
          selfVue.sending = true;
          var byte = new Uint8Array(1);
          byte[0] = 0x04;
          if (selfVue.loginOrSingUp == "login") {
            connection.send("101 ");
          } else {
            connection.send("100 ");
          }
          connection.send(jsonString);
          connection.send(byte);
        };
        connection.onmessage = function (msg) {
          var response = JSON.parse(msg.data);
          if (Object.prototype.hasOwnProperty.call(response, "error")) {
            switch (response.error) {
              default:
                selfVue.errorTitle = "Comunication error";
                selfVue.errorContent =
                  '<p>There was a communication error with the server and/or the internet. Check your connection or try again later.</p><p style="opacity: 0.8">Error code: ' +
                  response.error +
                  "</p>";
                selfVue.showErrorDialog();
                selfVue.sending = false;
            }
          } else {
            window.localStorage.setItem("user", response.name);
            window.localStorage.setItem("pic", response.pic);
            window.localStorage.setItem("email", response.email);
            window.localStorage.setItem("login", response.login);
            window.localStorage.setItem("uuid", response.uuid);
            window.localStorage.setItem("feeds", response.feeds);
            selfVue.dialog = false;
            document.location.reload();
          }
        };
      }
    },
  },

  watch: {
    value: function () {
      this.dialog = this.value;
      if (this.loginOrSingUp == null) {
        this.loginOrSingUp = "login";
      }
    },

    dialog: function () {
      if (this.$refs.formRef != undefined) {
        this.$refs.formRef.reset();
      }
      this.$emit("input", this.dialog);
    },

    loginOrSingUp: function () {
      if (this.$refs.formRef != undefined) {
        this.$refs.formRef.reset();
      }
      const selfVue = this;
      window.setTimeout(function () {
        window.gapi.auth2
          .getAuthInstance()
          .attachClickHandler(
            document.getElementById("gBtn"),
            {},
            function (user) {
              selfVue.sendData(user);
            }
          );
      }, 500);
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