const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Inicializa o tamanho do canvas
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const fireworks = [];
const particles = [];
const gravity = 0.075;

// Função para gerar cores RGB aleatórias
function color() {
  return Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255);
}

// Função para criar um novo fogo de artifício
function new_firework(x = null, cor = null) {
  // Posição X: Se não for fornecida, define como centro da tela, se não, aleatoriza dentro de uma faixa
  const posX = x === null ? window.innerWidth / 2 : (window.innerWidth / 2 - 200) + Math.random() * 400;
  
  // Ajusta a velocidade vertical e o tempo de vida com base na altura da tela
  let vy, lifetime, size;
  if (window.innerHeight > 1080) {
    vy = 15 + Math.random() * 8;
    lifetime = 70 + Math.random() * 50;
    size = 5 + Math.random() * 5;
  } else {
    vy = 12 + Math.random() * 3;
    lifetime = 50;
    size = 3;
  }

  let firework = {
    x: posX,
    y: window.innerHeight, // Começa na parte inferior da tela
    vy: vy,
    vx: -2 + Math.random() * 4,
    color: cor ? cor : color(),
    lifetime: lifetime,
    trail: [],
    size: size,
  };

  fireworks.push(firework);
}

// Função para criar a explosão de partículas
function createExplosion(x, y, color) {
  const particleCount = 100;
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Ajusta a velocidade das partículas com base na altura da tela
    const speed = window.innerHeight > 1080 ? Math.random() * 5 + 2 : Math.random() * 3 + 1;
    
    let particle = {
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: color,
      //Ajusta o tempo de vida com base na altura da tela
      lifetime: window.innerHeight > 1080 ? 20 + Math.random() * 100 : 10 + Math.round(Math.random() * 50),
      size: window.innerHeight > 1080 ? 5 + Math.random() * 10 : 3 + Math.random() * 2
    };

    particles.push(particle);
  }
}

// Função para exibir os fogos de artifício e partículas
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
    ctx.fillStyle = `rgba(${particle.color}, ${particle.lifetime / 50})`;
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

// Função para atualizar a posição dos fogos de artifício e partículas
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
      const fireworkSound = new Audio('fogos.mp3');
      fireworkSound.volume = window.innerWidth > 768 ? 0.6 : 0.2; // Ajusta volume do som baseado na largura da tela
      fireworkSound.play();
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

// Função principal para iniciar a animação
function show() {
  let angle = 0;
  let radius = 0;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxRadius = Math.min(centerX, centerY) * 0.8;
  const lineY = centerY;
  const lineWidth = 100;

  setInterval(() => {
    //Posição X aleatória dentro de uma faixa
    const x = centerX - lineWidth / 2 + Math.random() * lineWidth;

    // Posição Y ligeiramente variável para um efeito mais natural
    const y = lineY + Math.random() * 50 - 25;

    // Variação de cor com base no ângulo
    const colorValue = Math.floor((angle % (2 * Math.PI)) / (2 * Math.PI) * 255);
    const cor = `255,${colorValue},0`;

    new_firework(x, cor);

    angle += 0.1;

    // Ajusta o raio para controlar a dispersão dos fogos de artifício
    radius = (radius + 0.5) % (maxRadius / 2);
  }, window.innerWidth > 768 ? 50 : 100); // Ajusta a frequencia baseado na largura da tela

  animate();
}

// Função de animação
function animate() {
  display();
  update();
  requestAnimationFrame(animate);
}

// Inicia o show de fogos de artifício
show();