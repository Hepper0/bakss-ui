<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="form-item">申请类型</div>
        <el-input size="small" disabled v-model="data.appType" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">备份类型</div>
        <el-input size="small" disabled v-model="data.jobTypeZh" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">机器类型</div>
        <el-input size="small" disabled v-model="data.machineType" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">数据中心</div>
        <el-input size="small" disabled v-model="data.dataCenter" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">备份软件</div>
        <el-input size="small" disabled v-model="data.backupSoftware" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">应用名称</div>
        <el-input size="small" disabled v-model="data.appName" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">备份时间</div>
        <el-input size="small" disabled v-model="data.scheduleTime" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">备份日期类型</div>
        <el-input size="small" disabled v-model="data.scheduleDateType" class="form-item"></el-input>
      </el-col>
      <el-col :span="6" v-show="data.scheduleDateType === 'On these days'">
        <div class="form-item">备份日期</div>
        <el-input size="small" disabled v-model="data.scheduleDay" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">收费方式</div>
        <el-input size="small" disabled v-model="data.costType" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">收费编号</div>
        <el-input size="small" disabled v-model="data.costNumber" class="form-item"></el-input>
      </el-col>
    </el-row>
    <slot>
    </slot>
    <el-row>
      <div class="form-item">备注</div>
      <el-input disabled v-model="data.remark" class="form-item" type="textarea" :rows="3" />
    </el-row>
  </el-card>
</template>

<script>
import { MACHINE_TYPE, COST_TYPE, DATA_CENTER } from '@/views/common/config'
import { deepClone } from "../../../../utils";

const scheduleDateTypeOptions = {'everyday': 'EveryDay', 'weekdays': 'On Weekdays', 'selectedDays': 'On these days'}

export default {
  name: "VMInfo",
  data: function () {
    return {
      scheduleDateTypeOptions
    }
  },
  props: {
    formData: {
      type: Object,
      default: function () {
        return {
          jobType: undefined,
          backupContent: undefined,
          machineType: undefined,
          dataCenter: undefined,
          backupSoftware: undefined,
          platform: undefined,
          env: undefined,
          vmObjects: [],
          repository: undefined,
          description: undefined,
          costType: undefined,
          costNumber: undefined,
          remark: undefined
        }
      }
    },
  },
  computed: {
    data: function () {
      const data = deepClone(this.formData)
      data.machineType = MACHINE_TYPE[data.machineType]
      data.dataCenter = DATA_CENTER[data.dataCenter]
      data.costType = COST_TYPE[data.costType]
      data.scheduleDateType = scheduleDateTypeOptions[data.scheduleDateType]
      data.appType = this.APPLY_TYPE[data.appType]
      console.log('jobTypeOptions', this.jobTypeOptions)
      const t = this.jobTypeOptions.find(j => parseInt(j.value) === data.jobType)
      if (t) {
        data.jobTypeZh = t.label
      }
      return data
    },
    jobTypeOptions: function () {
      return this.getConfig('jobType')
    },
    APPLY_TYPE: function () {
      return this.$store.getters['applicationType'] && this.$store.getters['applicationType'].map(r => r.dictLabel)
    }
  },
  methods: {
    getConfig(type) {
      return this.$store.getters[type] && this.$store.getters[type].map(r => {
        return { label: r.dictLabel, value: r.dictValue }
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

</style>
