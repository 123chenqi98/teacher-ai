<template>
  <footer class="bg-gray-200 py-6 border-t border-gray-300">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- 左侧二维码区域 -->
        <div class="mb-6 md:mb-0 flex flex-col items-center md:items-start">
          <div class="relative w-24 h-24 bg-white p-1 rounded shadow-sm mb-2">
            <!-- 二维码图片，实际使用时替换为真实二维码 -->
            <img src="https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/8d71f16293764d1faa477795197f7626.png~tplv-a9rns2rl98-24-95-exif:1080:1080.png" 
                 alt="联系二维码" 
                 class="w-full h-full object-contain">
          </div>
          <span class="text-gray-700 text-sm">联系我们</span>
        </div>

        <!-- 右侧版权与链接区域 -->
        <div class="flex flex-col items-center md:items-end">
          <div class="text-gray-700 text-sm mb-3 text-center md:text-right">
            <p>©版权归智慧科技有限公司所有</p>
            <p class="mt-1">©2025年10月20日</p>
          </div>
          
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <a href="/terms" class="hover:text-gray-900 transition-colors duration-200">服务条款</a>
            <span class="text-gray-400">|</span>
            <a href="/privacy" class="hover:text-gray-900 transition-colors duration-200">个人信息保护</a>
            <span class="text-gray-400">|</span>
            <a href="/privacy-center" class="hover:text-gray-900 transition-colors duration-200">隐私中心</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 可以在这里添加页脚相关的交互逻辑
// 例如：处理链接点击事件、动态加载版权信息等
</script>

<style scoped>
/* 可选的额外样式调整 */
a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>