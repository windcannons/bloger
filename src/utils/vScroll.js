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
                    if (currentTop > -maxScrollDistance) {
                        currentTop -= 4; // 向上滚动
                        img.style.transform = `translateY(${currentTop}px)`;
                        animationId = requestAnimationFrame(animate); // 继续动画
                    } else {
                        currentTop = -maxScrollDistance; // 达到顶部，停止滚动
                        img.style.transform = `translateY(${currentTop}px)`;
                        cancelAnimationFrame(animationId); // 停止动画
                    }
                };
                animationId = requestAnimationFrame(animate);
            };

            const moveDown = () => {
                cancelAnimationFrame(animationId); // 停止任何正在进行的动画
                const animate = () => {
                    if (currentTop < 0) {
                        currentTop += 20; // 向下滚动
                        img.style.transform = `translateY(${currentTop}px)`;
                        animationId = requestAnimationFrame(animate); // 继续动画
                    } else {
                        currentTop = 0; // 达到底部，停止滚动
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
