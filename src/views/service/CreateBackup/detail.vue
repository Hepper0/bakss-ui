<template>
  <div class="container">
    <div class="panel-container">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="8">
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入任务名称" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="虚机" prop="vmObjects">
              <el-select v-model="formData.vmObjects" placeholder="请选择虚机" multiple clearable
                         :style="{width: '100%'}">
                <el-option v-for="(item, index) in vmObjectsOptions" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库" prop="repository">
              <el-select v-model="formData.repository" placeholder="请选择仓库" clearable
                         :style="{width: '100%'}">
                <el-option v-for="(item, index) in repositoryOptions" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="任务描述" prop="field103">
              <el-input v-model="formData.description" type="textarea" placeholder="请输入多行文本"
                        :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="form-item">
        <el-col :span="3" class="form-title">
          <b style="color: red">* </b><b>申请理由：</b>
        </el-col>
        <el-col :span="21">
          <el-input v-model="reason" style="width: 500px" type="textarea" :rows="5" />
        </el-col>
      </el-row>
      <el-row style="display: flex; justify-content: right">
        <el-button @click="resetForm" size="small" type="primary">重置</el-button>
        <el-button @click="submitForm" size="small" type="success">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getHostEntity } from '@/api/veeam/host'
import { listRepository } from '@/api/veeam/repository'
import { createJob } from '@/api/veeam/job'
import { applyCreateBackup } from '@/api/application/apply'
import { CREATE_BACKUP } from '@/views/common/config'

export default {
  name: "detail",
  data: function () {
    return {
      reason: undefined,
      formData: {
        name: undefined,
        vmObjects: [],
        repository: undefined,
        description: undefined
      },
      vmObjectDataList: [],
      repositoryDataList: [],
      vmObjectsOptions: [{ label: '虚机1', value: 'vm1'}, { label: '虚机2', value: 'vm2'}, { label: '虚机3', value: 'vm3'},],
      repositoryOptions: [{ label: '仓库1', value: 'repository1'}, { label: '仓库2', value: 'repository2'},],
      rules: {
        name: [{
          required: true,
          message: '请输入任务名称',
          trigger: 'blur'
        }],
        vmObjects: [{
          required: true,
          type: 'array',
          message: '请至少选择一个vmObjects',
          trigger: 'change'
        }],
        repository: [{
          required: true,
          message: '请选择仓库',
          trigger: 'blur'
        }],
        field103: [{
          required: true,
          message: '请输入任务描述',
          trigger: 'blur'
        }],
      }
    }
  },
  mounted() {
    // getHostEntity().then(resp => {
    //   this.vmObjectDataList = resp.rows
    // })
    //
    // listRepository().then(resp => {
    //   this.repositoryDataList = resp.rows
    // })
  },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.formData['reason'] = this.reason
        this.formData['appType'] = CREATE_BACKUP
        applyCreateBackup(this.formData).then((resp) => {
          this.$message.success("提交成功！")
        })
      })
    },
    resetForm() {
      this.formData = {
        name: undefined,
          vmObjects: [],
          repository: undefined,
          description: undefined
      }
    },
    validate() {

    },
  }
}
</script>

<style scoped>

</style>
