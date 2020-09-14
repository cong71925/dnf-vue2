<template>
  <el-card>
    <h2>DNF团队数据管理系统</h2>
    <el-divider content-position="left">项目说明</el-divider>
    <div>
      <p>
        本项目主要面向于小团体，可以更方便地查看和管理每个群员的打团角色信息。
        本项目可以登记角色，记录角色每次修改的数据，将其历史数据以图表显示。
        对于奶系角色，还可以计算唱歌和偏爱后的buff数值和对C提升率。
        在团队内还能通过表格或图表查看团员的角色的各项数据，以及伤害和buff的历史数据
      </p>
    </div>
    <el-divider content-position="left">安全声明</el-divider>
    <div>
      <p>
        本项目的前端部分已在
        <el-link
          href="https://github.com/cong71925/DNF-vue"
          :underline="false"
          target="_blank"
          icon="el-icon-link"
        >Github</el-link>上开源。
        后端用PHP写的，暂时没有开源的打算。
      </p>
    </div>
    <el-divider content-position="left">补充</el-divider>
    <div>
      <p>
        本项目的职业头像来源于colg的
        <el-link
          href="https://bbs.colg.cn/thread-7501852-1-1.html"
          :underline="false"
          target="_blank"
          icon="el-icon-link"
        >肥猫池塘</el-link>大佬，感谢大佬的制作与分享！
      </p>
      <p>
        本站仅为个人学习研究性质，如果你发现网站打不开，那多半是忘了交钱导致vps停机，或者是ip被ban，届时请通过
        <el-link
          href="mailto:cong71925@gmail.com"
          icon="el-icon-message"
          :underline="false"
          target="_blank"
        >cong71925@gmail.com</el-link>联系我，
        如果你发现了什么bug或者有什么建议，也可以发邮件至我的邮箱。
      </p>
    </div>
  </el-card>
</template>
<script>
export default {
  methods: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.el-link {
  text-indent: 0;
}
.el-image {
  text-indent: 0;
  max-width: 90%;
}
</style>
