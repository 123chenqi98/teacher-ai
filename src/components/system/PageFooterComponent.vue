<script setup lang="ts">
//页脚样式
import "@/assets/system/PageFooterCss.css"
import qrCode from "/src/static/qr-code.png"
</script>

<template>
  <!-- 页脚组件 -->
  <!-- 页脚 -->
  <footer class="footer">
    <!-- 二维码 -->
    <div>
      <div class="qr-code">
        <img :src="qrCode" alt="二维码">
        <span class="contact-span">联系我们</span>
      </div>
    </div>
    <!-- 页脚内容 -->
      <div >
        <h3>关于我们</h3>
        <ul>
          <li><a href="#">公司简介</a></li>
          <li><a href="#">团队介绍</a></li>
          <li><a href="#">发展历程</a></li>
        </ul>
      </div>

      <div >
        <h3>产品服务</h3>
        <ul>
          <li><a href="#">AI教学助手</a></li>
          <li><a href="#">智能评估系统</a></li>
          <li><a href="#">个性化学习</a></li>
        </ul>
      </div>

      <div >
        <h3>帮助支持</h3>
        <ul>
          <li><a href="#">使用指南</a></li>
          <li><a href="#">常见问题</a></li>
          <li><a href="#">技术支持</a></li>
        </ul>
      </div>

      <div >
        <h3>联系方式</h3>
        <ul style="list-style-type: none">
          <li>邮箱: contact@example.com</li>
          <li>电话: 400-123-4567</li>
          <li>地址: 玉林市玉州区</li>
        </ul>
      </div>

    <!-- 版权信息 -->
    <div >
      <p>&copy; 2025智慧科技有限公司保留所有权利</p>
      <div style="display: flex;gap: 10px">
        <a href="#">隐私政策</a>
        <a href="#">服务条款</a>
        <a href="#">网站地图</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/*联系字样*/
.contact-span{
  font-size: 1.5rem;
  color: rgb(153, 171, 129);
  margin-top: 1rem;
  margin-bottom: 1rem;
}

</style>
