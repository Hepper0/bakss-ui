<template>
  <ApplyDetailTemplate :form-data="formData">
  </ApplyDetailTemplate>
</template>

<script>
import { getApplication } from '@/api/application/application'
import { APPLY_TYPE } from '@/views/common/config'
import ApplyDetailTemplate from "./ApplyDetail"

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
        backupId: undefined,
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
  inject: [ 'getAppBasicInfo' ],
  mounted() {
    this.getAppBasicInfo().then(resp => {
      const data = resp.data
      this.formData.appTypeZh = APPLY_TYPE[data.appType]
      Object.assign(this.formData, data)
    })
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
