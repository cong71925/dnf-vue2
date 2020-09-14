<template>
  <el-card>
    <h2>更新日志</h2>
    <el-divider></el-divider>
    <el-timeline>
      <el-timeline-item timestamp="2020/7/21" placement="top">
        <el-card>
          <h4>更新到V0.5</h4>
          <p>重构了整个项目，后端使用thinkPHP6重新开发</p>
          <p>界面排版进行了优化</p>
          <p>个人中心页面新增了角色类型分布显示</p>
          <p>团队详情页面新增了角色类型分布显示和职业系分布图表</p>
          <p>角色总览页面新增了条形图显示功能，原有的表格也新增了所属成员和职业的筛选</p>
          <p>更新了项目依赖</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/11/8" placement="top">
        <el-card>
          <h4>更新到V0.4</h4>
          <p>新增了唱歌，偏爱开关，在角色管理页面，团队角色和历史数据页面可以随时切换查看唱歌偏爱后的buff数值和对C提升率</p>
          <p>更新了团队成员功能，现在可以看到团队的历史数据了</p>
          <p>更新了团队角色功能，现在可以根据神思者，炽天使，冥月女神这三个职业进行筛选了</p>
          <p>新增了更新日志页面</p>
          <p>更新了项目依赖</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/10/10" placement="top">
        <el-card>
          <h4>更新到V0.3</h4>
          <p>新增了历史数据功能，每次修改角色数据时都会保存历史数据</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/9/24" placement="top">
        <el-card>
          <h4>更新到V0.2</h4>
          <p>发布初版</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>
<style scoped>
</style>