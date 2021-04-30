<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>

      <!-- Selector to load the right form: login or sign up -->
      <v-layout align-center justify-center style="padding: 8px;">
        <v-btn
          v-bind:color="loginOptionColor"
          @click="loginOrSignUp = 'login'"
          text
        >
          {{ $t("Login") }}
        </v-btn>
        <v-btn
          v-bind:color="signupOptionColor"
          @click="loginOrSignUp = 'signup'"
          text
        >
          {{ $t("Sign up") }}
        </v-btn>
      </v-layout>

      <!-- Login form -->
      <v-form v-if="loginOrSignUp === 'login'" ref="formRef">

        <!-- Email input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Email") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="email"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Email') : null"
            v-bind:rules="[required]"
            class="input-width"
            hide-details="auto"
            outlined
          />
        </v-layout>

        <!-- Password input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="password"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Password') : null"
            v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPass1 ? 'text' : 'password'"
            v-bind:rules="isForgot ? [] : [required, minLength]"
            @click:append="showPass1 = !showPass1"
            class="input-width"
            hide-details="auto"
            outlined
          />
        </v-layout>

        <!-- Forgot password link -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <div>
            <a @click="forgotPassword()">{{ $t("Forgot my password") }}</a>
          </div>
        </v-layout>

        <!-- Login buttons (login w/ Google and server login) -->
        <v-layout
          align-center
          justify-center
          style="padding: 8px 24px 16px 24px;"
        >
          <v-layout>
            <v-row
              v-if="$vuetify.breakpoint.width < 960"
              align="center"
              justify="center"
              style="padding: 8px 0 0 0;"
            >
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                id="gBtn"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px;"
                />
                {{ $t("Login with Google") }}
              </v-btn>
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                @click="loginSignUp()"
                style="margin: 8px;"
              >
                {{ $t("Login") }}
              </v-btn>
            </v-row>
            <v-layout v-else>
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                id="gBtn"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px;"
                />
                {{ $t("Login with Google") }}
              </v-btn>
              <v-spacer />
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                @click="loginSignUp()"
                >{{ $t("Login") }}</v-btn
              >
            </v-layout>
          </v-layout>
        </v-layout>
      </v-form>

      <!-- Sign up form -->
      <v-form v-if="loginOrSignUp === 'signup'" ref="formRef">

        <!-- Name input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Name") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="name"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Name') : null"
            v-bind:rules="[required]"
            class="input-width"
            hide-details="auto"
            outlined
          />
        </v-layout>

        <!-- Email input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Email") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="email"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Email') : null"
            v-bind:rules="[required]"
            class="input-width"
            hide-details="auto"
            outlined
          />
        </v-layout>

        <!-- Password input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="password"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Password') : null"
            v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPass1 ? 'text' : 'password'"
            v-bind:rules="[required, minLength]"
            @click:append="showPass1 = !showPass1"
            class="input-width"
            hide-details="auto"
            outlined
          />
        </v-layout>

        <!-- Repeat password input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Repeat password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="repeatPassword"
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

        <!-- Sign up buttons (sign up w/ Google and server sign up) -->
        <v-layout
          align-center
          justify-center
          style="padding: 8px 24px 16px 24px;"
        >
          <v-layout>
            <v-row
              align="center"
              justify="center"
              style="padding: 8px 0 0 0;"
              v-if="$vuetify.breakpoint.width < 960"
            >
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                id="gBtn"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px;"
                />
                {{ $t("Sign up with Google") }}
              </v-btn>
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                @click="loginSignUp()"
                style="margin: 8px;"
              >
                {{ $t("Sign up") }}
              </v-btn>
            </v-row>
            <v-layout v-else>
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                id="gBtn"
              >
                <img
                  src="../assets/images/google.png"
                  referrerpolicy="no-referrer"
                  width="30px"
                  style="padding-right: 8px;"
                />
                {{ $t("Sign up with Google") }}
              </v-btn>
              <v-spacer />
              <v-btn
                v-bind:loading="loading"
                v-bind:disabled="loading"
                @click="loginSignUp()"
              >
                {{ $t("Sign up") }}
              </v-btn>
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
import { errorMessages } from '../errorMessages';
import websocketHelper from "../websocketHelper";

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
      return this.loginOrSignUp === "login" ? "#00bfa5" : "black";
    },

    signupOptionColor() {
      return this.loginOrSignUp === "signup" ? "#00bfa5" : "black";
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
        (value !== null && value.length >= 6) ||
        this.$t("The password is to short");
    },
  },

  data: () => ({
    dialog: false,
    loginOrSignUp: null,
    isForgot: false,
    email: null,
    password: null,
    name: null,
    repeatPassword: null,
    showPass1: false,
    showPass2: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
    loading: false,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    forgotPassword() {
      this.isForgot = true;
      this.sendForgotPasswordEmail();
    },

    sendForgotPasswordEmail() {
      if(this.$refs.formRef.validate()) { //* Validate only email input field but it requires vuetify 3, needs to wait
        var obj = new Object();
        obj.email = this.email;
        var jsonString = JSON.stringify(obj);
          
        var connection = new WebSocket(
          websocketHelper.wssUrl,
          websocketHelper.wssProtocol
        );
        connection.onopen = () => {
          this.loading = true;
          connection.send('103 ' + jsonString + '\u0004');
        };
        connection.onerror = (error) => {
          websocketHelper.onError(error, this);
          this.loading = false;
        }
        connection.onclose = () =>  {
          this.errorTitle = this.$t("A recovery email has been sent");
          this.errorContent = this.$t(
            "We have sent a password recovery email to your inbox. Check it (or the spam folder) for more instructions."
          );
          this.showErrorDialog();
          this.isForgot = false;
          this.loading = false;
          this.$refs.formRef.reset();
        }
      }
    },

    loginSignUp(user) {
      if (this.$refs.formRef.validate() || user !== undefined) {
        var obj = new Object();
        if (this.loginOrSignUp === "login") {
          if (user === undefined) {
            obj.email = this.email;
            obj.password = this.password;
          } else {
            obj.jwt = user.getAuthResponse().id_token;
          }
        } else {
          if (user === undefined) {
            obj.name = this.name;
            obj.email = this.email;
            obj.password = this.password;
          } else {
            obj.jwt = user.getAuthResponse().id_token;
          }
        }
        var jsonString = JSON.stringify(obj);
        
        var message = "";
        var connection = new WebSocket(
          websocketHelper.wssUrl,
          websocketHelper.wssProtocol
        );
        connection.onopen = () => {
          this.loading = true;
          if (this.loginOrSignUp === "login") {
            connection.send("101 " + jsonString + "\u0004");
          } else {
            connection.send("100 " + jsonString + "\u0004");
          }
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
            window.localStorage.setItem("user", response.name);
            window.localStorage.setItem("pic", response.pic);
            window.localStorage.setItem("l", response.variable);
            window.localStorage.setItem("login", response.login);
            window.localStorage.setItem("sid", response.uuid);
            window.localStorage.setItem("feeds", response.feeds);
            window.localStorage.setItem("verified", response.verified);
            this.dialog = false;
            document.location.reload();
          }
        };
      }
    },
  },

  watch: {
    value: function () {
      this.dialog = this.value;
      if (this.loginOrSignUp === null) {
        this.loginOrSignUp = "login";
      }
    },

    dialog: function () {
      if (!this.dialog) {
        this.$refs.formRef.reset();
      }
      this.$emit("input", this.dialog);
    },

    loginOrSignUp: function () {
      if (this.$refs.formRef !== undefined) {
        this.$refs.formRef.reset();
      }
      window.setTimeout(() => {
        window.gapi.auth2
          .getAuthInstance()
          .attachClickHandler(
            document.getElementById("gBtn"),
            {},
            (user) => {
              this.loginSignUp(user);
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