<template>
  <v-container>
    <v-row justify="space-around">
      <v-card>
        <v-card-text>
          <markdownComponent/>
        </v-card-text>
      </v-card>
      <router-link to="/" class="back">&laquo; Back</router-link>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['markdownComponent']);
</script>