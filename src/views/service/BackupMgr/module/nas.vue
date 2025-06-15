<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-form-item label="备份对象: ">
        <span v-if="backupDetail.selectedObjects">
          <el-tag style="margin: 0 2px" :key="idx" v-for="(v, idx) in backupDetail.selectedObjects.map(v => v.name)"> {{ v }}</el-tag>
        </span>
        </el-form-item>
      </el-col>
    </el-row>
<!--    <el-divider content-position="left">短期</el-divider>-->
    <el-row>
      <el-col :span="8">
        <el-form-item label="短期备份仓库: ">
          {{ backupDetail.shortTermBackupRepository }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="短期保留类型: ">
          {{ backupDetail.shortTermRetentionType }}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="短期保留周期: ">
          {{ backupDetail.shortTermRetentionPeriod }}
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NASDetail",
  props: {
    backupDetail: {
      type: Object,
      default: function() {
        return {
          selectedObjects: [],
          shortTermBackupRepository: undefined,
          shortTermRetentionType: undefined,
          shortTermRetentionPeriod: undefined,
          highPriority: false
        }
      }
    }
  },
  computed: {
    shortTermUnit: function() {
      if (this.backupDetail.shortTermRetentionType === 'Daily') {
        return '天'
      } else if(this.backupDetail.shortTermRetentionType === 'Monthly') {
        return '月'
      }
    }
  }
}
</script>

<style scoped>

</style>
