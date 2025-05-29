<template>
  <div class="container">
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-panel-content">
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
            <el-form-item label="备份任务" prop="backupContent">
              <el-select v-model="formData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="备份列表" prop="backupContent">
              <el-select v-model="formData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="备份ID" prop="backupContent">
              <el-select v-model="formData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="虚机" prop="backupContent">
              <el-select v-model="formData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="还原点" prop="backupContent">
              <el-select v-model="formData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="还原点" prop="vmPoint">
              <el-select v-model="formData.vmPoint" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="还原模式" prop="restoreMode">
              <el-select v-model="formData.restoreMode" :style="{width: '80%'}" @change="onContentChange">
                <el-option label="还原到原位置" :value="1" />
                <el-option label="还原到新的位置" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="还原虚机名称" prop="restoreMode">
              <el-input v-model="formData.vmName"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="主机" prop="host">
              <el-input :style="{width: '80%'}" v-model="formData.host"></el-input>
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
        <el-checkbox v-model="formData.redirectWriteCache">重定向写缓存</el-checkbox>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="数据存储" prop="dataStoreName">
              <el-input :style="{width: '80%'}" v-model="formData.dataStoreName"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="是否开机" prop="dataStoreName">
              <el-input :style="{width: '80%'}" v-model="formData.dataStoreName"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form ref="basicForm" :model="formData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="16">
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
        restoreMode: undefined
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

</style>
