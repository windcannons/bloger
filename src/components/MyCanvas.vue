<!--MyCanvas-->
<template>
    <canvas id="starBg"></canvas>
</template>

<script
    setup>
import {
    onMounted
} from "vue";


function random(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function maxOrbit(x, y) {
    var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
    //星星移动范围，值越大范围越小，
}

class Star {
    constructor(p, ctx, canvas2) {
        this.maxStars = 1100; //星星数量,默认1100
        this.orbitRadius = random(maxOrbit(p.w, p.h));

        this.ctx = ctx;
        this.canvas2 = canvas2;

        this.radius = random(60, this.orbitRadius) / 20; //星星大小,值越大星星越小,默认8

        this.orbitX = p.w / 2;
        this.orbitY = p.h / 2;
        this.timePassed = random(0, this.maxStars);
        this.speed = random(this.orbitRadius) / 400000; //星星移动速度,值越大越慢,默认5W
        this.alpha = random(2, 10) / 10;
    }
    draw() {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        let twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        this.ctx.globalAlpha = this.alpha;
        this.ctx.drawImage(
            this.canvas2,
            x - this.radius / 2,
            y - this.radius / 2,
            this.radius,
            this.radius
        );
        this.timePassed += this.speed;
    }
}

onMounted(()=>{
    let stars = [];
    const maxStars = 1100; // 星星数量

    function initCanvas() {
        const canvas = document.getElementById("starBg");
        const ctx = canvas.getContext("2d");
        const w = (canvas.width = window.innerWidth);
        const h = (canvas.height = window.innerHeight);

        const canvas2 = document.createElement("canvas");
        const ctx2 = canvas2.getContext("2d");
        canvas2.width = 100;
        canvas2.height = 100;
        const half = canvas2.width / 2;
        const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, "#CCC");
        gradient2.addColorStop(0.1, "hsl(217, 61%, 33%)");
        gradient2.addColorStop(0.25, "hsl(217, 64%, 6%)");
        gradient2.addColorStop(1, "transparent");

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        for (var i = 1; i < maxStars; i++) {
            const star = new Star({w, h}, ctx, canvas2);
            stars[i] = star;
        }
        function animation() {
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 0.8; //尾巴
            ctx.fillStyle = "hsla(217, 64%, 6%, 2)";
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = "lighter";
            for (let i = 1; i < stars.length; i++) {
                stars[i].draw();
            }

            window.requestAnimationFrame(animation);
        }
        animation();
    }
    initCanvas();
})
</script>

<style
    scoped
    lang="less">
canvas {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
</style>
