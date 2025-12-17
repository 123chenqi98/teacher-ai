<!-- 导包处-->
<script setup lang="ts">
import "@/assets/settings/homeCss/SettingsLeftSideBarCss.css"
import SettingsLeftSideBar from "@/components/settings/home/SettingsLeftSideBar.vue";
import SettingsProFile from "@/components/settings/home/SettingsProFile.vue";
</script>



<!--组件要显示的主要东西放置板块-->
<template>
  <div class="Settings-home-box">
<!--    顶部信息-->


  <div class="Settings-home-content">
<!--    侧边导航栏-->
    <SettingsLeftSideBar/>




        <SettingsProFile/>



      </div>
    </div>
</template>



<!--存放Css样式的区域-->
<style scoped>

</style>