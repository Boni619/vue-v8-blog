<template>
  <v-container>
    <v-row justify="center">
  <v-card
    class="mx-auto"
  >
    <v-list
      :items="entries"
      item-props
      lines="three"
      density="comfortable"

    >
      <template v-slot:tag="{ tag }">
        <div v-html="tag"></div>
      </template>

    </v-list>
  </v-card>
  </v-row>
  </v-container>

</template>

<script>
import BLOGENTRIES from '../blog_store/posts_index.json'
  export default {
    data: () => ({
      items: [
        { type: 'subheader', title: 'Today' },
        {
          title: 'Brunch this weekend?',
          tag:'test',
          subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { type: 'divider', inset: true },
        {
          tag:'test',
          color: 'red',
          title: 'Summer BBQ',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          title: 'Oui oui',
          tag:'test',
          subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          title: 'Birthday gift',
          tag:'test',
          subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { type: 'divider', inset: true },
        {
          title: 'Recipe to try',
          tag:'test',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }),
    computed:{
      entries() {
      return BLOGENTRIES
    }
    }
  }
</script>

<style>
.v-list__tile__content{
    justify-content: center!important;
    flex-direction: row!important;
    text-align: center!important;
    align-items: center!important;
}

.v-list__tile__title, .v-list__tile__sub-title {
    text-align: center!important;
}
</style>