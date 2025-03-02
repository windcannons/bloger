window.addEventListener("load",function (){
    // 设置基准值
    const baseSize = 500 // 设计图尺寸（1920px）/ 60
    // 设置 rem 函数
    function setRem () {
        const scale = document.documentElement.clientWidth / 1920 / 32
        document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 1)}px`
    }
    // 初始化
    setRem()
    // 改变窗口大小时重新设置 rem
    window.addEventListener('resize', () => {
        setRem()
    })
})
