<!--<script setup lang="ts">-->
<!--import {RouterView} from "vue-router";-->
<!--import PageFooter from "@/components/system/PageFooterComponenet.vue";-->
<!--</script>-->

<!--<template>-->
<!--    <RouterView />-->
<!--    &lt;!&ndash;页脚&ndash;&gt;-->
<!--    <page-footer/>-->
<!--</template>-->
<!--<style scoped>-->

<!--</style>-->

<script setup lang="ts">
import {RouterView} from "vue-router";
import PageFooter from "@/components/system/PageFooterComponenet.vue";
</script>

<template>
  <div id="app">
    <RouterView />
    <!--页脚：所有页面都显示-->
    <PageFooter/>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
