<template>
  <div id="confirm">
    <div id="content">
      <v-progress-circular indeterminate size="48" color="#00bfa5" />
      <p style="padding: 8px;">{{ $t("Confirming your email address...") }}</p>
    </div>
    <alert-dialog
      v-bind:title="errorTitle"
      v-bind:content="errorContent"
      v-bind:show="showAlert"
    ></alert-dialog>
  </div>
</template>

<script>
import AlertDialog from "../../components/AlertDialog.vue";
import websocketHelper from "../../websocketHelper";
import { errorMessages } from "../../errorMessages";

export default {
  name: "Confirm",

  components: {
    AlertDialog
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
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showAlertDialog() {
      this.showAlert = !this.showAlert;
    },

    sendData() {
      const selfVue = this;
      const urlParams = this.$router.currentRoute.query;
      const email = urlParams.email;
      const authId = urlParams.authId;

      var obj = new Object();
      obj.email = email;
      obj.authId = authId;
      var jsonString = JSON.stringify(obj);

      var connection = websocketHelper.rssReaderWs();
      connection.onerror = function (error) {
        websocketHelper.onError(error, selfVue);
        selfVue.sending = false;
      }
      connection.onopen = function() {
        selfVue.sending = true;
        var byte = new Uint8Array(1);
        byte[0] = 0x04;
        connection.send("102 ");
        connection.send(jsonString);
        connection.send(byte);
      };
      connection.onmessage = function(msg) {
        var response = JSON.parse(msg.data);
        if (Object.prototype.hasOwnProperty.call(response, "error")) {
          errorMessages(response.error, selfVue);
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