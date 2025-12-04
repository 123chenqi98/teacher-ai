<!-- 导包处-->
<script setup lang="ts">
import ContactUsPageTop from "@/components/contactUs/home/ContactUsPageTop.vue"
import TopInformationComponent from "@/components/system/homeComponents/TopInformationComponent.vue";
import ContactUsInformation from "@/components/contactUs/home/ContactUsInformation.vue"
import ContactUsOnLineFeedBack from "@/components/contactUs/home/ContactUsOnLineFeedBack.vue";
import ContactUsFQAModal   from "@/components/contactUs/home/ContactUs-FQA-Modal.vue";
import Try from "@/components/contactUs/home/try.vue"
</script>



<!--组件要显示的主要东西放置板块-->
<template>
<div class="Contact-Us-Page-Box">

      <!--  顶部导航-->
      <TopInformationComponent/>

      <!--  头部大屏幕-->
      <ContactUsPageTop/>

      <!--      联系方式-->
      <ContactUsInformation/>

        <!--在线反馈表单-->
       <ContactUsOnLineFeedBack/>
        <!--  常见问题FAQ-->
        <ContactUsFQAModal/>
          <Try/>

</div>
</template>



<!--存放Css样式的区域-->
<style scoped>

</style>