<!-- 团队介绍 -->
<script setup lang="ts">
import '@/assets/story/IntroductionCss.css';
import { teamData } from '@/data/story/IntroduceDatas';

</script>

<template>
    <div id="introduction" class="introduction">
        <h2 class="introduction_title">{{ teamData.title }}</h2> 
        <p class="introduction_subtitle">{{ teamData.subtitle }}</p>
        
        <div class="team-members">
            <!-- 使用v-for循环渲染团队成员 -->
            <div 
                v-for="member in teamData.members" 
                :key="member.id" 
                class="team-member"
            >
                <div class="member-avatar">
                    <img :src="member.avatar" :alt="member.name" />
                </div>
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-position">{{ member.position }}</p>
            </div>
        </div>
    </div>
</template>//