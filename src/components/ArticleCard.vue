<template>
  <v-card class="articleCard" outlined>

    <v-list-item style="padding: 2px 16px;">
      <v-list-item-avatar size="25%" tile>
        <v-flex contain>
          <v-img v-bind:src="article.image" />
        </v-flex>
      </v-list-item-avatar>
      <v-card-title style="word-break: break-word; text-align: justify;">
        {{ article.title }}
      </v-card-title>
    </v-list-item>

    <v-card-subtitle v-html="article.description" style="text-align: justify;" />

    <v-card-actions>
      <v-layout align-center justify-center>
        <v-tooltip v-if="article.content !== null" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" @click.stop="showFullArticle()" large icon>
              <v-icon>mdi-book-open-variant</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Read full article") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              v-bind:href="'https://outline.com/' + article.url"
              large
              icon
            >
              <v-icon>mdi-text</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("Outline") }}</span>
        </v-tooltip>
      </v-layout>
    </v-card-actions>

    <full-article-dialog
      v-model="showArticle"
      v-bind:title="article.title"
      v-bind:content="article.content"
      v-bind:url="article.url"
    />
  </v-card>
</template>

<script>
import FullArticleDialog from "../components/FullArticleDialog";

export default {
  name: "ArticleCard",

  components: {
    FullArticleDialog,
  },

  props: {
    article: { type: Object },
  },

  mounted: function () {
    var aElements = document.getElementsByClassName("articleCard");
    aElements.forEach(function (el) {
      el.getElementsByTagName("a").forEach(function (e) {
        e.setAttribute("target", "_blank");
      });
    });
  },

  data: () => ({
    showArticle: false,
  }),

  methods: {
    showFullArticle() {
      this.showArticle = !this.showArticle;
    },
  },
};
</script>