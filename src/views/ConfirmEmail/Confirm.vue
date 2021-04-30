<template>
  <div>

    <div v-if="loading" id="content">
      <v-progress-circular size="48" color="#00bfa5" indeterminate />
      <p style="padding: 8px;">{{ $t("Confirming your email address...") }}</p>
    </div>

    <alert-dialog
      v-model="showAlert"
      v-bind:title="errorTitle"
      v-bind:content="errorContent"
    />
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
    this.confirmEmail();
    window.setTimeout(() => {
      this.$emit("drawerControl", false);
    }, 500);
  },

  data: () => ({
    loading: true,
    showAlert: false,
    errorTitle: null,
    errorContent: null,
  }),

  methods: {
    showErrorDialog() {
      this.showAlert = !this.showAlert;
    },

    confirmEmail() {
      const urlParams = this.$router.currentRoute.query;

      var obj = new Object();
      obj.email = urlParams.email;
      obj.authId = urlParams.authId;
      var jsonString = JSON.stringify(obj);

      var message = "";
      var connection = new WebSocket(
        websocketHelper.wssUrl,
        websocketHelper.wssProtocol
      );
      connection.onopen = () => {
        this.loading = true;
        connection.send("102 " + jsonString + "\u0004");
      };
      connection.onerror = (error) => {
        websocketHelper.onError(error, this);
        this.loading = false;
      };
      connection.onmessage = (msg) => {
        message += msg.data;
      }
      connection.onclose = () => {
        var response = JSON.parse(message);
        if (Object.prototype.hasOwnProperty.call(response, "error")) {
          errorMessages(response.error, this);
          this.loading = false;
          window.location.replace(window.origin);
        } else {
          window.localStorage.setItem("verified", response.verified);
          this.$router.push("/confirmEmail/success");
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