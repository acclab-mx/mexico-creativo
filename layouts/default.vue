<template>
  <div>
    <Nuxt />
    <div
      v-show="$store.state.showOverlay"
      class="cover"
      @click="closeOverlay"
    ></div>
    <div class="popups">
      <MXNavbarMenu v-if="$store.state.showMXNavbarMenu" />
      <PlaygroundNavbarMenu v-if="$store.state.showPlaygroundNavbarMenu" />
      <CardModal v-if="$store.state.showCardModal" />
    </div>
  </div>
</template>

<script>
import MXNavbarMenu from '@/components/MXNavbarMenu'
import PlaygroundNavbarMenu from '@/components/PlaygroundNavbarMenu'
import CardModal from '@/components/CardModal'
import { mapMutations } from 'vuex'

export default {
  components: {
    MXNavbarMenu,
    PlaygroundNavbarMenu,
    CardModal,
  },
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
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.closeOverlay()
        if (to.path.includes('playground')) {
          this.updateTopics()
        }
      }
    },
    '$store.state.showCardModal'(val) {
      if (val === true) {
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100%'
      } else {
        document.body.style.overflow = 'auto'
        document.body.style.height = 'auto'
      }
    },
  },
  mounted() {
    this.updateTopics()
  },
  methods: {
    ...mapMutations(['setTopics', 'setTopicSelected', 'closeOverlay']),
    updateTopics() {
      console.log('topics: ', this.topics)
      if (this.topics.length) {
        this.setTopics(this.topics)
        if (this.$route.query.topicId) {
          const topicSelected = this.topics.filter(
            (t) => t.id === this.$route.query.topicId
          )[0]
          this.setTopicSelected(topicSelected)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cover {
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
}
</style>
