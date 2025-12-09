<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  compareValue: string | number
  color?: string
  labelFontSize?: string
  valueFontSize?: string
  compareFontSize?: string
}

withDefaults(defineProps<Props>(), {
  color: '#303133',
  labelFontSize: '15px',
  valueFontSize: '24px',
  compareFontSize: '16px'
})
</script>

<template>
  <div style="text-align: center; padding: 12px 0">
    <div :style="{ fontSize: labelFontSize, color: '#909399', marginBottom: '8px' }">
      {{ label }}
    </div>
    <div :style="{ fontSize: valueFontSize, fontWeight: 'bold', color: color }">
      {{ value }}
    </div>
    <div :style="{ fontSize: compareFontSize, color: '#909399', marginTop: '4px' }">
      {{ compareValue }}
    </div>
  </div>
</template>
