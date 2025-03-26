<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-row :gutter="24">
        <el-col :span="6">ID
          <el-input size="small" disabled v-model="formData.id" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">申请类型
          <el-input size="small" disabled v-model="formData.applyType" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">申请人
          <el-input size="small" disabled v-model="formData.applyUser" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">申请时间
          <el-input size="small" disabled v-model="formData.applyTime" class="form-item"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">备份软件
          <el-input size="small" disabled v-model="formData.backupSoftware" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">客户端名称
          <el-input size="small" disabled v-model="formData.client" class="form-item"></el-input>
        </el-col>
        <el-col :span="6">备份策略
          <el-input size="small" disabled v-model="formData.strategy" class="form-item"></el-input>
        </el-col>
      </el-row>
      <el-row>
        备注
        <el-input disabled class="form-item" type="textarea" :rows="3" />
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>备份信息</span>
      </div>
      <el-collapse :value="1" style="border: 1px solid #f1f1f1; padding: 0 18px">
        <el-collapse-item :name="1">
          <el-row>
            <el-col :span="11">
              <div class="panel-table-wrapper">
                <div class="dire-panel">
                  <el-row class="panel-title"><b class="text">原备份文件或目录</b></el-row>
                  <el-row class="panel-item"><span class="text">/tmp</span></el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="2" style="height: 100%">
              <b style="min-height: 115px" class="opt">
                >>
              </b>
            </el-col>
            <el-col :span="11">
              <div class="panel-table-wrapper">
                <div class="dire-panel">
                  <el-row class="panel-title"><b class="text">变更后备份文件或目录</b></el-row>
                  <el-row class="panel-item"><span class="text">/tmp</span></el-row>
                  <el-row class="panel-item"><span class="text">/var</span></el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
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
  name: "ModifyDirection",
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

