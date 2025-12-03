<!-- 发展历程时间线组件 -->
<script setup lang="ts">
import '@/assets/story/CourseCss.css';

import { CourseData } from '@/data/story/CourseData';

</script>

<template>
    <div id="course" class="timeline-section">
          <!-- 内容占位，避免被导航栏遮挡 -->
        <div class="content-spacer"></div>
        <h2 class="timeline-title">{{ CourseData.title }}</h2>
        <p class="timeline-subtitle">{{ CourseData.subtitle }}</p>
        
        <div class="timeline-container">
            <div 
                v-for="(event, index) in CourseData.events" 
                :key="event.id"
                class="timeline-item"
                :class="{ 'left': index % 2 === 0, 'right': index % 2 === 1 }"
            >
                <div class="timeline-content">
                    <span class="timeline-date">{{ event.date }}</span>
                    <h3 class="timeline-event-title">{{ event.title }}</h3>
                    <p class="timeline-description">{{ event.description }}</p>
                </div>
                <div class="timeline-dot"></div>
            </div>
        </div>
    </div>
</template>