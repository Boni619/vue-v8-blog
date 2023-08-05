import { createRouter, createWebHistory } from 'vue-router';
import Blog from '../components/Blog.vue';
import BlogDescription from '../components/BlogDescription.vue';
import BlogEntries from '../blog_store/posts_index.json';
import { defineAsyncComponent } from "vue"

const routes = [
  { path: '/', name: 'Blog', component: Blog },
  ...BlogEntries.map((child) => ({
    path: '/blog/' + child.id,
    name: child.id,
    component: BlogDescription,
    meta: {
      markdownComponent: defineAsyncComponent(() => import('../blog_store/posts/'+child.tag+'/'+child.id+'.md'))
    },
  }
  )),
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;