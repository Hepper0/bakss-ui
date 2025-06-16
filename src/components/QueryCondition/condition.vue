<template>
  <div style="margin: 3px 0">
    <el-select id="type" style="min-width:200px; width: calc(40% - 15px);margin-right: 15px" size="mini" clearable v-model="conditionType" placeholder="请选择" @change="onChange">
      <el-option v-for="c in columns" :label="c.label" :value="c.value"></el-option>
    </el-select>
    <span v-if="valueList.length > 0">
      <el-select size="mini" style="min-width:300px; width: 60%" v-model="conditionValue" placeholder="请选择" @change="onChange">
        <el-option v-for="(v, idx) in valueList" :label="v.label || v" :value="v.value || idx" />
      </el-select>
    </span>
    <span v-else>
      <el-input style="min-width:300px; width: 60%" size="mini" v-model="conditionValue" @change="onChange" placeholder="请输入" clearable></el-input>
    </span>
  </div>
</template>

<script>
export default {
  name: "condition",
  data: function () {
    return {
      conditionType: undefined,
      conditionValue: undefined,
      columns: [
        { label: 'ID', value: 'id' },
        { label: '备份软件', value: 'backupSoftware', valueList: [{ label: 'Veeam', value: 'Veeam' }] },
        // { label: '申请类型', value: 'appType', valueList: ['申请备份管理权', '授权备份管理权','恢复创建','备份创建','立即备份','定时备份','修改备份目录','启用备份','策略禁用','策略删除', '修改owner', '修改管理员'] },
        { label: '任务名称', value: 'appName' },
        { label: '操作系统类型', value: 'platform', valueList: [{ label: 'Windows', value: 'Windows' }, { label: 'Linux', value: 'Linux' }] }
      ]
    }
  },
  props: {
    hiddenColumns: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted() {
    this.columns.push({ label: '任务类型', value: 'jobType', valueList: this.jobTypeOptions })
    this.columns.push({ label: '申请类型', value: 'appType', valueList: this.applicationTypeOptions })
    this.columns.push({ label: '备份内容', value: 'backupContent', valueList: this.backupContentOptions })
    if (this.hiddenColumns.length > 0) {
      this.columns = this.columns.filter(c => !(this.hiddenColumns.includes(c.label) || this.hiddenColumns.includes(c.value)))
    }
  },
  computed: {
    valueList: function () {
      const t = this.columns.find(c => c.value === this.conditionType)
      return t && t.valueList || []
    },
    jobTypeOptions: function () {
      return this.getConfig('jobType')
    },
    applicationTypeOptions: function () {
      return this.getConfig('applicationType')
    },
    backupContentOptions: function () {
      return this.getConfig('backupContent')
    },
  },
  methods: {
    onChange(e) {
      this.$emit('update', {type: this.conditionType, value: this.conditionValue})
    },
    getConfig(type) {
      return this.$store.getters[type] && this.$store.getters[type].map(r => {
        return { label: r.dictLabel, value: r.dictValue }
      })
    },
    addCondition(condition) {
      this.columns.push(condition)
    }
  }
}
</script>

<style scoped>

</style>
