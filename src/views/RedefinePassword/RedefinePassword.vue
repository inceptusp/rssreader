<template>
  <div id="form">
    <div id="preamble">
      <v-icon size="48" style="padding: 16px">mdi-key</v-icon>
      <h2 style="padding: 8px">{{ $t("Redefine password") }}</h2>
      <p style="padding: 8px; opacity: 0.8">
        {{ $t("Enter your new password in the fields below to change it.") }}
      </p>
    </div>
    <v-form ref="formRef">
      <v-layout align-center justify-center style="padding: 4px 20%">
        <div v-if="$vuetify.breakpoint.width > 960">
          {{ $t("New password") }}
        </div>
        <v-spacer v-if="$vuetify.breakpoint.width > 960" />
        <v-text-field
          v-model="newPassword"
          v-bind:label="
            $vuetify.breakpoint.width < 960 ? $t('New password') : null
          "
          hide-details="auto"
          v-bind:append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPass1 ? 'text' : 'password'"
          v-bind:rules="[required, minLength]"
          @click:append="showPass1 = !showPass1"
          outlined
          class="input-width"
        />
      </v-layout>
      <v-layout align-center justify-center style="padding: 4px 20%">
        <div v-if="$vuetify.breakpoint.width > 960">
          {{ $t("Repeat password") }}
        </div>
        <v-spacer v-if="$vuetify.breakpoint.width > 960" />
        <v-text-field
          v-model="repeatNewPassword"
          v-bind:label="
            $vuetify.breakpoint.width < 960 ? $t('Repeat password') : null
          "
          hide-details="auto"
          v-bind:append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
          v-bind:type="showPass2 ? 'text' : 'password'"
          v-bind:rules="[required, minLength, passwordMatch]"
          @click:append="showPass2 = !showPass2"
          outlined
          class="input-width"
        />
      </v-layout>
    </v-form>
    <v-fab-transition>
      <v-btn fab large bottom right fixed @click="sendData()">
        <div v-if="!sending">
          <v-icon>mdi-check</v-icon>
        </div>
        <div v-else>
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </v-btn>
    </v-fab-transition>
    <alertdialog
      v-bind:title="alertTitle"
      v-bind:content="alertContent"
      v-bind:show="showAlert"
    ></alertdialog>
  </div>
</template>

<script>
import AlertDialog from "../../components/AlertDialog.vue";
import websocketHelper from "../../websocketHelper";

export default {
  name: "RedefinePassword",

  components: {
    alertdialog: AlertDialog,
  },

  mounted: function () {
    const selfVue = this;
    window.setTimeout(function () {
      selfVue.$emit("drawerControl", false);
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
        (value != null && value.length >= 6) ||
        this.$t("The password is to short");
    },
  },

  data: () => ({
    showPass1: false,
    showPass2: false,
    newPassword: null,
    repeatNewPassword: null,
    sending: false,
    showAlert: false,
    alertTitle: null,
    alertContent: null,
  }),

  methods: {
    showAlertDialog() {
      this.showAlert = !this.showAlert;
    },

    sendData() {
      if (this.$refs.formRef.validate()) {
        const selfVue = this;
        const urlParams = this.$router.currentRoute.query;
        const email = urlParams.email;
        const authId = urlParams.authId;
        const password = this.newPassword;

        var obj = new Object();
        obj.email = email;
        obj.authId = authId;
        obj.password = password;
        var jsonString = JSON.stringify(obj);

        var connection = websocketHelper.rssReaderWs();
        connection.onerror = (error) => websocketHelper.onError(error, selfVue);
        connection.onopen = function () {
          selfVue.sending = true;
          var byte = new Uint8Array(1);
          byte[0] = 0x04;
          connection.send("105 ");
          connection.send(jsonString);
          connection.send(byte);
        };
        connection.onmessage = function (msg) {
          var response = JSON.parse(msg.data);
          if (Object.prototype.hasOwnProperty.call(response, "error")) {
            switch (response.error) {
              case "json_with_error":
                selfVue.alertTitle = "Erro de transmissão";
                selfVue.alertContent =
                  '<p>Houve um erro na transmissão, verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
                  response.error +
                  "</p>";
                selfVue.showAlertDialog();
                break;
              case "user_not_found":
                selfVue.alertTitle = "Usuário não encontrado";
                selfVue.alertContent =
                  '<p>Este usuário não foi encontrado em nosso sistema Verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
                  response.error +
                  "</p>";
                selfVue.showAlertDialog();
                break;
              case "exception_empty_authid" || "wrong_authid":
                selfVue.alertTitle = "Erro com a chave de verificação";
                selfVue.alertContent =
                  '<p>Houve um erro ao confirmar a chave de verificação, verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
                  response.error +
                  "</p>";
                selfVue.showAlertDialog();
                break;
              default:
                selfVue.alertTitle = "Erro desconhecido";
                selfVue.alertContent =
                  '<p>Ops! Você acabou de esbarrar em um erro que ainda não conhecemos, por favor, entre em contato conosco informando o código de erro abaixo para que possamos corrigí-lo.</p><p style="opacity: 0.8">Código de erro: ' +
                  response.error +
                  "</p>";
                selfVue.showAlertDialog();
                break;
            }
            selfVue.sending = false;
          } else {
            selfVue.$router.push("/redefinePassword/success");
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