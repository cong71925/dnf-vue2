<template>
  <el-card>
    <h2>
      个人中心
       <!-- <router-link to="/account/home"><i class="el-icon-link"></i></router-link> -->
    </h2>
    <el-divider></el-divider>
    <p>该页面用于展示账号的基本信息，包括：</p>
    <p>用户名、昵称、冒险团名称、所属服务器、注册时间、角色类型分布。</p>

    <h2>个人信息修改</h2>
    <el-divider></el-divider>
    <p>该页面用于修改账号的基本信息（不包含密码）。</p>
    <p>注意：用户名一栏请谨慎修改，并确保您记得或保存好修改后的用户名，该栏影响的是账号登录时使用的用户名，谨防丢失。</p>

    <h2>账号密码修改</h2>
    <el-divider></el-divider>
    <p>该页面用于修改账号的登录密码。</p>
    <p>请谨慎修改，并确保您记得或保存好新的登录密码，本系统目前暂无找回密码功能，一旦您忘记了密码，账号可能会永久丢失！</p>

    <h2>备注</h2>
    <el-divider></el-divider>
    <p>
      虽然本系统应该不会有什么重要的数据，不过当你万一真的不慎忘记了密码或者遗失了账号，
      且账号的数据对您真的非常重要，您可以尝试联系网站管理员让他帮您重置密码。
    </p>
    <p>
      管理员邮箱地址：
      <el-link
        href="mailto:cong71925@gmail.com"
        icon="el-icon-message"
        :underline="false"
        target="_blank"
      >cong71925@gmail.com</el-link>
    </p>
  </el-card>
</template>