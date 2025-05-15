<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="form-item">备份内容</div>
        <el-input size="small" disabled v-model="data.backupContent" class="form-item"></el-input>
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
        <div class="form-item">备份时间段</div>
        <el-input size="small" disabled v-model="data.schedule" class="form-item"></el-input>
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
import {deepClone} from "../../../../utils";

export default {
  name: "VMInfo",
  props: {
    formData: {
      type: Object,
      default: function () {
        return {
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
      return data
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
