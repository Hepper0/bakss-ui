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
          <el-table-column prop="reviewStatus" label="处理意见">
            <template slot-scope="{ row }">
              <el-tag v-if="row.reviewStatus === 1" type="success">审批同意</el-tag>
              <el-tag v-else-if="row.reviewStatus === 2" type="danger">审批不同意</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="处理时长"></el-table-column>
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
        this.tableData.forEach(r => {
          if (r.reviewStatus && r.reviewTime !== undefined) {
            r.duration = this.prettyDate(parseInt((new Date(r.reviewTime).getTime() - new Date(r.createTime).getTime()) / 1000))
          }
        })
      })
    },
    prettyDate(t) {
      const minute = 60
      const hour = 60 * minute
      const day = 24 * hour
      const d = parseInt(t / day)
      const h = parseInt(t % day / hour)
      const m = parseInt(t % hour / minute)
      const s = parseInt( t % minute)
      return t > minute ? (d ? d + '天' : '') + (h? h + '小时': '') + (m? m+'分钟': '') + (s? s + '秒': '') : t + '秒'
    }
  }
}
</script>

<style scoped>

</style>
