<script setup lang="ts">

import {buyVipForm, buyVipFormRules, buyVipFormRef} from "@/forms/learningMachine/BuyVipForm.ts";
import { vipPackages } from "@/data/learningMachine/VipCheckoutData.ts";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">用户信息</h2>
    <div class="lm-user-info-form">
      <h3 class="lm-form-title">填写信息</h3>
      <el-form ref="buyVipFormRef" :model="buyVipForm" :rules="buyVipFormRules" label-width="80px">
        <div class="lm-user-info-form">
          <el-form-item label="姓名" prop="name">
            <el-input maxlength="10" v-model="buyVipForm.name" placeholder="请输入姓名" size="large" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input maxlength="11" v-model="buyVipForm.phone" placeholder="请输入手机号" size="large" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input maxlength="25" v-model="buyVipForm.email" placeholder="请输入邮箱" size="large" />
          </el-form-item>
          <el-form-item label="会员类型" prop="type">
            <el-select v-model="buyVipForm.type" placeholder="请选择会员类型" size="large">
              <el-option
                  v-for="pkg in vipPackages"
                  :key="pkg.id"
                  :label="pkg.name"
                  :value="pkg.id.toString()">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

      </el-form>
    </div>
  </div>
</template>

<style scoped>
.lm-user-info-form {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 10%;
}

</style>