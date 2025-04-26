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
    }
  },
  props: {
    columns: {
      type: Array,
      default: function () {
        return [
          { label: 'ID', value: 'ID' },
          { label: '备份软件', value: 'backupSoftware', valueList: [{ label: 'Veeam', value: 'Veeam' }] },
          { label: '申请类型', value: 'appType', valueList: ['申请备份管理权', '授权备份管理权','恢复创建','备份创建','立即备份','定时备份','修改备份目录','启用备份','策略禁用','策略删除', '修改owner', '修改管理员'] },
          { label: '客户端名称', value: 'clientName' },
          { label: '备份IP', value: 'backupIP' },
          { label: '应用名称', value: 'appName' },
          { label: '操作系统类型', value: 'platform', valueList: [{ label: 'Windows', value: 'windows' }, { label: 'Linux', value: 'linux' }] }
        ]
      }
    }
  },
  computed: {
    valueList: function () {
      const t = this.columns.find(c => c.value === this.conditionType)
      return t && t.valueList || []
    }
  },
  methods: {
    onChange(e) {
      this.$emit('update', {type: this.conditionType, value: this.conditionValue})
    }
  }
}
</script>

<style scoped>

</style>
