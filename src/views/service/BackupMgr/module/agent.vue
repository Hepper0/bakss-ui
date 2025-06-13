<template>
  <el-row>
    <el-col :span="8">
      <el-form-item label="Type: ">
        {{ backupDetail.type }}
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="Mode: ">
        {{ backupDetail.mode }}
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="OSPlatform: ">
        {{ backupDetail.OSPlatform }}
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="仓库: ">
        {{ backupDetail.backupRepositoryName }}
      </el-form-item>
    </el-col>
    <el-col :span="16">
      <el-form-item label="保护组对象: ">
        <span v-if="backupDetail.selectedPgObjects">
          <el-tag style="margin: 0 2px" :key="idx" v-for="(v, idx) in backupDetail.selectedPgObjects.map(v => v.name)"> {{ v }}</el-tag>
        </span>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "AgentDetail",
  props: {
    backupDetail: {
      type: Object,
      default: function() {
        return {
          selectedPgObjects: [],
          backupRepositoryName: undefined,
          OSPlatform: undefined,
          type: undefined,
          mode: undefined
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
