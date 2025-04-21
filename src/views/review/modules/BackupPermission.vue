<template>
  <ApplyDetailTemplate :form-data="formData">
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
  </ApplyDetailTemplate>
</template>

<script>
import { getApplication } from '@/api/review/application'
import { APPLY_TYPE } from '@/views/common/config'
import ApplyDetailTemplate from "./ApplyDetail"

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
  components: {
    ApplyDetailTemplate
  },
  mounted() {
    this.formData.id = this.$route.query.id
    getApplication(this.formData.id).then(resp => {
      const data = resp.data
      this.formData.appType = data.appType
      this.formData.appTypeZh = APPLY_TYPE[data.appType]
      this.formData.appUser = data.appUser
      this.formData.appTime = data.appTime
    })
  },
  methods: {
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

