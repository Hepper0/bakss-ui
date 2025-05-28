<template>
  <div class="container">
    <el-card class="card-panel">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-panel-content">
        <el-form ref="basicForm" :model="basicFormData" :rules="rules" size="medium" label-width="120px">
          <el-col :span="8">
            <el-form-item label="备份内容" prop="backupContent">
              <el-select v-model="basicFormData.backupContent" :style="{width: '80%'}" @change="onContentChange">
                <el-option v-for="(item, index) in backupContentOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机器类型" prop="machineType" label-width="120px">
              <el-select v-model="basicFormData.machineType" placeholder="请输入任务名称" :disabled="cascadeRule && cascadeRule['machineType'] !== undefined" :style="{width: '80%'}">
                <el-option v-for="(item, index) in machineTypeOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据中心" prop="dataCenter">
              <el-select v-model="basicFormData.dataCenter" :style="{width: '80%'}">
                <el-option v-for="(item, index) in dataCenterOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="环境" prop="env">
              <el-select v-model="basicFormData.env" :style="{width: '80%'}">
                <el-option v-for="(item, index) in envOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作系统类型" prop="platform" label-width="120px">
              <el-select v-model="basicFormData.platform" :style="{width: '80%'}" :disabled="cascadeRule && cascadeRule['platform'] !== undefined">
                <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备份软件" prop="backupSoftware" :disabled="cascadeRule && cascadeRule['backupSoftware'] !== undefined">
              <el-select v-model="basicFormData.backupSoftware" :style="{width: '80%'}">
                <el-option v-for="(item, index) in backupSoftwareOptions" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "detail"
}
</script>

<style scoped>

</style>
