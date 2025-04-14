<template>
  <div>
    permission
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="form-item">ID</div>
          <el-input size="small" disabled v-model="formData.id" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">
          <div class="form-item">申请类型</div>
          <el-input size="small" disabled v-model="formData.appTypeZh" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">
          <div class="form-item">申请人</div>
          <el-input size="small" disabled v-model="formData.appUser" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">
          <div class="form-item">申请时间</div>
          <el-input size="small" disabled v-model="formData.appTime" class="form-item"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="24">
          <el-col class="form-item">
            权限类型
          </el-col>
          <el-col class="form-item">
            <el-radio disabled v-model="formData.expiration" label="forever">永久</el-radio>
            <el-radio disabled v-model="formData.expiration" label="temporary">非永久</el-radio>
          </el-col>
        <el-col class="form-item">
          <b style="color: red">* </b><b>起止时间：</b>
        </el-col>
        <el-col class="form-item" v-show="formData.expiration !== 'forever'">
          <el-date-picker
            disabled
            v-model="formData.dateRange"
            size="mini"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 500px"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <div class="form-item">备注</div>
        <el-input disabled class="form-item" type="textarea" :rows="3" />
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>客户端信息</span>
      </div>
      <el-collapse :value="1" style="border: 1px solid #f1f1f1; padding: 0 18px">
        <el-collapse-item :name="1">
          <el-table v-loading="loading" size="mini" :data="tableData" @selection-change="handleSelectionChange" stripe>
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
    <el-card>
      <div slot="header" class="clearfix">
        <span>审批流信息</span>
      </div>
      <el-collapse :value="1" style="border: 1px solid #f1f1f1; padding: 0 18px">
        <el-collapse-item :name="1">
          <el-table v-loading="loading" size="mini" :data="tableData" @selection-change="handleSelectionChange" stripe>
            <el-table-column prop="taskName" label="任务名称"></el-table-column>
            <el-table-column prop="reviewUser" label="执行人"></el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column prop="reviewStatus" label="处理意见"></el-table-column>
            <el-table-column prop="duration" label="处理时间"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { getApplication } from '@/api/review/application'
import { APPLY_TYPE } from '@/views/common/config'
const BACKUP_TYPE_SCHEDULER = 1
const BACKUP_TYPE_ONCE = 2

const backupTypeMap = {
  1: '定时备份',
  2: '一次性备份'
}

export default {
  name: "BackupPermission",
  data: function () {
    return {
      formData: {
        id: 1,
        appType: undefined,
        appTypeZh: undefined,
        appUser: undefined,
        appTime: undefined,
        backupSoftware: undefined,
        backupType: undefined,
        backupDate: undefined,
        backupStatus: undefined,
        client: undefined,
        strategy: undefined
      },
      backupProgress: 0
    }
  },
  mounted() {
    this.formData.id = this.$route.query.id
    this.formData.appType = this.$route.query.taskType
    this.formData.appTypeZh = APPLY_TYPE[this.$route.query.taskType]
    getApplication(this.formData.id).then(resp => {
      const data = resp.data
      this.formData.appUser = data.appUser
      this.formData.appTime = data.appTime
    })

  },
  methods: {
    back() {
      window.history.back()
    },
    cancel() {
      this.$confirm('确定取消备份申请吗？', '提示', { type: 'warning' }).then(() => {
        // todo api
      })
    }
  }
}
</script>

<style scoped>
.form-item {
  width: 100%;
  margin: 0 0 10px 0;
}

.header {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f1f1f1
}

.dire-panel {
  min-height: 115px; width: 100%; background-color: white; border: 2px solid #f1f1f1
}

.panel-title {
  background-color: #f1f1f1; padding: 7px 10px; border-bottom: 1px solid #f1f1f1
}

.panel-item {
  padding: 7px 10px; border-bottom: 1px solid #f1f1f1
}


.opt {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
</style>

