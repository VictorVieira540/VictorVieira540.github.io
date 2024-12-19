// Cria a rede neural
const net = new brain.NeuralNetwork({
    inputSize: 9, // Cada tabuleiro 3x3 convertido em vetor 1D terá 9 entradas
    hiddenLayers: [18, 9], // Camadas intermediárias para processar os dados
    outputSize: 9 // Saída será um vetor 1D com 9 posições
  });
  
  // Dados de treinamento
  const trainingData = [
    { 
      input: [1, 0, 0, 0, 1, 0, 0, 0, 1],
      output: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    { 
      input: [1, 2, 1, 2, 1, 2, 0, 0, 0],
      output: [0, 0, 0, 0, 0, 0, 0, 0, 1]
    },
    { 
      input: [2, 2, 1, 1, 1, 0, 0, 0, 0],
      output: [0, 0, 0, 0, 0, 1, 0, 0, 0]
    },
    { 
      input: [1, 0, 1, 0, 2, 2, 0, 0, 0],
      output: [0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    { 
      input: [1, 0, 2, 0, 1, 2, 0, 0, 1],
      output: [0, 0, 0, 0, 0, 0, 1, 0, 0]
    },
    // Novos dados adicionados
    { 
      input: [2, 0, 1, 1, 2, 1, 0, 2, 0],
      output: [0, 0, 0, 0, 0, 1, 0, 0, 0]
    },
    { 
      input: [1, 1, 0, 2, 2, 1, 0, 0, 1],
      output: [0, 0, 0, 0, 0, 1, 0, 0, 0]
    },
    { 
      input: [0, 2, 1, 1, 1, 2, 0, 0, 0],
      output: [0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    { 
      input: [2, 1, 0, 2, 1, 0, 1, 0, 2],
      output: [0, 0, 0, 0, 0, 0, 1, 0, 0]
    },
    { 
      input: [0, 0, 1, 2, 2, 1, 1, 0, 2],
      output: [0, 0, 1, 0, 0, 0, 0, 0, 0]
    },
    { 
      input: [1, 2, 1, 2, 1, 0, 0, 0, 1],
      output: [0, 0, 0, 1, 0, 0, 0, 0, 0]
    }
];


  
  // Treina a rede neural
  net.train(trainingData, {
    iterations: 2000, // Número de iterações de treinamento
    log: true,        // Log de progresso
    logPeriod: 100,   // Frequência de logs
    learningRate: 0.3 // Taxa de aprendizado
  });
  
  // Função para obter a jogada da rede neural
  function getMove(board) {
    // Flatten o tabuleiro 3x3 em um vetor 1D
    const flattenedBoard = board.flat();
  
    // Obter a saída da rede neural
    const output = net.run(flattenedBoard);
  
    // Encontrar a posição com maior probabilidade
    let bestMoveIndex = 0;
    let highestProb = 0;
  
    for (let i = 0; i < output.length; i++) {
      if (output[i] > highestProb && flattenedBoard[i] === 0) {
        highestProb = output[i];
        bestMoveIndex = i;
      }
    }
  
    // Converter índice 1D de volta para [linha, coluna] no tabuleiro 3x3
    const bestMove = [Math.floor(bestMoveIndex / 3), bestMoveIndex % 3];
    return bestMove;
  }
  