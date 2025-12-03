<script setup lang="ts">
import {testimonials} from "@/data/learningMachine/VipContentData.ts";
import {viewTestimonialDetail} from "@/utils/learningMachine/VipContentUtils.ts";
import {StarFilled} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">
      <el-icon>
        <StarFilled />
      </el-icon>
      用户评价
    </h2>
    <div class="lm-testimonials">
      <el-row :gutter="20">
        <el-col v-for="testimonial in testimonials" :key="testimonial.id" :xs="24" :sm="12" :md="8">
          <div class="lm-testimonial-card" @click="viewTestimonialDetail(testimonial)">
            <div class="lm-testimonial-header">
              <div class="lm-testimonial-avatar">
                <el-avatar :size="40">{{ testimonial.name.substring(0, 1) }}</el-avatar>
              </div>
              <div class="lm-testimonial-info">
                <h4 class="lm-testimonial-name">{{ testimonial.name }}</h4>
                <p class="lm-testimonial-grade">{{ testimonial.grade }}</p>
              </div>
              <div class="lm-testimonial-rating">
                <el-rate
                    v-model="testimonial.rating"
                    disabled
                    :max="5"
                    size="small"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
              </div>
            </div>
            <p class="lm-testimonial-content">{{ testimonial.content }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>

</style>