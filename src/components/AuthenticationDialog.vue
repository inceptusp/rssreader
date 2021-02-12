<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-layout align-center justify-center style="padding: 8px">
        <v-btn text @click="loginOrSingUp = 'login'">Login</v-btn>
        <v-btn text @click="loginOrSingUp = 'singup'">Sing Up</v-btn>
      </v-layout>
      <v-layout align-center justify-center style="padding: 8px">
        <v-list>
          <v-form v-if="loginOrSingUp == 'login'">
            <v-text-field v-model="teste" label="E-mail" outlined />
            <v-text-field v-model="teste" label="Password" outlined />
          </v-form>
          <v-form v-if="loginOrSingUp == 'singup'">
            <v-text-field v-model="teste" label="Name" outlined />
            <v-text-field v-model="teste" label="E-mail" outlined />
            <v-text-field v-model="teste" label="Password" outlined />
            <v-text-field v-model="teste" label="Repeat Password" outlined />
          </v-form>
        </v-list>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AuthenticationDialog",

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.dialog = this.value;
  },

  data: () => ({
    dialog: false,
    loginOrSingUp: "login",
    teste: "",
  }),

  watch: {
    value: function () {
      this.dialog = this.value;
    },

    dialog: function () {
      this.$emit("input", this.dialog);
    },

    loginOrSingUp: function () {},
  },
};
</script>