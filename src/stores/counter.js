import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    count:1
  }),
  actions: {
    increment(){
      this.count++
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'store',//设置存储的key
        storage: localStorage,//表示存储在localStorage
      }
    ]
  }
})
