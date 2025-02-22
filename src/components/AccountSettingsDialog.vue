<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>

      <v-card-title>{{ $t("Account settings") }}</v-card-title>

      <v-form ref="formRef">

        <!-- Change profile photo button -->
        <v-layout align-center justify-center style="padding: 0px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Profile picture") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-hover v-slot="{ hover }">
            <v-list-item-avatar color="grey" size="78">
              <v-icon color="white" v-if="userPhoto === null || userPhoto === ''">
                mdi-account
              </v-icon>
              <v-img v-else>
                <img
                  v-bind:src="userPhoto"
                  referrerpolicy="no-referrer"
                  id="profileImg"
                />
              </v-img>
              <input
                type="file"
                id="imageFilePicker"
                accept="image/*"
                style="display: none;"
              />
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out darken-2 v-img--reveal display-3"
                  style="height: 100%;"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="loadNewPhoto()"
                        width="78"
                        height="78"
                        icon
                      >
                        <v-icon color="white">mdi-paperclip</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t("Change photo") }}</span>
                  </v-tooltip>
                </div>
              </v-expand-transition>
            </v-list-item-avatar>
          </v-hover>
        </v-layout>

        <!-- Change name input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Name") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="userName"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Name') : null"
            hide-details="auto"
            class="input-width"
            outlined
          />
        </v-layout>

        <!-- Change email input field -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Email") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="email"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Email') : null"
            hide-details="auto"
            class="input-width"
            outlined
          />
        </v-layout>

        <!-- Verify password input field if account has password -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-model="password"
            v-bind:rules="hasPass() ? [] : [required]"
            v-bind:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Password') : null"
            hide-details="auto"
            class="input-width"
            outlined
          />
        </v-layout>

        <!-- Change/create password button -->
        <v-layout
          v-if="!changePassword"
          align-center
          justify-center
          style="padding: 4px 24px;"
        >
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-btn @click="changePassword = !changePassword">
            {{ $t("Change password") }}
          </v-btn>
        </v-layout>

        <!-- New password and repeat password input fields if the previous button was clicked -->
        <div v-else>

          <v-layout align-center justify-center style="padding: 4px 24px;">
            <div v-if="$vuetify.breakpoint.width > 960">
              {{ $t("New password") }}
            </div>
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
            <v-text-field
              v-model="newPassword"
              v-bind:rules="[minLength]"
              v-bind:append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:type="showNewPass ? 'text' : 'password'"
              @click:append="showNewPass = !showNewPass"
              v-bind:label="$vuetify.breakpoint.width < 960 ? $t('New password') : null"
              hide-details="auto"
              class="input-width"
              outlined
            />
          </v-layout>

          <v-layout align-center justify-center style="padding: 4px 24px;">
            <div v-if="$vuetify.breakpoint.width > 960">
              {{ $t("Repeat password") }}
            </div>
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
            <v-text-field
              v-model="repeatNewPassword"
              v-bind:rules="[minLength, passwordMatch]"
              v-bind:append-icon="showRepNewPass ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:type="showRepNewPass ? 'text' : 'password'"
              @click:append="showRepNewPass = !showRepNewPass"
              v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Repeat password') : null"
              hide-details="auto"
              class="input-width"
              outlined
            />
          </v-layout>
        </div>

        <!-- Link to Google and delete account buttons -->
        <v-layout align-center justify-center style="padding: 4px 24px;">
          <v-row align="center" justify="center" style="padding: 8px 0 8px 0;">
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
            <v-btn id="gBtn">
              <img
                src="../assets/images/google.png"
                referrerpolicy="no-referrer"
                width="30px"
                style="padding-right: 8px;"
              />
              {{ $t("Link to Google") }}
            </v-btn>
            <v-btn class="white--text" color="red" @click="deleteAccount()">
              {{ $t("Delete account") }}
            </v-btn>
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          </v-row>
        </v-layout>

      </v-form>

      <v-card-actions>
        <v-btn color="red" @click="disconnectOtherSessions()" text>
          {{ $t("Exit others sessions") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" @click="dialog = false" text>
          {{ $t("Cancel") }}
        </v-btn>
        <v-btn color="#00bfa5" @click="saveSettings()" text>
          {{ $t("Save") }}
        </v-btn>
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
  name: "AccountSettingsDialog",

  components: {
    AlertDialog,
  },

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.dialog = this.value;
    if (window.localStorage.getItem("sid") != null) {
      this.logged = true;
      this.userPhoto = window.localStorage.getItem("pic");
      this.userName = window.localStorage.getItem("user");
    }
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
      return (value) => value.length >= 6 || this.$t("The password is to short");
    },

    hasPass() {
      return () => window.localStorage.getItem("login").indexOf('server') === -1;
    },

    hasProvider() {
      return () => window.localStorage.getItem("login").indexOf('provider') === -1;
    },
  },

  data: () => ({
    dialog: false,
    userPhoto: null,
    userName: null,
    email: null,
    password: null,
    showPass: false,
    changePassword: false,
    newPassword: null,
    showNewPass: false,
    repeatNewPassword: null,
    showRepNewPass: false,
    errorDialog: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.errorDialog = !this.errorDialog;
    },

    loadNewPhoto() {
      const filePicker = document.getElementById("imageFilePicker");
      const imgEl = document.getElementById("profileImg");
      filePicker.click();
      filePicker.addEventListener("change", function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          imgEl.src = reader.result;
        };
        reader.readAsDataURL(filePicker.files[0]);
      });
    },

    disconnectOtherSessions() {
      var obj = new Object();
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
        connection.send("107 " + jsonString + '\u0004');
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
          //TODO: criar mensagem de confirmação
        }
      }
    },

    deleteAccount() {
      //TODO: criar mensagem de confirmação
      if (this.$refs.formRef.validate()) {
        var obj = new Object();
        obj.variable = window.localStorage.getItem("l");
        obj.uuid = window.localStorage.getItem("sid");
        if (window.localStorage.getItem("login").indexOf('server') !== -1) {
          obj.password = this.password;
        } else {
          obj.jwt = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
        }
        var jsonString = JSON.stringify(obj);

        var message = "";
        var connection = new WebSocket(
          websocketHelper.wssUrl,
          websocketHelper.wssProtocol
        );
        connection.onopen = () => {
          this.loading = true;
          connection.send("150 " + jsonString + '\u0004');
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
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("l");
            window.localStorage.removeItem("pic");
            window.localStorage.removeItem("login");
            window.localStorage.removeItem("sid");
            window.localStorage.removeItem("feeds");
            window.localStorage.removeItem("settings");
            if (window.gapi.auth2.getAuthInstance().isSignedIn) {
              window.gapi.auth2.getAuthInstance().disconnect();
            }
            Dexie.delete('rssReader');
            this.dialog = false;
            document.location.replace(window.location.origin);
          }
        }
      }
    },

    saveSettings() {
      if (this.$refs.formRef.validate()) {
        this.dialog = false;
      }
    },
  },

  watch: {
    value: function () {
      this.dialog = this.value;
    },

    dialog: function () {
      if(this.dialog) {
        if (window.localStorage.getItem("sid") != null) {
          this.logged = true;
          this.userPhoto = window.localStorage.getItem("pic");
          this.userName = window.localStorage.getItem("user");
        }
        const selfVue = this;
        window.setTimeout(function () {
          window.gapi.auth2
            .getAuthInstance()
            .attachClickHandler(
              document.getElementById("gBtn"),
              {},
              function (user) {
                selfVue.dialog = false;
                console.log(user);
              }
            );
        }, 500);
      } else {
        this.changePassword = false;
        this.$refs.formRef.reset();
      }
      this.$emit("input", this.dialog);
    },
  },
};
</script>

<style scoped>
#gBtn {
  margin: 8px;
}

.v-img--reveal {
  background-color: #00bfa5;
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.85;
  position: absolute;
  width: 100%;
}

@media only screen and (min-width: 960px) {
  .input-width {
    max-width: 300px !important;
  }
}
</style>