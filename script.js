
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
    
    if (flake.offsetTop > window.innerHeight) {
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

  imaget(cliques);

  // Remove a animação ao final para poder reutilizar
  this.addEventListener("animationend", () => {
    this.style.animation = "";
    imaget(cliques);
  });
});

function imaget(cliques){
  if(cliques >= minimum && image <= 4){ 
    document.getElementById("ice").src = `/images/ice-${image}.png`;
    image++;
    minimum += 3;
  }else if(image == 5){
    remove_ice();
    image++;
  }
}

async function remove_ice(){
  const audio = new Audio("/audios/its time.mp3");
  audio.play();

  await new Promise(resolve => setTimeout(resolve, 1650));

  const ice = document.getElementById("ice");
  ice.src = `/images/ice-5.png`;
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  ice.style.animation = "remove_ice 1s linear";
  document.getElementById("text").style.animation = "remove_ice 1s linear";

  await new Promise(resolve => setTimeout(resolve, 1000));
    ice.remove();
    document.getElementById("text").remove();
  await new Promise(resolve => setTimeout(resolve, 100));
    itstime();
  await new Promise(resolve => setTimeout(resolve, 3000));  
    feliz_natal();

}

function itstime(){
  const div = document.createElement("div");
  div.id = "its";
  div.classList.add("text");
  div.style.top = "100px"
  div.innerHTML = "It's time";
  div.style.animation = "its 1s linear";
  document.body.appendChild(div);
}

function feliz_natal(){
  const div = document.createElement("div");
  div.classList.add("happy");
  div.style.animation = "haps 1s linear";
  document.body.appendChild(div);

}