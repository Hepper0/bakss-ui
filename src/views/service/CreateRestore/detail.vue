<template>
  <div class="container">
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-panel-content">
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="备份内容" prop="backupContent">
                <el-select v-model="formData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                  <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="备份任务" prop="jobName">
                <el-select v-model="formData.jobName" :style="{width: '80%'}" @change="onJobChange">
                  <el-option v-for="(item, index) in backupJobOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>备份信息</span>
      </div>
      <div class="card-panel-content">
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="虚机" prop="vmName">
                <el-select disabled v-model="formData.vmName" :style="{width: '80%'}" @change="onContentChange">
                  <el-option v-for="(item, index) in vmOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="备份" prop="backupId">
                <el-select v-model="formData.backupId" :style="{width: '80%'}" @change="onBackupChange">
                  <el-option v-for="(item, index) in backupOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="还原点" prop="pointId">
                <el-select v-model="formData.pointId" :style="{width: '80%'}" @change="onPointChange">
                  <el-option v-for="(item, index) in pointOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="还原模式" prop="restoreMode">
                <el-select v-show="false" v-model="formData.restoreMode" :style="{width: '80%'}">
                  <el-option label="还原到原位置" :value="1" />
                  <el-option label="还原到新的位置" :value="2" />
                </el-select>
                <el-radio-group size="small" v-model="formData.restoreMode">
                  <el-radio-button :label="1" name="original">还原到原位置</el-radio-button>
                  <el-radio-button :label="2" name="new">还原到新的位置</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row v-show="formData.restoreMode === 2">
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="主机" prop="host">
                <el-select v-model="formData.host" :style="{width: '80%'}" @change="onContentChange">
                  <el-option v-for="(item, index) in hostOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="目录" prop="vmFolder">
                <el-input :style="{width: '80%'}" v-model="formData.vmFolder"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="资源池" prop="resourcePool">
                <el-input :style="{width: '80%'}" v-model="formData.resourcePool"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item prop="redirectWriteCache">
                <el-checkbox v-model="formData.redirectWriteCache">重定向写缓存</el-checkbox>
              </el-form-item>
            </el-col>
          </el-form>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="8">
              <el-form-item label="数据存储" prop="datastoreName">
                <el-select :disabled="!formData.redirectWriteCache" :style="{width: '80%'}" v-model="formData.datastoreName">
                  <el-option v-for="(item, index) in datastoreOptions" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
            <el-form-item>
              <el-checkbox v-model="formData.powerUp">是否开机</el-checkbox>
              <el-checkbox v-model="formData.nicsEnabled">是否联网</el-checkbox>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </el-card>
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>其他信息</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="24">
            <el-form-item label="申请理由" prop="reason">
              <el-input :style="{width: '80%'}" :rows="5" type="textarea" v-model="formData.reason"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "detail",
  data: function () {
    return {
      formData: {
        backupId: undefined,
        pointId: undefined,
        restoreMode: 1,
        restoreVMtags: undefined,
        vmName: undefined,
        host: undefined,
        vmFolder: undefined,
        resourcePool: undefined,
        datastoreName: undefined,
        redirectWriteCache: false,
        enableAntivirusScan: false,
        virusDetectionAction: undefined,
        enableEntireVolumeScan: false,
        reason: undefined,
        nicsEnabled: true,
        powerUp: true,
      }
    }
  },
  computed: {
    backupContentOptions: function () {
      return this.getConfig('backupContent')
    },
  },
  methods: {
    onContentChange() {

    },
    getConfig(type) {
      return this.$store.getters[type] && this.$store.getters[type].map(r => {
        return { label: r.dictLabel, value: r.dictValue }
      })
    }
  }
}
</script>

<style scoped>
.card-panel {
  margin-bottom: 10px;
}

.card-panel-content {
  padding: 0 40px;
}
</style>
