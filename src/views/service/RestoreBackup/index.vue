<template>
  <notice v-if="step === 1" @next="handleNext"></notice>
  <detail v-else></detail>
</template>

<script>
import Notice from "./notice";
import Detail from "./detail";
export default {
  name: "index",
  components: {Detail, Notice},
  data: function () {
    return {
      step: 1
    }
  },
  methods: {
    handleNext() {
      this.step = 2
    }
  }
}
</script>

<style scoped>

</style>
