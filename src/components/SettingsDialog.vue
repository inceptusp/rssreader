<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>

      <v-card-title>{{ $t("Settings") }}</v-card-title>

      <!-- Option on how to order the feeds list -->
      <v-layout align-center justify-center style="padding: 0px 24px;">
        <div v-if="$vuetify.breakpoint.width > 960">
          {{ $t("Order feeds list") }}
        </div>
        <v-spacer v-if="$vuetify.breakpoint.width > 960" />
        <v-select
          v-model="settings.feedsOrder"
          v-bind:items="feedsOrderOptions"
          v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Order feeds list') : null"
          class="input-width"
          outlined
          hide-details
        />
      </v-layout>

      <!-- Dark mode switch button -->
      <v-layout align-center justify-center style="padding: 0px 24px;">
        <div>{{ $t("Dark mode") }}</div>
        <v-spacer />
        <v-switch v-model="settings.darkMode" />
      </v-layout>

      <v-card-actions>
        <v-btn color="red" @click="resetSettings()" text>
          {{ $t("Reset") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" @click="dialog = false" text>
          {{ $t("Cancel") }}
        </v-btn
        ><v-btn color="#00bfa5" @click="saveSettings()" text>
          {{ $t("Save") }}
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SettingsDialog",

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.dialog = this.value;
    if (window.localStorage.getItem("settings") != null) {
      this.settings = JSON.parse(window.localStorage.getItem("settings"));
    }
  },

  computed: {
    feedsOrderOptions() {
      return [
        {
          text: this.$t("Alphabetically"),
          value: "alpha",
          disabled: false,
        },
        {
          text: this.$t("Added date"),
          value: "date",
          disabled: false,
        },
      ];
    },
  },

  data: () => ({
    dialog: false,
    settings: {
      feedsOrder: "alpha",
      darkMode: false,
    },
  }),

  methods: {
    resetSettings() {
      window.localStorage.removeItem("settings");
      this.dialog = false;
      window.location.reload();
    },

    saveSettings() {
      this.$vuetify.theme.dark = this.settings.darkMode;
      window.localStorage.setItem("settings", JSON.stringify(this.settings));
      this.$emit("feedListUpdate");
      this.dialog = false;
    },
  },

  watch: {
    value: function () {
      this.dialog = this.value;
    },

    dialog: function () {
      this.$emit("input", this.dialog);
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