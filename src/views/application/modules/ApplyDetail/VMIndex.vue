<template>
  <div>
    <WMInfo :form-data="formData">
      <slot></slot>
    </WMInfo>
    <flow-steps v-show="appId" :app-id="appId"/>
    <el-card v-show="sessionDetailVisible">
      <div slot="header" class="clearfix">
        <span>执行情况</span>
      </div>
      <session ref="sessionDetail" @loaded="onSessionLoad"/>
    </el-card>
  </div>
</template>

<script>
import WMInfo from "./VMInfo"
import FlowSteps from "./FlowSteps"
import Session from "@/views/application/modules/job/session"

export default {
  name: "VMIndex",
  data: function () {
    return {
      sessionDetailVisible: false
    }
  },
  components: {
    WMInfo,
    FlowSteps,
    Session
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
    },
    sessionId: function () {
      // todo jobSessionId怎么绑定
    }
  },
  methods: {
    onSessionLoad() {
      this.sessionDetailVisible = true
    }
  }
}
</script>

<style scoped>

</style>
