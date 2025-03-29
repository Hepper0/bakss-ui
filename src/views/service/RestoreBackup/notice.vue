<template>
  <div class="container">
    <div class="tips">创建备份前，请仔细阅读以下须知</div>
    <el-collapse :value="1">
      <el-collapse-item :name="1" title="环境配置">
        <div class="item-panel">
          <el-row class="item">1.对于操作系统类型为Linux的恢复目标机，请提供拥有 sudo权限 的操作系统账号与密码，以便本平台登录到该机器执行创建备份。</el-row>
          <el-row class="item">2.对于操作系统类型为Linux的恢复目标机，请将/etc/sudoers 文件中 Default requiretty 注释。</el-row>
          <el-row class="item">3.对于操作系统类型为Windows的恢复目标机，请提供拥有 管理员权限 的操作系统账号与密码，以便本平台登录到该机器执行创建备份。</el-row>
          <el-row class="item">4.对于操作系统类型为Windows的恢复目标机，请确保该服务器上的 WnRM服务已打开，以便本平台远程登录该服务器。打开WnRM服务的操作命令如下，请在该机器的cmnd终端以管理员方式执行。</el-row>
          <el-row class="item sub">1)初始化WinRm: winrm guickconfig</el-row>
          <el-row class="item sub">2)配置登陆方式:winrm set winrm/config/service/auth @{Basic="true"}</el-row>
          <el-row class="item sub">3)配雪加密方式:winrm set winrm/config/service @fAllowUnencrypted="true"</el-row>
          <el-row class="item">5.创建基于NetBackup的备份时，如为Linyx操作系统的机器，请确保该机器的RedHat操作系统版本在7以上，否则无法安装最新版本的备份软件,</el-row>
          <el-row class="item">6.如果机器已经安装旧版本NetBackup和NetWorker，请备份管理员手动卸载后再次提交</el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item :name="2" title="恢复须知">
        <div class="item-panel">
          <el-row class="item">1.请确保选择的恢复目标机能够支持恢复需要进行恢复的备份内容，源机与恢复目标机的版本匹配问题请您提前确认</el-row>
          <el-row class="item">2.请确保填写的恢复目标机相关信息如机器类型、所在数据中心、所用于的环境等信息:准确无误，因为其中某一项信息的变化都可能导致所涉及的备份软件与恢复方式不同，如填写错误可能导致执行失败。</el-row>
          <el-row class="item">3.请认真填写创建恢复表单中的各项必填参数，各必填项都是在执,行创建恢复过程的某一步骤中所必需的，各参数的具体用处与描述，后续将针对不同的恢复内容加以详细解释。</el-row>
          <el-row class="item">4.创建恢复将触发审批流，由备份管理员进行审批，请您悉知。</el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="MYSQL创建恢复须知"></el-collapse-item>
      <el-collapse-item title="PostgreSQL创建恢复须知"></el-collapse-item>
      <el-collapse-item title="Oracle创建恢复须知"></el-collapse-item>
    </el-collapse>
    <el-row style="width: 100%;text-align: center; margin: 10px 0">
      <el-button @click="next" :disabled="count !== 0" style="width: 300px">申请 <span v-show="count !== 0">{{ ` (${count})`}}</span></el-button>
    </el-row>
    <el-row style="width: 100%; display: flex; justify-content: center">
      <div v-show="false" class="circle">{{ count }}</div>
      <el-checkbox v-model="checked" style="margin: 3px 3px" :disabled="count !== 0">
        <el-text>我已仔细阅读并接受以上条件</el-text>
      </el-checkbox>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      count: 10,
      checked: false
    }
  },
  mounted() {
    this.countdown()
  },
  methods: {
    countdown() {
      if (this.count > 0) {
        setTimeout(() => {
          this.count -= 1
          this.countdown()
        }, 1000)
      } else {
        return
      }
    },
    next() {
      if (!this.checked) {
        this.$message.warning('sdfsadfsa')
        return
      }
      this.$emit('next')
    }
  }
}
</script>

<style scoped>
.item {
  padding: 3px;
}

.sub {
  margin-left: 15px;
}

.item-panel {
  padding: 20px 40px 0 40px;
  border-top: 1px solid #e1e1e1
}

.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  color: white;
  background-color: #faa94b;
  border: 1px solid #c1c1c1;
  margin: 0 3px;
}

.tips {
  height: 40px;
  width: 100%;
  padding: 0 20px;
  font-size: 14px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #fffbe6;
  margin-bottom: 10px;
  border: 2px solid #fbeda3;
}
</style>
