<template>
  <VMIndex :form-data="formData">
  </VMIndex>
</template>

<script>
import { getApplication, getCreateBackupApplication } from '@/api/application/application'
import VMIndex from "./ApplyDetail/VMIndex"

export default {
  name: "CreateBackup",
  data: function () {
    return {
      formData: {
        id: undefined,
        backupContent: undefined,
        jobType: undefined,
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
    VMIndex
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
        backupInfo && delete backupInfo.id
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
