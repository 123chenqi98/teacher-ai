<!-- 导包处-->
<script setup lang="ts">
import ContactUsPageTop from "@/components/contactUs/home/ContactUsPageTop.vue"
import ContactUsInformation from "@/components/contactUs/home/ContactUsInformation.vue"
</script>



<!--组件要显示的主要东西放置板块-->
<template>
<div class="Contact-Us-Page-Box">
     <!--  顶部导航-->
      <ContactUsPageTop/>
      <!--      联系方式-->
      <ContactUsInformation/>

</div>
</template>



<!--存放Css样式的区域-->
<style scoped>

</style>