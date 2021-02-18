<template>
  <div id="confirm">
    <div id="content">
      <v-progress-circular indeterminate size="48" color="#00bfa5" />
      <p style="padding: 8px;">{{ $t("Confirming your email address...") }}</p>
    </div>
    <alertdialog
      v-bind:title="alertTitle"
      v-bind:content="alertContent"
      v-bind:show="showAlert"
    ></alertdialog>
  </div>
</template>

<script>
import AlertDialog from "../../components/AlertDialog.vue";

export default {
  name: "Confirm",

  components: {
    alertdialog: AlertDialog
  },

  mounted: function() {
    this.sendData();
    const selfVue = this;
    window.setTimeout(function() {
      selfVue.$emit("drawerControl", false);
    }, 500);
  },

  data: () => ({
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
      const selfVue = this;
      const urlParams = this.$router.currentRoute.query;
      const email = urlParams.email;
      const confirmationId = urlParams.confirmationId;

      var obj = new Object();
      obj.email = email;
      obj.confirmationId = confirmationId;
      var jsonString = JSON.stringify(obj);

      var connection = new WebSocket("wss://rssreader.aplikoj.com/wss/", "PDRAUM");
      connection.onerror = function(error) {
        selfVue.alertTitle = "Erro de comunicação";
        selfVue.alertContent =
          '<p>Houve um erro de comunicação com o servidor e/ou com a internet. Verifique sua conexão ou tente novamente mais tarde.</p><p style="opacity: 0.8">Código de erro: ' +
          "websocket_" +
          error.type +
          "</p>";
        selfVue.showAlertDialog();
        selfVue.sending = false;
      };
      connection.onopen = function() {
        selfVue.sending = true;
        var byte = new Uint8Array(1);
        byte[0] = 0x04;
        connection.send("104 ");
        connection.send(jsonString);
        connection.send(byte);
      };
      connection.onmessage = function(msg) {
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
              selfVue.sending = false;
              break;
            case "user_not_found":
              selfVue.alertTitle = "Usuário não encontrado";
              selfVue.alertContent =
                '<p>Este usuário não foi encontrado em nosso sistema Verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
                response.error +
                "</p>";
              selfVue.showAlertDialog();
              selfVue.sending = false;
              break;
            case "exception_empty_confid" || "wrong_confid":
              selfVue.alertTitle = "Erro com a chave de verificação";
              selfVue.alertContent =
                '<p>Houve um erro ao confirmar a chave de verificação, verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
                response.error +
                "</p>";
              selfVue.showAlertDialog();
              selfVue.sending = false;
              break;
            default:
              selfVue.alertTitle = "Erro desconhecido";
              selfVue.alertContent =
                '<p>Ops! Você acabou de esbarrar em um erro que ainda não conhecemos, por favor, entre em contato conosco informando o código de erro abaixo para que possamos corrigí-lo.</p><p style="opacity: 0.8">Código de erro: ' +
                response.error +
                "</p>";
              selfVue.showAlertDialog();
              selfVue.sending = false;
              break;
          }
        } else {
          selfVue.$router.push("/confirmEmail/success");
        }
      };
    }
  }
};
</script>

<style scoped>
#confirm {
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 16px 16px 16px;
}

#content {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>