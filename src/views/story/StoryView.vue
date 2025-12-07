<!-- 故事页面视图 -->
<script setup lang="ts">
import NavigationComponent from "@/components/story/NavigationComponent.vue";
import HeroComponent from "@/components/story/HeroComponent.vue";
import OriginalIntentionComponent from "@/components/story/OriginalIntentionComponent.vue";
import AboutComponent from "@/components/story/AboutComponent.vue";
import IntroductionComponent from "@/components/story/IntroductionComponent.vue";
import CourseComponent from "@/components/story/CourseComponent.vue";

</script>

<template>
    <div>
<!--      视图-->
        <NavigationComponent />
        <HeroComponent />
        <OriginalIntentionComponent />
        <AboutComponent />
        <IntroductionComponent />
        <CourseComponent />
    </div>
</template>