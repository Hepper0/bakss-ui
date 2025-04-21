<template>
<!--  <div>-->
<!--    modify directory-->
<!--    <el-card>-->
<!--      <div slot="header" class="clearfix">-->
<!--        <span>基本信息</span>-->
<!--      </div>-->
<!--      <el-row :gutter="24">-->
<!--        <el-col :span="6">ID-->
<!--          <el-input size="small" disabled v-model="formData.id" class="form-item"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">申请类型-->
<!--          <el-input size="small" disabled v-model="formData.appType" class="form-item"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">申请人-->
<!--          <el-input size="small" disabled v-model="formData.appUser" class="form-item"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">申请时间-->
<!--          <el-input size="small" disabled v-model="formData.appTime" class="form-item"></el-input>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row :gutter="24">-->
<!--        <el-col :span="6">备份软件-->
<!--          <el-input size="small" disabled v-model="formData.backupSoftware" class="form-item"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">客户端名称-->
<!--          <el-input size="small" disabled v-model="formData.client" class="form-item"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="6">备份策略-->
<!--          <el-input size="small" disabled v-model="formData.strategy" class="form-item"></el-input>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        备注-->
<!--        <el-input disabled class="form-item" type="textarea" :rows="3" />-->
<!--      </el-row>-->
<!--    </el-card>-->
<!--    <el-card>-->
<!--      <div slot="header" class="clearfix">-->
<!--        <span>备份信息</span>-->
<!--      </div>-->
<!--      <el-collapse :value="1" style="border: 1px solid #f1f1f1; padding: 0 18px">-->
<!--        <el-collapse-item :name="1">-->
<!--          <el-row>-->
<!--            <el-col :span="11">-->
<!--              <div class="panel-table-wrapper">-->
<!--                <div class="dire-panel">-->
<!--                  <el-row class="panel-title"><b class="text">原备份文件或目录</b></el-row>-->
<!--                  <el-row class="panel-item"><span class="text">/tmp</span></el-row>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="2" style="height: 100%">-->
<!--              <b style="min-height: 115px" class="opt">-->
<!--                >>-->
<!--              </b>-->
<!--            </el-col>-->
<!--            <el-col :span="11">-->
<!--              <div class="panel-table-wrapper">-->
<!--                <div class="dire-panel">-->
<!--                  <el-row class="panel-title"><b class="text">变更后备份文件或目录</b></el-row>-->
<!--                  <el-row class="panel-item"><span class="text">/tmp</span></el-row>-->
<!--                  <el-row class="panel-item"><span class="text">/var</span></el-row>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </el-collapse-item>-->
<!--      </el-collapse>-->
<!--    </el-card>-->
<!--  </div>-->
  <ApplyDetailTemplate :form-data="formData">
    <template #default>
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
    </template>
    <template #additional>
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
    </template>
  </ApplyDetailTemplate>
</template>

<script>
import ApplyDetailTemplate from "./ApplyDetail"
import { APPLY_TYPE } from '@/views/common/config'
import { getApplication } from '@/api/review/application'

export default {
  name: "ModifyDirectory",
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

