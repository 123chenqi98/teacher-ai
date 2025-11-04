<script setup lang="ts">
import {RouterView} from "vue-router";
import PageFooter from "@/components/system/PageFooterComponenet.vue";
</script>

<template>
    <RouterView />
    <!--页脚：所有页面都显示-->
    <PageFooter/>
</template>
<style scoped>

</style>
