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
const color = () => Math.floor(Math.random() * 255) + ','+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255);

function new_firework(x = window.innerWidth / 2, cor = null) {
    let firework = {
      x: x,
      y: window.innerHeight - 10, // Ponto de partida do fogo de artifício
      vy: 12 + Math.random() * 3,
      vx: -2 + Math.random() * 4,
      color: cor ? cor : color(), // Usa 'cor' se fornecido, senão gera uma cor aleatória
      lifetime: 70,
      trail: [],
      size: 3
    };
  
    // Ajuste para telas altas (como 2340px):
    // O objetivo é fazer o fogo de artifício explodir mais alto na tela.
    // Vamos reduzir a velocidade vertical inicial (vy) e aumentar o lifetime
    // Isso fará o fogo de artifício subir mais lentamente e por mais tempo, 
    // alcançando uma altura maior antes de explodir.
  
    if (window.innerHeight >= 2340) {
      firework.vy = 20 + Math.random() * 8; // Reduz a velocidade vertical
      firework.lifetime = 100 + Math.random() * 100; // Aumenta o tempo de vida (ajuste conforme necessário)
      firework.size = 5 + Math.random() * 5;
    }
  
    fireworks.push(firework);
  }

function createExplosion(x, y, color) {

    const particleCount = 100; 
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2; 
        const speed = Math.random() * 3 + 1;
        let particle = {
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: color,
            lifetime: 10 + Math.round(Math.random() * 50), 
            size: 3 + Math.random() * 2
        }

        if (window.innerHeight >= 2340) {
            particle.size = 5 + Math.random() * 10;
            particle.lifetime = 20 + Math.random() * 100;
        }

        particles.push(particle);


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

        if (particle.lifetime <= 0 || particle.size <= 0.01) {
            particles.splice(index, 1); 
        }
    });
}

function show() {
    let angle = 0;
    let radius = 0;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.8;
    const lineY = centerY;
    const lineWidth = 100;
    setInterval(() => {
      const x = centerX - lineWidth / 2 + Math.random() * lineWidth;
  
      const y = lineY + Math.random() * 50 - 25;
  
      const colorValue = Math.floor((angle % (2 * Math.PI)) / (2 * Math.PI) * 255);
      const cor = `255,${colorValue},0`; 
  
      new_firework(x, cor);
  
      angle += 0.1;
      
      radius = (radius + 0.5) % (maxRadius / 2);
    }, 50);
  
    animate();
  }

function animate() {

    display();
    update();

    requestAnimationFrame(animate);

}
