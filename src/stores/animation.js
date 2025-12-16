import {defineStore} from 'pinia'

export const useAnimationStore = defineStore('animation', {
    state: () => ({
        introAnimPlayed: false // false 表示需要播放动画，true 表示已播放过
    }),
    actions: {
        setIntroAnimPlayed(value) {
            this.introAnimPlayed = value
        },
        resetIntroAnim() {
            // 重置动画状态，用于刷新页面时
            this.introAnimPlayed = false
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'animation-store',
                storage: sessionStorage // 使用 sessionStorage，刷新后清除
            }
        ]
    }
})

