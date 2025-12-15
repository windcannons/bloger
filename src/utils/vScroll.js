export default {
    name: 'v-scroll',
    mounted(el) {
        const box = el;
        const img = el.querySelector('img');
        let currentTop = 0; // 当前图片位置
        let boxHeight = box.offsetHeight; // 盒子高度
        let imgHeight = 0; // 图片高度（初始值为 0）
        let maxScrollDistance = 0; // 最大滚动距离
        let animationId = null; // 用于存储 requestAnimationFrame 的 ID


        // 图片加载完成后的回调
        const onImageLoaded = () => {
            imgHeight = img.offsetHeight; // 获取图片高度
            maxScrollDistance = imgHeight - boxHeight; // 计算最大滚动距离

            if (maxScrollDistance <= 0) {
                console.warn('Image height is not greater than box height. No scrolling needed.');
                return;
            }

            // 初始化滚动逻辑
            const moveUp = () => {
                cancelAnimationFrame(animationId); // 停止任何正在进行的动画
                const animate = () => {
                    const nextTop = currentTop - 4; // 计算下一次位置
                    // 确保不会超过最大滚动距离（图片底部到达盒子底部时停止）
                    if (nextTop >= -maxScrollDistance) {
                        currentTop = nextTop;
                        img.style.transform = `translateY(${currentTop}px)`;
                        animationId = requestAnimationFrame(animate); // 继续动画
                    } else {
                        // 已达到边界，设置为精确的边界值
                        currentTop = -maxScrollDistance;
                        img.style.transform = `translateY(${currentTop}px)`;
                        cancelAnimationFrame(animationId); // 停止动画
                    }
                };
                animationId = requestAnimationFrame(animate);
            };

            const moveDown = () => {
                cancelAnimationFrame(animationId); // 停止任何正在进行的动画
                const animate = () => {
                    const nextTop = currentTop + 20; // 计算下一次位置
                    // 确保不会超过初始位置（图片顶部到达盒子顶部时停止）
                    if (nextTop <= 0) {
                        currentTop = nextTop;
                        img.style.transform = `translateY(${currentTop}px)`;
                        animationId = requestAnimationFrame(animate); // 继续动画
                    } else {
                        // 已达到边界，设置为精确的初始位置
                        currentTop = 0;
                        img.style.transform = `translateY(0)`;
                        cancelAnimationFrame(animationId); // 停止动画
                    }
                };
                animationId = requestAnimationFrame(animate);
            };

            box.addEventListener('mouseenter', moveUp);
            box.addEventListener('mouseleave', moveDown);
        };

        // 监听图片加载事件
        if (img.complete && img.naturalHeight !== 0) {
            onImageLoaded(); // 图片已经加载完成
        } else {
            img.addEventListener('load', onImageLoaded); // 图片尚未加载完成，监听 load 事件
        }
    },
    beforeUnmount(el) {
        const box = el;
        const img = el.querySelector('img');
        box.removeEventListener('mouseenter', () => {});
        box.removeEventListener('mouseleave', () => {});
        img.removeEventListener('load', () => {});
        cancelAnimationFrame(el.animationId); // 确保取消所有动画
    }
};
