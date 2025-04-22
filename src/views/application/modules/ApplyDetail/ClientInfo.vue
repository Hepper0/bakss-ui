<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>客户端信息</span>
    </div>
    <el-collapse :value="1" style="border: 1px solid #f1f1f1; padding: 0 18px">
      <el-collapse-item :name="1">
        <el-table v-loading="loading" size="mini" :data="tableData" stripe>
          <el-table-column prop="backupSoftware" label="备份软件"></el-table-column>
          <el-table-column prop="clientName" label="客户端名称"></el-table-column>
          <el-table-column prop="backupContent" label="备份内容"></el-table-column>
          <el-table-column prop="backupIP" label="备份IP"></el-table-column>
          <el-table-column prop="appName" label="应用名称"></el-table-column>
          <el-table-column prop="platform" label="操作系统类型"></el-table-column>
          <el-table-column prop="owner" label="负责人"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  name: "ClientInfo",
  data: function () {
    return {
      loading: false,
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
