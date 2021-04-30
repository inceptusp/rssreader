<template>
  <v-navigation-drawer v-model="drawer" app fixed mobile-breakpoint="960">

    <!-- Log on/off button -->
    <template v-slot:prepend>
      <v-app-bar flat>
        <v-list-item
          @click="openAccountDialog()"
          two-line
          style="max-height: 64px;"
        >
          <v-list-item-avatar color="grey">
            <v-icon color="white" v-if="userPhoto == null || userPhoto == ''">
              mdi-account
            </v-icon>
            <v-img v-else>
              <img v-bind:src="userPhoto" referrerpolicy="no-referrer" />
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="fade">
              {{ logged ? userName : $t("Welcome") }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ logged ? $t("Sign out") : $t("Login or Sign Up") }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-app-bar>

      <authentication-dialog v-model="showAuthenticationDialog" />
      <log-off-dialog v-model="showSignOutDialog" />
    </template>

    <!-- Tools bar if logged in -->
    <v-list-item v-if="logged">
      <v-layout align-center justify-center>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" @click.stop="openSearch()" icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Search") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click.stop="openNewFeedDialog()"
              icon
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("New feed") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click.stop="openAccountSettingsDialog()"
              icon
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Account") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click.stop="openSettingsDialog()"
              icon
            >
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Settings") }}</span>
        </v-tooltip>
      </v-layout>

      <new-feed-dialog v-model="showNewFeedDialog" @feedListUpdate="loadFeedList()" />
      <account-settings-dialog v-model="showAccountSettingsDialog" />
      <settings-dialog v-model="showSettingsDialog" @feedListUpdate="loadFeedList()" />
    </v-list-item>

    <v-divider v-if="logged" />

    <!-- Searchbar if the user clicked in the search button -->
    <v-text-field
      v-if="searchBar"
      v-model="search"
      v-bind:label="$t('Search')"
      outlined
      hide-details="auto"
      style="padding: 8px"
      @keydown="searchFeedList(search)"
    />

    <v-divider v-if="searchBar" /> 

    <!-- Loading indicator for the feed list -->
    <v-progress-linear 
      v-if="loading"
      background-opacity="0"
      color="#00bfa5"
      indeterminate
    />

    <!-- Feed list -->
    <v-list shaped>
      <v-list-item @click.stop="$router.replace('/')">
        <v-list-item-title>{{ $t("Home") }}</v-list-item-title>
      </v-list-item>
      <template v-if="logged">
        <v-list-item
          v-for="feed in feedList"
          v-bind:key="feed.feedAddress"
          @click.stop="$router.replace('/feed/' + feed.feedName + '?feed=' + feed.feedAddress)"
        >
          <v-list-item-title>{{ feed.feedName }}</v-list-item-title>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click.stop="openEditFeedDialog(feed)" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("Edit") }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click.stop="openDeleteFeedDialog(feed)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>{{ $t("Remove") }}</span>
          </v-tooltip>
        </v-list-item>
      </template>

      <edit-feed-dialog
        v-model="showEditFeedDialog"
        v-bind:name="feedName"
        v-bind:link="feedAddress"
        v-bind:categories="feedCategories"
        @feedListUpdate="loadFeedList()"
      />
      <delete-feed-dialog
        v-model="showDeleteFeedDialog"
        v-bind:link="feedAddress" 
        @feedListUpdate="loadFeedList()"
      />

    </v-list>

  </v-navigation-drawer>
</template>

<script>
import Dexie from 'dexie';

import AuthenticationDialog from "../components/AuthenticationDialog.vue";
import LogOffDialog from "../components/LogOffDialog.vue";
import NewFeedDialog from "../components/NewFeedDialog.vue";
import EditFeedDialog from "../components/EditFeedDialog.vue";
import DeleteFeedDialog from "../components/DeleteFeedDialog.vue";
import AccountSettingsDialog from "../components/AccountSettingsDialog.vue";
import SettingsDialog from "../components/SettingsDialog.vue";
import websocketHelper from "../websocketHelper";
import { errorMessages } from "../errorMessages";

export default {
  name: "Drawer",

  components: {
    AuthenticationDialog,
    LogOffDialog,
    NewFeedDialog,
    EditFeedDialog,
    DeleteFeedDialog,
    AccountSettingsDialog,
    SettingsDialog,
  },

  props: {
    value: { type: Boolean },
  },

  mounted: function () {
    this.drawer = this.value;
    if (window.localStorage.getItem("sid") != null) {
      this.logged = true;
      this.userName = window.localStorage.getItem("user");
      this.userPhoto = window.localStorage.getItem("pic");
      this.loadFeedList();
    }
  },

  data: () => ({
    drawer: null,
    userName: null,
    userPhoto: null,
    showAuthenticationDialog: false,
    showNewFeedDialog: false,
    showAccountSettingsDialog: false,
    showSettingsDialog: false,
    showSignOutDialog: false,
    searchBar: false,
    search: null,
    searchTimeout: null,
    logged: false,
    loading: false,
    feedList: [],
    feedName: "",
    feedAddress: "",
    feedCategories: [],
    showEditFeedDialog: false,
    showDeleteFeedDialog: false,
  }),

  watch: {
    value: function () {
      this.drawer = this.value;
    },

    drawer: function () {
      this.$emit("input", this.drawer);
    },
  },

  methods: {
    openAccountDialog() {
      if (!this.logged) {
        this.drawer = null;
        this.showAuthenticationDialog = !this.showAuthenticationDialog;
      } else {
        this.drawer = null;
        this.showSignOutDialog = !this.showSignOutDialog;
      }
    },

    openSearch() {
      this.searchBar = !this.searchBar;
      if(this.searchBar === false) {
        this.searchFeedList('');
      }
    },

    openNewFeedDialog() {
      this.drawer = null;
      this.showNewFeedDialog = !this.showNewFeedDialog;
    },

    openAccountSettingsDialog() {
      this.drawer = null;
      this.showAccountSettingsDialog = !this.showAccountSettingsDialog;
    },

    openSettingsDialog() {
      this.drawer = null;
      this.showSettingsDialog = !this.showSettingsDialog;
    },

    searchFeedList(query) {
      const selfVue = this;

      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async function () {
        var db = new Dexie('rssReader');
        db.version(1).stores({
          feeds: "feedAddress,feedName,*feedCategories",
        });
        await db.open();

        var searchResult;
        var settings = JSON.parse(window.localStorage.getItem("settings"));
        if(settings.feedsOrder === "alpha") {
          searchResult = await db.feeds.where('feedName')
                          .startsWithIgnoreCase(query)
                          .or('feedCategories')
                          .startsWithIgnoreCase(query)
                          .sortBy("feedName");
        } else {
          searchResult = await db.feeds.where('feedName')
                          .startsWithIgnoreCase(query)
                          .or('feedCategories')
                          .startsWithIgnoreCase(query)
                          .sortBy("dateAdded");
        }
        
        selfVue.feedList = searchResult;
      }, 520);
    },

    loadFeedList: async function() {
      var db = new Dexie('rssReader');
      db.version(1).stores({
        feeds: "feedAddress,feedName,*feedCategories",
      });
      await db.open();

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
        connection.send("302 " + jsonString + "\u0004");
      };
      connection.onerror = async () => {
        this.feedList = await db.feeds.toArray();
        this.loading = false;
      };
      connection.onmessage = (msg) => {
        message += msg.data;
      };
      connection.onclose = async () => {
        var response = JSON.parse(message);
        if (Object.prototype.hasOwnProperty.call(response, "error")) {
          errorMessages(response.error, this);
          this.loading = false;
        } else {
          response.feeds.forEach(feed => {
            db.feeds.put(feed);
          });
          var settings = JSON.parse(window.localStorage.getItem("settings"));
          if(settings.feedsOrder === "alpha") {
            this.feedList = await db.feeds.toCollection().sortBy('feedName');
          } else {
            this.feedList = await db.feeds.toCollection().sortBy('dateAdded');
          }
          this.loading = false;
          db.close();
        }
      };
    },

    openEditFeedDialog(feed) {
      this.drawer = null;
      this.feedName = feed.feedName;
      this.feedAddress = feed.feedAddress;
      this.feedCategories = feed.feedCategories;
      this.showEditFeedDialog = !this.showEditFeedDialog;
    },

    openDeleteFeedDialog(feed) {
      this.drawer = null;
      this.feedAddress = feed.feedAddress;
      this.showDeleteFeedDialog = !this.showDeleteFeedDialog;
    },
  },
};
</script>

<style>
.fade {
  width: 128px;
}

@media only screen and (min-width: 960px) {
  .v-toolbar__content {
    padding: 0px;
  }
}
</style>