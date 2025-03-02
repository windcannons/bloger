//防抖 在连续触发事件时只执行一次函数
import {
    ElMessage
} from "element-plus";

export const debounceFn = (fn, delay) => {
    let timer = null
    delay = delay || 500
    return (...args) => {
        const vm = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(vm, args)
        }, delay)
    }
}

//节流 函数在一定时间间隔内最多执行一次
export const throttleFn = (fn, delay = 500) => {
    let timer = null
    let lastExecTime = 0

    return (...args) => {
        const currentTime = Date.now()
        const elapsedTime = currentTime - lastExecTime

        if (elapsedTime >= delay) {
            if (timer) clearTimeout(timer) // 如果有待定时器，清除它

            fn(...args) // 执行函数
            lastExecTime = currentTime // 更新上次执行时间
        } else {
            // 如果时间未到达间隔，设置一个新的定时器来在延迟后执行
            if (!timer) {
                timer = setTimeout(() => {
                    fn(...args)
                    lastExecTime = Date.now() // 更新上次执行时间
                    timer = null // 清除定时器
                }, delay - elapsedTime) // 在剩余时间后执行
            }
        }
    }
}

export const copyText = throttleFn((text) => {
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
    ElMessage({
        message: '已复制微信',
        type: 'success',
    })
})
