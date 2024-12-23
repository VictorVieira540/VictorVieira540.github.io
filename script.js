
const flakes = [];

function new_flake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snow-flake");
  const size = 20 + Math.random() * 80;
  snowflake.style.width = size + "px";
  snowflake.style.height = size + "px";
  snowflake.style.left = Math.max(0, Math.random() * (window.innerWidth - size)) + "px";
  snowflake.style.top = -size + 10 + "px";
  snowflake.style.opacity = 1;
  return snowflake;
}

function add_flake() {
  if(flakes.length<5){
    flakes.push(new_flake());
    document.body.appendChild(flakes[flakes.length - 1]);
}}

function fall() {
  flakes.forEach((flake) => {
    flake.style.top = parseInt(flake.style.top) + 1 + "px";
    flake.style.opacity = 1 - (parseInt(flake.style.top) / window.innerHeight);
    if (parseInt(flake.style.top) > window.innerHeight) {
      flakes.splice(flakes.indexOf(flake), 1);
      flake.remove();

    }
  });
}



const falll = setInterval(()=>{fall()}, 1000/100);
const add = setInterval(()=>{add_flake()}, 1000);
let cliques = 0;
let minimum = 3
let image  = 2

document.getElementById("ice").addEventListener("click", function () {
  // Adiciona diretamente a animação ao estilo inline
  this.style.animation = "focus 0.5s linear";
  cliques++;

  image(cliques);

  // Remove a animação ao final para poder reutilizar
  this.addEventListener("animationend", () => {
    this.style.animation = "";
  });
});

function image(cliques){
  if(cliques >= minimum){
    document.getElementById("ice").src = `/images/ice-${image}.png`;
    image++;
    minimum += 3;
  }
}