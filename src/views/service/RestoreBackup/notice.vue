<template>
  <div class="container">
    <div class="tips">创建备份前，请仔细阅读以下须知</div>
    <el-collapse>
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
      <el-collapse-item title="MYSQL创建恢复须知">
        <div class="item-panel">
          <el-row class="item">1.请提供需要进行备份的源机器的IP与主机名</el-row>
          <el-row class="item">2.请配置8.0版本xtrabackup路径为/bin/xtrabackup,5.7版本xtrabackup路径为/bin/innobackupex</el-row>
          <el-row class="item">3.mycnf文件需要配置以下属性:</el-row>
          <el-row class="item sub">socket=/usr/local/mysql/mysql.sock</el-row>
          <el-row class="item sub">datadir=/data/mysql/data/</el-row>
          <el-row class="item sub">log-bin=data/mysql/log/mysql-bin</el-row>
          <el-row class="item">4.操作系统层需要增加mysql的全局变量，例如:usr/local/mysq/bin/mysql.</el-row>
          <el-row class="item">5.登录该机器与连按数据库的踹口附有默认值，用户可依据实际情况进行修改。</el-row>
          <el-row class="item">6.请确认提供的MySQL账号拥有备份权限,否则无法进行备份。</el-row>
          <el-row class="item">7.提供的MySQL备份账号需要本地127.0.0.1登录权限</el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="PostgreSQL创建恢复须知">
        <div class="item-panel">
          <el-row class="item">1.请提供需要进行备份的源机器的IP与主机名。</el-row>
          <el-row class="item">2.请创建名为postgres的操作系统账号，以postgres账号安装数据库,并赋予postgres账号备份文件的权限.</el-row>
          <el-row class="item">3.pg_hba.conf文件配置本地账号postgre登录不需要输入密码，配置内容如下:</el-row>
          <el-row class="item sub">host all all 127.0.0.1/32 trust</el-row>
          <el-row class="item sub">host replication all 127.0.0.1/32 trust</el-row>
          <el-row class="item">4.请提供postgreSQl安装目录,如/data/postgres/bin.</el-row>
          <el-row class="item">5.请提供postgreSQL归档目录，如/data/postgres/archive_log.</el-row>
          <el-row class="item">6.数据库的端口附有默认值，用户可依据实际情况进行修改。</el-row>
          <el-row class="item">7.请参考联想提供的PostgreSQL数据库交付标准，确保数据库相关路径一致，</el-row>
          <el-row class="item">8.请确保提交备份的节点是数据库主节点，备节点不允许执行备份。</el-row>
          <el-row class="item">9.请开启数据库archive_mode参数，否则无法备份日志。</el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="Oracle创建恢复须知">
        <div class="item-panel">
          <el-row class="item">1.请提供需要进行备份的源机器的IP、主机名与Oracle实例名，以便准确定位到需要备份的数据库实例。</el-row>
          <el-row class="item">2.请提供需要备份的源机上Oracle的账号，以在创建备份过程中，在备份软件NetBackUp上创建link。</el-row>
          <el-row class="item">3.登录该机器与连接数据库的端口附有默认值，用户可依据实际情况进行修改。</el-row>
          <el-row class="item">4.数据库的open mode范围为 READ WRITE、MOUNTED|READ ONLY WITH APPLY、READ ONLY 其余模式无法创建备份</el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="SQL Server创建恢复须知">
        <div class="item-panel">
          <el-row class="item">1. 请选择该SQLServer的节点数量，以支持AlwaysOn架构</el-row>
          <el-row class="item">2. 请提供需要进行备份的各节点IP、主机名与SQLServer实例名，以便准确定位到需要备份的数据库实例。</el-row>
          <el-row class="item">3. 某些参数附有默认值，用户可依据实际情况进行修改。</el-row>
          <el-row class="item">4. 多节点SQL Server创建备份，如果设置了可用性组监听，必须输入监听名称，否则无法使用vip备份。</el-row>
          <el-row class="item">5. 数据库用户 NT AUTHORITY\SYSTEM 需要给sysadmin 的角色，Netbackup备份、恢复时配置相关参数使用。</el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="HANA创建恢复须知">
        <div class="item-panel">
          <el-row class="item">1. 本平台暂时仅支持Hana backint方式的创建备份。</el-row>
          <el-row class="item">2. 请提供需要进行备份的源机器的IP、主机名与Hana实例名，以便准确定位到需要备份的数据库实例。</el-row>
          <el-row class="item">3. 们请提供需要备份的源机上的Hana用户名与密码，以便通过认证。</el-row>
          <el-row class="item">4. 某些参数附有默认值，用户可依据实际情况进行修改。</el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="文件系统创建恢复须知">
        <div class="item-panel">
          <el-row class="item">1.请提供恢复目标机与备份源机的IP与客户端名。</el-row>
          <el-row class="item">2.请根据开始时间与结束时间筛选该段时间内的备份，并添加至恢复目录。目标恢复可手动修改。</el-row>
        </div>
      </el-collapse-item>
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
