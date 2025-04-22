<template>
  <div class="panel-container">
    <el-row>
      <i class="el-icon-view panel-icon"></i>
      <b style="font-size: 15px">总览</b>
    </el-row>
    <el-row :gutter="24" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel container" @click="gotoApply()">
          <el-row style="width: 100%; text-align: center">
            <el-row>
              <count-to :start-val="0" :end-val="applyCount" :duration="1500" class="panel-num-font"/>
<!--              <span class="panel-num-font">{{  }}</span>-->
            </el-row>
            <el-row>
              <span class="panel-title-font">我的申请</span>
            </el-row>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel container" style="background-color: #bb0dbbc7" @click="gotoPending()">
          <el-row style="width: 100%; text-align: center;">
            <el-row>
              <count-to :start-val="0" :end-val="pendingCount" :duration="1500" class="panel-num-font"/>
            </el-row>
            <el-row>
              <span class="panel-title-font">我的待审批的申请</span>
            </el-row>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel container" style="background-color: #0b990bdb" @click="gotoClient()">
          <el-row style="width: 100%; text-align: center">
            <el-row>
              <count-to :start-val="0" :end-val="clientCount" :duration="1500" class="panel-num-font"/>
            </el-row>
            <el-row>
              <span class="panel-title-font">我的备份客户端</span>
            </el-row>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel container" style="background-color: #e56001eb" @click="gotoTask()">
          <el-row style="width: 100%; text-align: center">
            <el-row>
              <count-to :start-val="0" :end-val="taskCount" :duration="1500" class="panel-num-font"/>
            </el-row>
            <el-row>
              <span class="panel-title-font">我的任务</span>
            </el-row>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  data: function () {
    return {
    }
  },
  components:{
    CountTo
  },
  props: {
    applyCount: {
      type: Number,
      default: 0
    },
    pendingCount: {
      type: Number,
      default: 0
    },
    clientCount: {
      type: Number,
      default: 0
    },
    taskCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick(type) {
      this.$emit('clickPanel', type)
    },
    gotoApply() {
      this.goto('application')
    },
    gotoPending() {
      this.goto('task', { taskType: 'todo' })
    },
    gotoClient() {
      this.goto('service/backup')
    },
    gotoTask() {
      this.goto('task')
    },
    goto(fn, query) {
      this.$router.push({ path: '/' + fn, query})
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  align-items: center;
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 12px;
  }

  .card-panel {
    height: 88px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #4b81e0;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border-bottom-right-radius: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 10px;

    .panel-index-font {
      font-size: 36px;
      color: #ff0000e6;
    }

    .panel-num-font {
      font-size: 27px;
      color: #ffffffe6;
    }

    .panel-title-font {
      color: #ffffffe6;
      font-style: initial;
    }

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
<style>
.panel-container {
  background: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1)
}

.panel-icon {
  font-size: 20px;
  padding: 0 10px;
  color: cornflowerblue;
}
</style>
