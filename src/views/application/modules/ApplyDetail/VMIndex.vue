<template>
  <div>
    <WMInfo :form-data="formData">
      <slot></slot>
    </WMInfo>
    <flow-steps v-show="appId" :app-id="appId"/>
  </div>
</template>

<script>
import WMInfo from "./VMInfo"
import FlowSteps from "./FlowSteps"

export default {
  name: "VMIndex",
  components: {
    WMInfo,
    FlowSteps
  },
  props: {
    formData: {
      type: Object,
      default: function () {
        return {
          // id: undefined,
          // appTypeZh: undefined,
          // appUser: undefined,
          // appTime: undefined,
          // remark: undefined
        }
      }
    }
  },
  computed: {
    appId: function () {
      return this.formData.id
    }
  },
}
</script>

<style scoped>

</style>
