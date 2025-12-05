<!-- 我们的初衷 -->
<script setup lang="ts">
import '@/assets/story/OriginalIntentionCss.css';

</script>

<template>
    <div id="origin" class="original-intention">
        <h2>我们的初衷</h2>
        <div class="content-spacer" style="height: 20px;"></div>
        <div class="original-intention_h2">
            <p>教育是改变世界的最强大工具，但传统教育系统面临着诸多挑战</p>
        </div>
        <div class="cards-container">
            <el-card class="intention-card">
                <div class="card-content">
                <img src="/src/static/logo.png" class="logo-img">
                    <h3>教育资源不平等</h3>
                    <p>优质教育资源往往集中在发达地区，导致教育机会不均等。我们的AI教师将打破地域限制，为每一位学生提供平等的学习机会。</p>
                </div>
            </el-card>
            <el-card class="intention-card">
                <div class="card-content">
                <img src="/src/static/logo.png" class="logo-img">
                    <h3>个性化学习需求</h3>
                    <p>传统教育难以满足学生的个性化需求。我们的AI教师能够根据每位学生的学习进度、兴趣和能力，提供量身定制的学习路径。</p>
                </div>
            </el-card>
            <el-card class="intention-card">
                <div class="card-content">
                <img src="/src/static/logo.png" class="logo-img">
                    <h3>反馈不及时</h3>
                    <p>学生常常无法获得及时的学习反馈。我们的AI教师能够实时分析学习情况，提供即时、有针对性的指导和反馈。</p>
                </div>
            </el-card>
        </div>
    </div>
    
</template>