<template>
  <v-card outlined>
    <v-row align="center" style="padding: 4px 8px">
      <v-avatar size="128px" class="ma-3" tile>
        <v-flex contain>
          <v-img v-bind:src="article.image" />
        </v-flex>
      </v-avatar>
      <v-col>
        <v-card-title style="word-break: normal">{{
          article.title
        }}</v-card-title>
        <v-card-subtitle
          v-html="article.description"
          style="text-align: justify"
        />
      </v-col>
      <v-btn icon v-bind:href="'https://outline.com/' + article.url" large>
        <v-icon>mdi-book-open</v-icon>
      </v-btn>
      <v-container style="width: 16px;"/>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ArticleCard",

  props: {
    article: { type: Object },
  },
};
</script>