let horas = 0;
let minutos = 0;
let segundos = 0;
let cronometroAtivo = true;

const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
const dataFinal = new Date(anoAtual, 11, 31, 23, 59, 59);

function verificarFim() {

    const agora = new Date();
    return agora >= dataFinal;
}

function atualizarCronometro() {
    const agora = new Date();
    const diferenca = dataFinal.getTime() - agora.getTime();

    if (verificarFim()) {
        show();
        horas = 0;
        minutos = 0;
        segundos = 0;
        cronometroAtivo = false;
        document.getElementById("cronometro").textContent = "00:00:00";
        return true;
    }

    horas = Math.floor(diferenca / 1000 / 60 / 60);
    minutos = Math.floor((diferenca / 1000 / 60) % 60);
    segundos = Math.floor((diferenca / 1000) % 60);

    // Atualiza o texto do cronômetro na tela
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}

// Função principal para iniciar o cronômetro
function iniciarCronometro() {
    setInterval(() => {
        if (cronometroAtivo) {
            atualizarCronometro();
        }
    }, 1000);

    atualizarCronometro(); // Atualização inicial
}

iniciarCronometro();
