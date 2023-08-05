<template>
  <div class="home">
    <h1 class="headline center">v-m-blog</h1>
    <img alt="Vue logo" src="../assets/vue.svg">
    <div class="sections">
        <h2 class="center">{{section}}</h2>
        <div class="section" v-for="entry in entries" :key="entry.id">
          <div class="entry">
            <router-link :to="{ name: entry.id}">
              {{entry.name}}
              <span class="subtitle">{{entry.date}}</span>
            </router-link>
            <p>{{entry.description}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BLOGENTRIES from '../blog_store/posts_index.json'

export default {
  name: 'blog',
  computed: {
    entries() {
      return BLOGENTRIES
    }
  }
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
}
.headline {
  text-transform: uppercase;
  margin: 4rem auto;
  font-size: 4rem;
}
img {
  display: block;
  margin: 0 auto;
  width: 150px;
}

h2 {
  color: #35495e;
  text-transform: capitalize;
  margin-bottom: 2rem;
}

h3 {
  color: #42b883;
  margin-bottom: 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  .subtitle {
    color: grey;
    font-size: .98rem;
    float: right;
    font-weight: normal;
  }
}

p {
  margin-top: .4rem;
}

.sections {
  max-width: 40vw;
  margin: 0 auto;
  margin-top: 4rem;
}

.section {
  margin-bottom: 3rem;
}

.group {
  margin-bottom: 4rem;
}

</style>