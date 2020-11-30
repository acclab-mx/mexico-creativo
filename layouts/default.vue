<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  async fetch() {
    const { data } = await this.$axios('/api/tematicas')
    console.log('data: ', data)
    const { records } = data
    console.log('records: ', records)
    this.topics = records.map((r) => ({
      id: r.id,
      title: r.fields.TEMA,
      path: `/playground?topicId=${r.id}`,
    }))
  },
  data() {
    return {
      topics: [],
    }
  },
  mounted() {
    console.log('topics: ', this.topics)
    if (this.topics.length) {
      this.setTopics(this.topics)
    }
  },
  methods: {
    ...mapMutations(['setTopics']),
  },
}
</script>
