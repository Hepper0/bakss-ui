<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>审批流信息</span>
    </div>
    <el-collapse :value="1" style="border: 1px solid #f1f1f1; padding: 0 18px">
      <el-collapse-item :name="1">
        <el-table v-loading="loading" size="mini" :data="tableData" stripe>
          <el-table-column prop="flowStep" label="任务名称">
            <template slot-scope="{ row }">
              {{ row.flowStep }}
            </template>
          </el-table-column>
          <el-table-column prop="reviewUser" label="执行人"></el-table-column>
          <el-table-column prop="createTime" label="开始时间"></el-table-column>
          <el-table-column prop="reviewTime" label="结束时间"></el-table-column>
          <el-table-column prop="reviewStatus" label="处理意见"></el-table-column>
          <el-table-column prop="duration" label="处理时间"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import { getFlowByAppId } from '@/api/application/flow'

export default {
  name: "FlowSteps",
  data: function () {
    return {
      loading: false,
      tableData: []
    }
  },
  props: {
    appId: undefined
  },
  watch: {
    appId: function () {
      this.getFlowByAppId()
    }
  },
  methods: {
    getFlowByAppId() {
      this.loading = true
      getFlowByAppId({ appId: this.appId }).then((resp) => {
        this.loading = false
        this.tableData = resp.rows
      })
    }
  }
}
</script>

<style scoped>

</style>
