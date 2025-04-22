<template>
  <div>
    <apply-info :form-data="formData">
      <slot></slot>
    </apply-info>
    <slot name="additional"></slot>
    <client-info v-show="showClient" />
    <flow-steps v-show="showFlow" />
  </div>
</template>

<script>
import FlowSteps from "./FlowSteps"
import ClientInfo from "./ClientInfo"
import ApplyInfo from "./ApplyInfo"


export default {
  name: "ApplyDetailTemplate",
  data: function () {
    return {
      backupProgress: 0
    }
  },
  props: {
    formData: {
      type: Object,
      default: function () {
        return {
          id: undefined,
          appTypeZh: undefined,
          appUser: undefined,
          appTime: undefined
        }
      }
    },
    showClient: {
      type: Boolean,
      default: true
    },
    showFlow: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ApplyInfo,
    ClientInfo,
    FlowSteps
  },
  methods: {
    back() {
      window.history.back()
    },
    cancel() {
      this.$confirm('确定取消备份申请吗？', '提示', { type: 'warning' }).then(() => {
        // todo api
      })
    }
  }
}
</script>

<style scoped>
.form-item {
  width: 100%;
  margin: 0 0 10px 0;
}

.header {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f1f1f1
}

.dire-panel {
  min-height: 115px; width: 100%; background-color: white; border: 2px solid #f1f1f1
}

.panel-title {
  background-color: #f1f1f1; padding: 7px 10px; border-bottom: 1px solid #f1f1f1
}

.panel-item {
  padding: 7px 10px; border-bottom: 1px solid #f1f1f1
}


.opt {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
</style>

