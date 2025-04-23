<template>
  <ApplyDetailTemplate :form-data="formData">
  </ApplyDetailTemplate>
</template>

<script>
import ApplyDetailTemplate from "./ApplyDetail"
import { APPLY_TYPE } from '@/views/common/config'
import { getApplication } from '@/api/application/application'

export default {
  name: "Strategy",
  data: function () {
    return {
      formData: {
        id: 1,
        appType: undefined,
        appTypeZh: undefined,
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
  mounted() {
    this.formData.id = this.$route.query.id
    getApplication(this.formData.id).then(resp => {
      const data = resp.data
      // this.formData.appType = data.appType
      this.formData.appTypeZh = APPLY_TYPE[data.appType]
      // this.formData.appUser = data.appUser
      // this.formData.appTime = data.appTime
      // this.formData.remark = data.remark
      Object.assign(this.formData, data)
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
