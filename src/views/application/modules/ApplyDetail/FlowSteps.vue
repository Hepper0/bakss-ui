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
              {{ TASK_STATUS_DICT[row.flowStep] || '提交' }}

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
import { TASK_STATUS_DICT } from '@/views/common/config'

export default {
  name: "FlowSteps",
  data: function () {
    return {
      TASK_STATUS_DICT,
      loading: false,
      tableData: []
    }
  },
  props: {
    appId: undefined
  },
  inject: ['getAppBasicInfo'],
  watch: {
    appId: function () {
      this.getFlowByAppId()
    }
  },
  methods: {
    getFlowByAppId() {
      this.loading = true
      this.getAppBasicInfo().then(resp => {
        const appInfo = resp.data
        getFlowByAppId({ appId: this.appId }).then((resp) => {
          this.loading = false
          let tableData = resp.rows
          // 找到当前步骤
          let curOrder = 0
          for(const r of tableData) {
            if (r.reviewStatus === 1) {
              curOrder = r.flowOrder + 1
            } else if(r.reviewStatus === 2){
              curOrder = r.flowOrder
            }
          }
          // 未到的步骤不予显示
          tableData = tableData.filter(r => r.flowOrder <= curOrder)

          const submitStep = { flowStep: '提交', flowOrder: -1, reviewUser: appInfo.appUser, createTime: appInfo.createTime, reviewTime: appInfo.createTime }
          this.tableData = [submitStep, ...tableData]
          this.tableData.forEach(r => {
            if (r.reviewStatus && r.reviewTime !== undefined) {
              r.duration = this.prettyDate(parseInt((new Date(r.reviewTime).getTime() - new Date(r.createTime).getTime()) / 1000))
            }
          })
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
