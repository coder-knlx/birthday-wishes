document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let fireworks = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            this.particles = [];
            for (let i = 0; i < 30; i++) {
                this.particles.push(new Particle(this.x, this.y, this.color));
            }
            playFirecrackerSound(); // Play sound on explosion
        }

        update() {
            this.particles.forEach((p, index) => {
                p.update();
                if (p.alpha <= 0) {
                    this.particles.splice(index, 1);
                }
            });
        }

        draw() {
            this.particles.forEach(p => p.draw());
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = Math.random() * 5 + 2;
            this.angle = Math.random() * Math.PI * 2;
            this.gravity = 0.05;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.alpha = 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.alpha -= 0.02;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function addFirework(x, y) {
        fireworks.push(new Firework(x, y));
    }

    function playFirecrackerSound() {
        const sound = document.getElementById("firecracker-sound");
        if (sound) {
            sound.volume = 0.7;
            sound.play();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        });
        requestAnimationFrame(animate);
    }

    // Create fireworks at random positions every second
    setInterval(() => {
        addFirework(Math.random() * canvas.width, Math.random() * canvas.height / 2);
    }, 800);

    animate();
});
