<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-row :gutter="24">
        <el-col :span="6">ID
          <el-input disabled v-model="formData.id" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">申请类型
          <el-input disabled v-model="formData.applyType" class="form-item"></el-input></el-col>
        <el-col :span="6">申请人
          <el-input disabled v-model="formData.applyUser" class="form-item"></el-input></el-col>
        <el-col :span="6">申请时间
          <el-input disabled v-model="formData.applyTime" class="form-item"></el-input></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">备份软件
          <el-input disabled v-model="formData.backupSoftware" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">备份内容
          <el-input disabled v-model="formData.backupType" class="form-item"></el-input></el-col>
        <el-col :span="6">备份时间
          <el-input disabled v-model="formData.backupDate" class="form-item"></el-input></el-col>
        <el-col :span="6">备份状态
          <el-input disabled v-model="formData.backupStatus" class="form-item"></el-input></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">客户端名称
          <el-input disabled v-model="formData.client" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">备份策略
          <el-input disabled v-model="formData.strategy" class="form-item"></el-input></el-col>
        <el-col :span="6">调度名称
          <el-input disabled v-model="formData.dispatch" class="form-item"></el-input></el-col>
        <el-col :span="6">备份进度
          <el-progress :percentage="backupProgress" />
        </el-col>
      </el-row>
      <el-row>
        备注
        <el-input disabled class="form-item" type="textarea" :rows="3" />
      </el-row>
      <div class="header" style="">
        <span>操作区</span>
      </div>
      <div style="margin-top: 15px">
        <el-button @click="cancel" style="color: orangered">取消备份申请</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>

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
        applyType: backupTypeMap[BACKUP_TYPE_ONCE],
        applyUser: undefined,
        applyTime: undefined,
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
  margin: 10px 0 15px 0;
}

.header {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  margin-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f1f1f1
}

</style>
