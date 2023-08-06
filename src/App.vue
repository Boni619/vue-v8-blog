<template>
  <VApp>
    <!-- <NavBar/> -->
    <v-toolbar color="cyan-lighten-1">
      <v-btn variant="text" icon="mdi-menu"></v-btn>

      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>
    <VMain>
      <router-view></router-view>
    </VMain>
  </VApp>
</template>
<script setup>
import NavBar from './components/NavBar.vue'
</script>
