<template>
  <ApplyDetailTemplate :form-data="formData">
  </ApplyDetailTemplate>
</template>

<script>
import { getApplication, getCreateBackupApplication } from '@/api/application/application'
import { APPLY_TYPE } from '@/views/common/config'
import ApplyDetailTemplate from "./ApplyDetail/VMIndex"

export default {
  name: "CreateBackup",
  data: function () {
    return {
      formData: {
        id: undefined,
        backupContent: undefined,
        machineType: undefined,
        dataCenter: undefined,
        backupSoftware: undefined,
        platform: undefined,
        env: undefined,
        vmObjects: [],
        repository: undefined,
        description: undefined,
        costType: undefined,
        costNumber: undefined,
        remark: undefined
      }
    }
  },
  components: {
    ApplyDetailTemplate
  },
  inject: [ 'getAppBasicInfo' ],
  mounted() {
    this.formData.id = this.$route.query.id
    this.getApplicationBasicInfo(this.formData.id)
    this.getBackupInfo(this.formData.id)
  },
  methods: {
    getBackupInfo(appId) {
      getCreateBackupApplication(appId).then(resp => {
        const backupInfo = resp.data
        backupInfo && delete backupInfo.remark
        Object.assign(this.formData, backupInfo)
      })
    },
    getApplicationBasicInfo(appId) {
      this.getAppBasicInfo(appId).then(resp => {
        const data = resp.data
        Object.assign(this.formData, data)
      })
    }
  }
}
</script>

<style scoped>

</style>
