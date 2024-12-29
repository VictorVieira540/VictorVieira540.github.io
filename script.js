const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const fireworks = [];
const particles = [];
const gravity = 0.175;
const color = () => Math.floor(Math.random() * 255);

function new_firework(x = window.innerWidth / 2) {
    let firework = {
        x: x,
        y: window.innerHeight - 10,
        vy: 10 + Math.random() * 5,
        vx: -3 + Math.random() * 6,
        color: color() + ',' + color() + ',' + color(),
        lifetime: 70 + Math.round(Math.random() * 70),
        trail: [],
        size: 3
    };

    fireworks.push(firework);
}

function createExplosion(x, y, color) {
    const particleCount = 200; 
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2; 
        const speed = Math.random() * 3 + 1;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: color,
            lifetime: 70, 
            size: 3 + Math.random() * 2 
        });
    }
}

function display() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework) => {
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(' + firework.color + ')';
        ctx.fill();
        ctx.closePath();
        trail(firework);
    });

    particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.lifetime / 50})`; // Opacidade baseada no tempo de vida
        ctx.fill();
        ctx.closePath();
    });

    function trail(firework) {
        const trail = firework.trail;

        trail.forEach((point, i) => {
            const opacity = (i + 1) / trail.length;
            ctx.beginPath();
            ctx.arc(point.x, point.y, firework.size / 1.7, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${firework.color}, ${opacity})`;
            ctx.fill();
            ctx.closePath();
        });
    }
}

function update() {
    fireworks.forEach((firework, index) => {
        firework.trail.push({ x: firework.x, y: firework.y });
        firework.y -= firework.vy;
        firework.x += firework.vx;
        firework.vy -= gravity;

        if (firework.trail.length > 5) {
            firework.trail.shift();
        }

        firework.lifetime--;
        if (firework.lifetime <= 0 || firework.vy <= -2) {
            const fireworkSound = new Audio('fogos.mp3').play();
            createExplosion(firework.x, firework.y, firework.color);
            fireworks.splice(index, 1);
        }
    });

    particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += gravity / 2; 
        particle.size *= 0.96; 
        particle.lifetime--;

        if (particle.lifetime <= 0) {
            particles.splice(index, 1); 
        }
    });
}

function animate() {
    display();
    update();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('click', () => {
    new_firework();
});
