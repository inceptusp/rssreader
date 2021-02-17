<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-layout align-center justify-center style="padding: 8px 0 0 0">
        <v-btn text @click="loginOrSingUp = 'login'">{{ $t("Login") }}</v-btn>
        <v-btn text @click="loginOrSingUp = 'signup'">{{
          $t("Sign up")
        }}</v-btn>
      </v-layout>
      <v-layout align-center justify-center style="padding: 0 8px 8px 8px">
        <v-container fluid>
          <v-list>
            <v-form v-if="loginOrSingUp == 'login'" ref="formRef">
              <v-text-field
                class="eight-padding"
                v-model="email"
                v-bind:label="$t('E-mail')"
                v-bind:rules="[required]"
                outlined
                full-width
                hide-details="auto"
              />
              <v-text-field
                class="eight-padding"
                v-model="password"
                v-bind:label="$t('Password')"
                v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-bind:type="showPass1 ? 'text' : 'password'"
                v-bind:rules="[required, minLength]"
                @click:append="showPass1 = !showPass1"
                outlined
                full-width
                hide-details="auto"
              />
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
                  <v-spacer />
                  <v-btn
                    style="margin: 8px"
                    v-bind:loading="sending"
                    v-bind:disabled="sending"
                    @click="sendData()"
                    >{{ $t("Login") }}</v-btn
                  >
                </v-layout>
              </v-layout>
            </v-form>
            <v-form v-if="loginOrSingUp == 'signup'" ref="formRef">
              <v-text-field
                class="eight-padding"
                v-model="name"
                v-bind:label="$t('Name')"
                v-bind:rules="[required]"
                outlined
                full-width
                hide-details="auto"
              />
              <v-text-field
                class="eight-padding"
                v-model="email"
                v-bind:label="$t('E-mail')"
                v-bind:rules="[required]"
                outlined
                full-width
                hide-details="auto"
              />
              <v-text-field
                class="eight-padding"
                v-model="password"
                v-bind:label="$t('Password')"
                v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
                v-bind:type="showPass1 ? 'text' : 'password'"
                v-bind:rules="[required, minLength]"
                @click:append="showPass1 = !showPass1"
                outlined
                full-width
                hide-details="auto"
              />
              <v-text-field
                class="eight-padding"
                v-model="repeatPassword"
                v-bind:label="$t('Repeat password')"
                v-bind:append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
                v-bind:type="showPass2 ? 'text' : 'password'"
                v-bind:rules="[required, minLength, passwordMatch]"
                @click:append="showPass2 = !showPass2"
                outlined
                full-width
                hide-details="auto"
              />
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
                  <v-spacer />
                  <v-btn
                    style="margin: 8px"
                    v-bind:loading="sending"
                    v-bind:disabled="sending"
                    @click="sendData()"
                    >{{ $t("Sign up") }}</v-btn
                  >
                </v-layout>
              </v-layout>
            </v-form>
          </v-list>
        </v-container>
      </v-layout>
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
    passwordMatch() {
      return () =>
        this.password === this.repeatPassword ||
        this.$t("The passwords don't match");
    },

    required(value) {
      return value != '' || this.$t("This field is mandatory");
    },

    minLength(value) {
      return value.length >= 6 || this.$t("The password is to short");
    },
  },

  data: () => ({
    dialog: false,
    loginOrSingUp: "",
    email: "",
    password: "",
    name: "",
    repeatPassword: "",
    showPass1: false,
    showPass2: false,
    errorDialog: false,
    errorTitle: "",
    errorContent: "",
    sending: false,
  }),

  methods: {
    onSignIn(user) {
      this.sendData(user);
    },

    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
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
            if (user == undefined) {
              if (selfVue.loginOrSingUp == "login") {
                window.localStorage.setItem("user", response.name);
                window.localStorage.setItem("pic", response.imageUrl);
              } else {
                window.localStorage.setItem("user", selfVue.name);
                window.localStorage.setItem("pic", "");
              }
              window.localStorage.setItem("email", selfVue.email);
              window.localStorage.setItem("login", "server");
            } else {
              window.localStorage.setItem(
                "user",
                user.getBasicProfile().getName()
              );
              window.localStorage.setItem(
                "email",
                user.getBasicProfile().getEmail()
              );
              if (selfVue.loginOrSingUp == "login") {
                window.localStorage.setItem("pic", response.imageUrl);
              } else {
                window.localStorage.setItem(
                  "pic",
                  user.getBasicProfile().getImageUrl()
                );
              }
              window.localStorage.setItem("login", "provider");
            }
            window.localStorage.setItem("uuid", response.uuid);
            window.localStorage.setItem("feeds", 0 /*response.feeds*/);
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
      if (this.loginOrSingUp == "") {
        this.loginOrSingUp = "login";
      }
    },

    dialog: function () {
      this.$emit("input", this.dialog);
    },

    loginOrSingUp: function () {
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
.eight-padding {
  padding: 8px !important;
}
</style>