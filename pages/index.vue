<template>
  <div class="container">
    <div>
      <h1 class="title">México Creativo</h1>
      <ul>
        <li v-for="(tema, t) in tematicas" :key="t">{{ tema }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    const { data } = await this.$axios('/api/tematicas')
    console.log('data: ', data)
    const { records } = data
    console.log('records: ', records)
    this.tematicas = records.map((r) => r.fields.TEMA)
  },
  data() {
    return {
      tematicas: [],
    }
  },
}
</script>
