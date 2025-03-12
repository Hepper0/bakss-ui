<template>
  <div class="dashboard-editor-container">

    <panel-group />

    <el-row :gutter="10">
      <!-- 最近申请 -->
      <el-col :span="12">
        <div class="panel-container" >
          <div style="margin-bottom: 15px">
            <i class="el-icon-message panel-icon" />
            <b style="font-size: 15px">最近申请</b>
          </div>
          <div>
            <div class="panel-table-wrapper">
              <el-table :data="recentApplications">
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="status" label="审核状态"></el-table-column>
                <el-table-column prop="exeStatus" label="执行状态"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间"></el-table-column>
              </el-table>
            </div>
            <div style="height: 60px; padding: 20px 10px">
              <div style="float: right">
                <b class="font-body" style="color: #558bea; font-size: 15px">
                  >>更多
                </b>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <!-- 待审批列表 -->
      <el-col :span="12">
        <div class="panel-container" >
          <div style="margin-bottom: 15px">
            <i class="el-icon-document panel-icon" />
            <b style="font-size: 15px">待审批列表</b>
          </div>
          <div>
            <div class="panel-table-wrapper">
              <el-table :data="recentApplications">
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="status" label="审核状态"></el-table-column>
                <el-table-column prop="exeStatus" label="执行状态"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间"></el-table-column>
              </el-table>
            </div>
            <div style="height: 60px; padding: 20px 10px">
              <div style="float: right">
                <b class="font-body" style="color: #558bea; font-size: 15px">
                  >>更多
                </b>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
require('/src/views/style/panel.css')

export default {
  name: 'Index',
  components: {
    PanelGroup
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
//.panel-container {
//  background: #fff;
//  border-radius: 8px;
//  padding: 10px 15px;
//  margin-bottom: 10px;
//  border: 1px solid rgba(0, 0, 0, 0.1)
//}
//
//.panel-icon {
//  font-size: 20px;
//  padding: 0 10px;
//  color: cornflowerblue;
//}
//
//.panel-table-wrapper {
//  padding-top: 4px;
//  background-color: #4b81e0;
//  border-top-left-radius: 10px;
//  border-top-right-radius: 10px;
//
//  .el-table {
//    border-top-left-radius: 6px;
//    border-top-right-radius: 6px
//  }
//}

font-body {
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
}
</style>
