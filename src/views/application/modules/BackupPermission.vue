<template>
  <ApplyDetailTemplate :form-data="formData">
    <el-row :gutter="24">
      <el-col class="form-item">
        权限类型
      </el-col>
      <el-col class="form-item">
        <el-radio disabled v-model="expiration" :label="1">永久</el-radio>
        <el-radio disabled v-model="expiration" :label="2">非永久</el-radio>
      </el-col>
      <el-col class="form-item" v-if="expiration !== 1">
        <b style="color: red">* </b><b>起止时间：</b>
      </el-col>
      <el-col class="form-item" v-if="expiration !== 1">
        <el-date-picker
          disabled
          v-model="dateRange"
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
import { getPermissionApplication } from '@/api/application/application'
import { APPLY_TYPE } from '@/views/common/config'
import ApplyDetailTemplate from "./ApplyDetail"

export default {
  name: "BackupPermission",
  data: function () {
    return {
      formData: {
        id: undefined,
        backupId: undefined,
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
      backupProgress: 0,
      expiration: undefined,
      dateRange: []
    }
  },
  components: {
    ApplyDetailTemplate
  },
  inject: [ 'getAppBasicInfo' ],
  mounted() {
    this.getAppBasicInfo().then(resp => {
      const data = resp.data
      this.formData.appTypeZh = APPLY_TYPE[data.appType]
      Object.assign(this.formData, data)
      getPermissionApplication(this.formData.id).then(resp => {
        this.expiration = resp.data.expiration
        if (this.expiration === 2) {
          this.dateRange = [resp.data.startTime, resp.data.endTime]
        }
      })
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

