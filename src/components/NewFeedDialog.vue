<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>{{ $t("Add a new feed") }}</v-card-title>

      <v-form ref="formRef">
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Name") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="name"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Name') : null"
            v-bind:rules="[required]"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Feed link") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-text-field
            class="input-width"
            v-model="link"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Feed link') : null"
            v-bind:rules="[required]"
            outlined
            hide-details="auto"
          />
        </v-layout>
        <v-layout align-center justify-center style="padding: 4px 24px">
          <div v-if="$vuetify.breakpoint.width > 960">
            {{ $t("Categories") }}
          </div>
          <v-spacer v-if="$vuetify.breakpoint.width > 960" />
          <v-combobox
            class="input-width"
            v-model="categories"
            v-bind:label="$vuetify.breakpoint.width < 960 ? $t('Categories') : null"
            append-icon=""
            hide-details="auto"
            outlined
            multiple
            small-chips
            deletable-chips
          />
        </v-layout>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#00bfa5" text v-on:click="dialog = false">{{
          $t("Cancel")
        }}</v-btn
        ><v-btn color="#00bfa5" text v-on:click="addFeed()">{{
          $t("Save")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewFeedDialog",

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.dialog = this.value;
  },

  computed: {
    required() {
      return (value) => !!value || this.$t("This field is mandatory");
    },
  },

  data: () => ({
    dialog: false,
    name: null,
    link: null,
    categories: null,
  }),

  methods: {
    addFeed() {
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
      if (this.$refs.formRef != undefined) {
        this.$refs.formRef.reset();
      }
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