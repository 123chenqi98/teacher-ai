import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userInfo = defineStore('userInfo', () => {
  const userInfo = ref({
    userId: null,
    token: null,
    username: null,
    avatar: null,
    email: null,
    data: null
  })

})
