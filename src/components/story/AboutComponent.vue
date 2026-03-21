<!-- 我们的初衷 -->
<script setup lang="ts">
import '@/assets/story/AboutCss.css';
import { aboutData } from '@/data/story/AboutData';
</script>

<template>
    <div  id="about" class="about-intention">
        <h2 class="about-intention_title">{{ aboutData.title }}</h2>
        <div class="about-intention_content">
            <div class="about-intention_text">
                <div class="about-intention_p1">
                    {{ aboutData.subtitle }}
                </div>
                <div class="about-intention_p">
                    {{ aboutData.members[0].content1 }}
                    {{ aboutData.members[0].content2 }}
                </div>
            </div>
            <div class="about-intention_image">
                <img :src="aboutData.members[0].avatar" alt="团队成员"/>
            </div>
        </div>
    </div>
</template>