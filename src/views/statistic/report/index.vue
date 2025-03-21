<template>
  <div style="padding: 20px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row class="statistics-block" >
          <el-col :span="12" style="display: flex">
            <i class="el-icon-user panel-icon" style="font-size: 40px;padding: 8px"></i>
            <div>
              <el-row><b style="font-size: 30px; opacity: 0.7">{{ 25 }}</b></el-row>
              <el-row style="font-family: Microsoft YaHei, sans-serif; color: #6f6464e6">总用户</el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <span style="float: right; padding: 19px">0</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="statistics-block" >
          <el-col :span="12" style="display: flex">
            <i class="el-icon-message panel-icon" style="font-size: 40px;padding: 8px"></i>
            <div>
              <el-row><b style="font-size: 30px;opacity: 0.7">{{ 25 }}</b></el-row>
              <el-row style="font-family: Microsoft YaHei, sans-serif; color: #6f6464e6">总用户</el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <span style="float: right; padding: 19px">0</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row class="statistics-block" >
          <el-col :span="12" style="display: flex">
            <i class="el-icon-monitor panel-icon" style="font-size: 40px;padding: 8px"></i>
            <div>
              <el-row><b style="font-size: 30px;opacity: 0.7">{{ 25 }}</b></el-row>
              <el-row style="font-family: Microsoft YaHei, sans-serif; color: #6f6464e6">总用户</el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <span style="float: right; padding: 19px">0</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="panel-container">
      <el-tabs v-model="activityTab">
        <el-tab-pane label="用户统计" name="user">
          <el-collapse v-model="activityItem">
            <el-collapse-item title="活跃用户" name="activity"></el-collapse-item>
            <el-collapse-item title="累计用户" name="accumulate"></el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="请求统计" name="request"></el-tab-pane>
        <el-tab-pane label="备份客户端统计" name="backupClient"></el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "report",
  data () {
    return {
      activityTab: 'user',
      activityItem: 'activity'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.statistics-block {
  height: 80px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 12px;
}


</style>
