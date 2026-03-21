<!-- 英雄区域组件 -->
<script setup lang="ts">
import '@/assets/story/HeroCss.css';
import { heroData } from '@/data/story/HeroData';



</script>


<template>
  <div id="hero" class="hero">
    <div class="container">
      <h1>{{ heroData.title }}</h1>
      <p>{{ heroData.subtitle }}</p>
      <p>{{ heroData.members[0].content }}</p>
    </div>
  </div>


</template>
