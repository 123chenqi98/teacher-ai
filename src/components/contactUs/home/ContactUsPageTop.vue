<script setup lang="ts">
import "@/assets/contactUs/homeCss/contactUsTopCss.css"
</script>

<template>
<!--  顶部导航栏-->
<header class="homeTopInfoBox">
  <div class="logo-box">
    <el-image class="logo-image" src="src/static/logo.png" alt="logo图片"/>
    <el-text class="home-title">小知老师</el-text>
  </div>
  <!-- 导航菜单 -->
<div class="navigation-box">
  <el-button size="large" class="nav-button">
    <el-text class="navigation-font">首页</el-text>
  </el-button>
  <el-button size="large" class="nav-button">
    <el-text class="navigation-font">首页ddd</el-text>
  </el-button >
  <el-button size="large" class="nav-button">
    <el-text class="navigation-font">首页aa</el-text>
  </el-button>
  <el-button size="large" class="nav-button">
    <el-text class="navigation-font">首页dddddd</el-text>
  </el-button>
</div>
</header>

<!--  头部照片-->
  <div class="demo-page-top">
    <el-image  class="image-top"
               src="https://www-file.huawei.com/admin/asset/v1/pro/view/924b6fe6e7104e88a5cc36ed8d50b264.jpg"
               alt="联系我们顶部背景图"
               fit="cover"

    />
    <div class="image-title">
      <h1 class="main-title">联系我们</h1>
      <p class="sub-title">
        对小知产品、技术支持、合作等有任何问题，请通过这些渠道与我们联系
      </p>
    </div>
  </div>
  <!-- 底部导航栏：在图片下方，随图片宽度对齐 -->
  <div class="nav-links">
    <span class="nav-item active">购买与咨询</span>
    <span class="nav-item">联系方式</span>
    <span class="nav-item">在线反馈</span>
    <span class="nav-item">常见问题 FAQ 模块</span>
    <span class="nav-item">其它</span>

  </div>

</template>

<style scoped>
/*标题样式*/
.home-title{
  width: 100%;
  font-size: 1.4rem;
  font-weight: 700;
  margin-left: 0.5rem;
  font-family: 楷体,serif;
  color: rgb(13, 23, 42);
}
.navigation-font {
  font-size: 1.8rem;
  font-family: 楷体, serif;
  font-weight: 700;
  color: rgb(13, 23, 42);
  margin-left: 0.5rem;
}
/* 使用 !important 确保样式生效 */
.nav-button{
  /* 关键：去掉按钮默认的背景色、边框、外边框 */
  background: transparent; /* 背景透明（继承父元素背景，即与页面背景一致） */
  border: none; /* 去掉默认边框 */
  outline: none; /* 去掉点击时的蓝色外边框（可选，按需求保留） */
}
.nav-button:hover {
  background-color: rgba(120, 76, 172, 0.86) !important;
}
</style>
