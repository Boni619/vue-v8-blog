<template>
  <v-container>
    <v-row justify="space-around">
      <v-card>
        <v-btn icon="mdi-arrow-left"  to="/"></v-btn>
        <v-card-text>
          <AsyncMarkdown/>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
const AsyncMarkdown = route.meta.markdownComponent

</script>

<style>
h1,h2 {
  margin: 2vh;
}
</style>