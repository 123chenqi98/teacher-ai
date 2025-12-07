<!-- 我们的初衷 -->
<script setup lang="ts">
import '@/assets/story/OriginalIntentionCss.css';
import { origiData } from '@/data/story/OriginalData';

</script>

<template>
    <div id="origin" class="original-intention">
        <h2>{{ origiData.title }}</h2>
        <div class="content-spacer" style="height: 20px;"></div>
        <div class="original-intention_h2">
            <p>{{ origiData.subtitle }}</p>
        </div>
        <div class="cards-container">
            <div 
            v-for="member in origiData.members" 
            :key="member.id" 
            class="intention-card">
                <div class="card-content">
                <img :src="member.avatar" class="logo-img">
                    <h3>{{ member.subheading }}</h3>
                    <p>{{ member.content }}</p>
                </div>
            </div>
        </div>
    </div>
    
</template>