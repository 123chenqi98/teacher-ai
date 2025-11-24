<script setup lang="ts">
import "@/assets/contactUs/homeCss/cntactUsTopCss.css"
</script>


<template>
<!--  顶部导航栏-->
<header class="header-navigation">
  <div class="header-navigation-logo">
    <el-image src="@/static/logo.png"
              alt="logo图片"
    />
    <span class="">小知老师</span>
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

</style>
