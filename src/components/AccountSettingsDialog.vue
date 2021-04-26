<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>{{ $t("Account settings") }}</v-card-title>

      <v-form ref="formRef">
        <v-layout align-center justify-center style="padding: 0px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Profile picture") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-hover v-slot="{ hover }">
            <v-list-item-avatar color="grey" size="78">
              <v-icon color="white" v-if="userPhoto == null || userPhoto == ''"
                >mdi-account</v-icon
              >
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
                style="display: none"
              />
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out darken-2 v-img--reveal display-3"
                  style="height: 100%"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="changePhoto()"
                        width="78"
                        height="78"
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
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Name") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Name') : null"
            outlined
            hide-details="auto"
            v-model="userName"
            class="input-width"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Email") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Email') : null"
            outlined
            hide-details="auto"
            v-model="email"
            class="input-width"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Password") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            v-bind:label="
              $vuetify.breakpoint.width < 960 ? $t('Password') : null
            "
            outlined
            hide-details="auto"
            v-model="password"
            v-bind:rules="[required]"
            v-bind:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            v-bind:type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            class="input-width"
          />
        </v-layout>
        <v-layout
          align-center
          justify-center
          style="padding: 4px 24px"
          v-if="!changePassword"
        >
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-btn @click="changePassword = !changePassword">{{
            $t("Change password")
          }}</v-btn>
        </v-layout>
        <div v-else>
          <v-layout align-center justify-center style="padding: 4px 24px">
            <div v-if="$vuetify.breakpoint.width > 960">
              {{ $t("New password") }}
            </div>
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
            <v-text-field
              v-bind:label="
                $vuetify.breakpoint.width < 960 ? $t('New password') : null
              "
              outlined
              hide-details="auto"
              v-model="newPassword"
              v-bind:rules="[minLength]"
              v-bind:append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:type="showNewPass ? 'text' : 'password'"
              @click:append="showNewPass = !showNewPass"
              class="input-width"
            />
          </v-layout>
          <v-layout align-center justify-center style="padding: 4px 24px">
            <div v-if="$vuetify.breakpoint.width > 960">
              {{ $t("Repeat password") }}
            </div>
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
            <v-text-field
              v-bind:label="
                $vuetify.breakpoint.width < 960 ? $t('Repeat password') : null
              "
              outlined
              hide-details="auto"
              v-model="repeatNewPassword"
              v-bind:rules="[minLength, passwordMatch]"
              v-bind:append-icon="showRepNewPass ? 'mdi-eye' : 'mdi-eye-off'"
              v-bind:type="showRepNewPass ? 'text' : 'password'"
              @click:append="showRepNewPass = !showRepNewPass"
              class="input-width"
            />
          </v-layout>
        </div>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <v-row align="center" justify="center" style="padding: 8px 0 8px 0">
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
            <v-btn id="gBtn" style="margin: 8px">
              <img
                src="../assets/images/google.png"
                referrerpolicy="no-referrer"
                width="30px"
                style="padding-right: 8px"
              />
              {{ $t("Link to Google") }}
            </v-btn>
            <v-btn class="white--text" color="red" @click="deleteAccount()">{{
              $t("Delete account")
            }}</v-btn>
            <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          </v-row>
        </v-layout>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" text v-on:click="dialog = false">{{
          $t("Cancel")
        }}</v-btn
        ><v-btn color="#00bfa5" text v-on:click="saveSettings()">{{
          $t("Save")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AccountSettingsDialog",

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
      return (value) =>
        value.length >= 6 || this.$t("The password is to short");
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
  }),

  methods: {
    changePhoto() {
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

    deleteAccount() {},

    saveSettings() {
      if (this.$refs.formRef.validate()) {
        this.dialog = false;
      }
    },
  },

  watch: {
    value: function () {
      this.dialog = this.value;
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
    },

    dialog: function () {
      if (this.$refs.formRef != undefined) {
        this.changePassword = false;
        this.$refs.formRef.resetValidation();
      }
      this.$emit("input", this.dialog);
    },
  },
};
</script>

<style scoped>
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