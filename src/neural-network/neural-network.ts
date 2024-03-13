import { mutateMatrix, crossover } from "../utils";

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export default class NeuralNetwork {
  private weightsInputToHidden: number[][];
  private bias: number = 1;
  constructor(
    public inputLayerSize: number = 4,
    public outputLayerSize: number = 1
  ) {
    // Initialize weights and biases
    this.weightsInputToHidden = this.initializeWeights(
      this.inputLayerSize,
      this.outputLayerSize
    );
  }

  public predict(input: number[]): number[] {
    input.push(this.bias);
    // Perform feedforward calculations
    const hiddenLayerOutput: number[] = this.feedforward(
      input,
      this.weightsInputToHidden
    );
    return hiddenLayerOutput;
  }

  private feedforward(
    inputVector: number[],
    weightsMatrix: number[][]
  ): number[] {
    // Perform calculations for the hidden layer
    const hiddenLayerOutput: number[] = [];
    let weightedSum = 0;
    // Loop through each neuron in the hidden layer
    for (let i = 0; i < weightsMatrix.length - 1; i++) {
      const weight = weightsMatrix[i][0];
      weightedSum += inputVector[i] * weight;
    }
    // Apply activation function (sigmoid) and add as the output value of the neuron
    const neuron: number = sigmoid(weightedSum);
    hiddenLayerOutput.push(neuron);
    return hiddenLayerOutput;
  }

  public mutate(): void {
    this.weightsInputToHidden = mutateMatrix(this.weightsInputToHidden);
  }

  public clone(): NeuralNetwork {
    const clone: NeuralNetwork = new NeuralNetwork(
      this.inputLayerSize,
      this.outputLayerSize
    );
    clone.weightsInputToHidden = this.weightsInputToHidden;
    clone.bias = this.bias;
    return clone;
  }

  public crossover(partner: NeuralNetwork): NeuralNetwork {
    const child: NeuralNetwork = new NeuralNetwork(
      this.inputLayerSize,
      this.outputLayerSize
    );
    child.weightsInputToHidden = crossover(
      this.weightsInputToHidden,
      partner.weightsInputToHidden
    );

    return child;
  }

  private initializeWeights(
    hiddenLayerSize: number,
    outputLayerSize: number
  ): number[][] {
    const weights: number[][] = [];

    for (let i = 0; i < hiddenLayerSize; i++) {
      const neuronWeights: number[] = [];
      for (let j = 0; j < outputLayerSize; j++) {
        const weight: number = Math.floor(Math.random() * 2 - 1);
        neuronWeights.push(weight);
      }
      weights.push(neuronWeights);
    }
    return weights;
  }
}
