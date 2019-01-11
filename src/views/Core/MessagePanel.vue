<template>
  <div class="message-panel">
    <!--消息容器-->
    <div class="message-header">你有{{data.length}}条信息</div>
    <div class="message-content">
      <div class="message-item" v-for=" item in data" :key=item.key>
        <div class="message-avatar" >
          <img :src="item.avatar"  class="avatar">
          <span class="sender">
            {{item.sender}}
          </span>
          <span class="time"><i class="fa fa-clock-o"></i>{{item.time}}</span>
          <div class="message-content">
            {{item.content}}
          </div>
        </div>
      </div>
      <div class="message-footer">查看我的所有信息</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MessagePanel",
    props:{
      data:{
        type:Array,
        default:()=>[
          {
            key: "1",
            avatar:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1320455237,1432585306&fm=175&app=25&f=JPEG?w=640&h=640&s=6DEAA157534342FD1FF565F20300A032',
            content:'你修改了用户密码',
            sender:'女装大佬',
            time:'5分钟前'
          },
          {
            key: "2",
            avatar:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1320455237,1432585306&fm=175&app=25&f=JPEG?w=640&h=640&s=6DEAA157534342FD1FF565F20300A032',
            content:'今日我又出来装逼了',
            sender:'灵能百分百',
            time:'2小时前'
          },
          {
            key: "3",
            avatar:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1320455237,1432585306&fm=175&app=25&f=JPEG?w=640&h=640&s=6DEAA157534342FD1FF565F20300A032',
            content:'今日25名新成员加入',
            sender:'龙套',
            time:'昨天'
          },
          {
            key: "4",
            avatar:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1320455237,1432585306&fm=175&app=25&f=JPEG?w=640&h=640&s=6DEAA157534342FD1FF565F20300A032',
            content:'生化危机2重制版快发布了',
            sender:'Ada',
            time:'昨天'
          },
          {
            key: "5",
            avatar:'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1320455237,1432585306&fm=175&app=25&f=JPEG?w=640&h=640&s=6DEAA157534342FD1FF565F20300A032',
            content:'您发表了一篇新随笔',
            sender:'小心',
            time:'前天'
          }]
      }
    },
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  .message-panel {
    font-size: 15px;
    width: 300px;
    margin: -12px;
  }
  .message-header {
    padding-left: 10px;
    font-size: 14px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .message-content {
    font-size: 15px;
  }
  .message-item {
    border-color: rgba(180, 190, 190, 0.8);
    border-top-width: 1px;
    border-top-style: solid;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .message-item:hover {
    cursor: pointer;
    background: #b1a6a61e;
  }
  .message-avatar {
    padding-left: 10px;
  }
  .avatar {
    margin-right: 10px;
  }
  .sender {
    font-size: 16px;
    font-weight:bold;
  }
  .time {
    font-size: 12px;
    float: right;
    padding-right: 10px;
  }
  .message-footer {
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-color: rgba(180, 190, 190, 0.8);
    border-top-width: 1px;
    border-top-style: solid;
  }
  .message-footer:hover {
    cursor: pointer;
    background: #b1a6a61e;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 90px;
    float: left;
  }
</style>
