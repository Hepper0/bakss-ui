<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="10">
      <!-- 最近申请 -->
      <el-col :span="12">
        <div class="panel-container" >
          <div style="margin-bottom: 15px">
            <i class="el-icon-message panel-icon" />
            <b style="font-size: 15px">最近申请</b>
          </div>
          <div>
            <div style="padding-top: 4px; background-color: #4b81e0; border-top-left-radius: 10px; border-top-right-radius: 10px">
              <el-table :data="recentApplications" style="border-top-left-radius: 6px; border-top-right-radius: 6px">
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
            <div style="padding-top: 4px; background-color: #4b81e0; border-top-left-radius: 10px; border-top-right-radius: 10px">
              <el-table :data="recentApplications" style="border-top-left-radius: 6px; border-top-right-radius: 6px">
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
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
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
.panel-container {
  background: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1)
}

.panel-icon {
  font-size: 20px;
  padding: 0 10px;
  color: cornflowerblue;
}

font-body {
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
}
</style>
