<template>
  <el-row>
    <el-col :span="8">
      <el-form-item label="VCenter: ">
        <span >
          {{ backupDetail.vCenter }}
        </span>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="虚拟机: ">
        <span v-if="backupDetail.selectedVmObjects">
          <el-tag :key="idx" v-for="(v, idx) in backupDetail.selectedVmObjects.map(v => v.name)"> {{ v }}</el-tag>
        </span>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="仓库: ">
        {{ backupDetail.repository }}
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "VMDetail",
  props: {
    backupDetail: {
      type: Object,
      default: function() {
        return {
          selectedVmObjects: [],
          repository: undefined
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
