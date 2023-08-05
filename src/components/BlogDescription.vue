<template>
   <div class="blog">
    <AsyncMarkdown />
    <router-link to="/"  class="back">&laquo; Back</router-link>
  </div>
</template>

<style>
.blog {
	 max-width: 50vw;
	 margin: 10rem auto;
}
 blog .back {
	 background-color: #42b883;
	 color: white;
	 margin-top: 5rem;
	 text-decoration: none;
	 padding: 10px 15px;
	 border: 1px solid currentColor;
	 border-radius: 0.5rem;
	 display: inline-block;
	 transition: all 0.3s ease;
}
 blog .back:hover {
	 background-color: transparent;
	 color: #42b883;
}
 blog  h1 {
	 font-size: 3rem;
	 margin-bottom: 0.2rem;
	 color: #42b883;
}
 blog h4 {
	 margin-bottom: 3rem;
	 color: #35495e;
}
 blog pre {
	 overflow-x: auto;
	 background-color: #35495e;
	 color: white;
	 border-radius: 0.3rem;
	 padding: 1rem;
}
 blog img {
	 max-width: 100%;
}

</style>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
const AsyncMarkdown = route.meta.markdownComponent
</script>