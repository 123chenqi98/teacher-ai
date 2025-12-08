<!-- 故事页面视图 -->
<script setup lang="ts">
import HeroComponent from "@/components/story/HeroComponent.vue";
import OriginalIntentionComponent from "@/components/story/OriginalIntentionComponent.vue";
import AboutComponent from "@/components/story/AboutComponent.vue";
import IntroductionComponent from "@/components/story/IntroductionComponent.vue";
import CourseComponent from "@/components/story/CourseComponent.vue";
import ContactComponent from "@/components/story/ContactComponent.vue"
import TopInformationComponent from "@/components/system/homeComponents/TopInformationComponent.vue";

</script>

<template>
    <div>
<!--      视图-->
      <!-- 顶部信息 -->
        <top-information-component/>
        <HeroComponent />
        <OriginalIntentionComponent />
        <AboutComponent />
        <IntroductionComponent />
        <CourseComponent />
        <ContactComponent />
    </div>
</template>