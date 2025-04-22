<template>
  <div>
    backup once
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-row :gutter="24">
        <el-col :span="6">ID
          <el-input disabled v-model="formData.id" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">申请类型
          <el-input size="small" disabled v-model="formData.appTypeZh" class="form-item"></el-input></el-col>
        <el-col :span="6">申请人
          <el-input size="small" disabled v-model="formData.appUser" class="form-item"></el-input></el-col>
        <el-col :span="6">申请时间
          <el-input size="small" disabled v-model="formData.appTime" class="form-item"></el-input></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">备份软件
          <el-input size="small" disabled v-model="formData.backupSoftware" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">备份内容
          <el-input size="small" disabled v-model="formData.backupType" class="form-item"></el-input></el-col>
        <el-col :span="6">备份时间
          <el-input size="small" disabled v-model="formData.backupDate" class="form-item"></el-input></el-col>
        <el-col :span="6">备份状态
          <el-input size="small" disabled v-model="formData.backupStatus" class="form-item"></el-input></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">客户端名称
          <el-input size="small" disabled v-model="formData.client" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">备份策略
          <el-input size="small" disabled v-model="formData.strategy" class="form-item"></el-input></el-col>
        <el-col :span="6">调度名称
          <el-input size="small" disabled v-model="formData.dispatch" class="form-item"></el-input></el-col>
        <el-col :span="6">备份进度
          <el-progress :percentage="backupProgress" />
        </el-col>
      </el-row>
      <el-row>
        备注
        <el-input v-model="formData.remark" disabled class="form-item" type="textarea" :rows="3" />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getApplication } from '@/api/application/application'
import { APPLY_TYPE } from '@/views/common/config'

const BACKUP_TYPE_SCHEDULER = 1
const BACKUP_TYPE_ONCE = 2

const backupTypeMap = {
  1: '定时备份',
  2: '一次性备份'
}

export default {
  name: "BackupOnce",
  data: function () {
    return {
      formData: {
        id: 1,
        appType: undefined,
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
    getApplication(this.formData.id).then(resp => {
      const data = resp.data
      this.formData.appType = data.appType
      this.formData.appTypeZh = APPLY_TYPE[data.appType]
      this.formData.appUser = data.appUser
      this.formData.appTime = data.appTime
      this.formData.remark = data.remark
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.form-item {
  width: 100%;
  margin: 10px 0 15px 0;
}

.header {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  margin-top: 20px;
  padding-bottom: 15px;
  /*border-bottom: 1px solid #f1f1f1*/
}

</style>
