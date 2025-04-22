<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="form-item">ID</div>
        <el-input size="small" disabled v-model="formData.id" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">申请类型</div>
        <el-input size="small" disabled v-model="formData.appTypeZh" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">申请人</div>
        <el-input size="small" disabled v-model="formData.appUser" class="form-item"></el-input>
      </el-col>
      <el-col :span="6">
        <div class="form-item">申请时间</div>
        <el-input size="small" disabled v-model="formData.appTime" class="form-item"></el-input>
      </el-col>
    </el-row>
    <slot>
    </slot>
    <el-row>
      <div class="form-item">备注</div>
      <el-input disabled v-model="formData.remark" class="form-item" type="textarea" :rows="3" />
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "ApplyInfo",
  props: {
    formData: {
      type: Object,
      default: function () {
        return {
          id: undefined,
          appTypeZh: undefined,
          appUser: undefined,
          appTime: undefined,
          remark: undefined
        }
      }
    },
  }
}
</script>

<style scoped>
.form-item {
  width: 100%;
  margin: 0 0 10px 0;
}

</style>
