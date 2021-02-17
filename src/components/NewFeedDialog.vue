<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>{{ $t("Add a new feed") }}</v-card-title>

      <v-layout align-center justify-center style="padding: 0px 4px">
        <v-container fluid>
          <v-form ref="formRef">
            <v-text-field
              class="eight-padding"
              v-model="name"
              v-bind:label="$t('Name')"
              v-bind:rules="[required]"
              outlined
              hide-details="auto"
            />
            <v-text-field
              class="eight-padding"
              v-model="link"
              v-bind:label="$t('Feed link')"
              v-bind:rules="[required]"
              outlined
              hide-details="auto"
            />
            <v-combobox
              class="eight-padding"
              v-model="categories"
              v-bind:label="$t('Categories')"
              append-icon=""
              outlined
              multiple
              small-chips
              deletable-chips
            />
          </v-form>
        </v-container>
      </v-layout>

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
.eight-padding {
  padding: 8px !important;
}
</style>