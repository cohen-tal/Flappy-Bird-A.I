// import { mutateMatrix, mutateVector } from "../utils";

// export default class NeuralNetwork {
//   private weightsInputToHidden: number[][];
//   private weightsHiddenToHidden2: number[][];
//   private weightsHidden2ToOutput: number[][];
//   private inputBiasVector: number[];
//   private hiddenBiasVector: number[];
//   private hidden2BiasVector: number[];
//   constructor(
//     public inputLayerSize: number = 5,
//     public hiddenLayerSize: number = 4,
//     public hiddenLayer2Size: number = 4,
//     public outputLayerSize: number = 3
//   ) {
//     // Initialize weights and biases
//     this.weightsInputToHidden = this.initializeWeights(
//       this.inputLayerSize,
//       this.hiddenLayerSize
//     );
//     this.weightsHiddenToHidden2 = this.initializeWeights(
//       this.hiddenLayerSize,
//       this.hiddenLayer2Size
//     );
//     this.weightsHidden2ToOutput = this.initializeWeights(
//       this.hiddenLayer2Size,
//       this.outputLayerSize
//     );
//     this.inputBiasVector = this.initializeBiasVector(this.inputLayerSize);
//     this.hiddenBiasVector = this.initializeBiasVector(this.hiddenLayerSize);
//     this.hidden2BiasVector = this.initializeBiasVector(this.hiddenLayer2Size);
//   }

//   public predict(input: number[]): number[] {
//     // Perform feedforward calculations
//     const hiddenLayerOutput: number[] = this.feedforward(
//       input,
//       this.weightsInputToHidden,
//       this.inputBiasVector
//     );
//     const hiddenLayer2Output: number[] = this.feedforward(
//       hiddenLayerOutput,
//       this.weightsHiddenToHidden2,
//       this.hiddenBiasVector
//     );
//     const outputLayerOutput: number[] = this.feedforward(
//       hiddenLayer2Output,
//       this.weightsHidden2ToOutput,
//       this.hidden2BiasVector
//     );

//     return outputLayerOutput;
//   }

//   private feedforward(
//     inputVector: number[],
//     weightsMatrix: number[][],
//     biasVector: number[]
//   ): number[] {
//     // Perform calculations for the hidden layer
//     const hiddenLayerOutput: number[] = [];

//     // Loop through each neuron in the hidden layer
//     for (let i = 0; i < weightsMatrix.length - 1; i++) {
//       let weightedSum = 0;

//       // Loop through each neuron in the input layer
//       for (let j = 0; j < inputVector.length - 1; j++) {
//         weightedSum += inputVector[j] * weightsMatrix[i][j] + biasVector[i];
//       }

//       // Apply activation function (sigmoid) and add as the output value of the neuron
//       const neuron: number = this.relu(weightedSum);
//       hiddenLayerOutput.push(neuron);
//     }

//     return hiddenLayerOutput;
//   }

//   public mutate(): void {
//     this.weightsInputToHidden = mutateMatrix(this.weightsInputToHidden);
//     this.weightsHiddenToHidden2 = mutateMatrix(this.weightsHiddenToHidden2);
//     this.weightsHidden2ToOutput = mutateMatrix(this.weightsHidden2ToOutput);

//     this.inputBiasVector = mutateVector(this.inputBiasVector);
//     this.hiddenBiasVector = mutateVector(this.hiddenBiasVector);
//     this.hidden2BiasVector = mutateVector(this.hidden2BiasVector);
//   }

//   public clone(): NeuralNetwork {
//     const clone: NeuralNetwork = new NeuralNetwork(
//       this.inputLayerSize,
//       this.hiddenLayerSize,
//       this.hiddenLayer2Size,
//       this.outputLayerSize
//     );
//     clone.weightsInputToHidden = this.weightsInputToHidden;
//     clone.weightsHiddenToHidden2 = this.weightsHiddenToHidden2;
//     clone.weightsHidden2ToOutput = this.weightsHidden2ToOutput;
//     clone.inputBiasVector = this.inputBiasVector;
//     clone.hiddenBiasVector = this.hiddenBiasVector;
//     clone.hidden2BiasVector = this.hidden2BiasVector;
//     return clone;
//   }

//   public crossover(partner: NeuralNetwork): NeuralNetwork {
//     const child: NeuralNetwork = new NeuralNetwork(
//       this.inputLayerSize,
//       this.hiddenLayerSize,
//       this.hiddenLayer2Size,
//       this.outputLayerSize
//     );
//     child.weightsInputToHidden = this.crossoverMatrix(
//       this.weightsInputToHidden,
//       partner.weightsInputToHidden
//     );
//     child.weightsHiddenToHidden2 = this.crossoverMatrix(
//       this.weightsHiddenToHidden2,
//       partner.weightsHiddenToHidden2
//     );
//     child.weightsHidden2ToOutput = this.crossoverMatrix(
//       this.weightsHidden2ToOutput,
//       partner.weightsHidden2ToOutput
//     );

//     child.inputBiasVector = this.crossoverVector(
//       this.inputBiasVector,
//       partner.inputBiasVector
//     );
//     child.hiddenBiasVector = this.crossoverVector(
//       this.hiddenBiasVector,
//       partner.hiddenBiasVector
//     );
//     child.hidden2BiasVector = this.crossoverVector(
//       this.hidden2BiasVector,
//       partner.hidden2BiasVector
//     );

//     return child;
//   }

//   private relu(x: number): number {
//     return Math.max(0, x);
//   }

//   private initializeWeights(
//     hiddenLayerSize: number,
//     outputLayerSize: number
//   ): number[][] {
//     const weights: number[][] = [];

//     for (let i = 0; i < hiddenLayerSize; i++) {
//       const neuronWeights: number[] = [];
//       for (let j = 0; j < outputLayerSize; j++) {
//         const weight: number = Math.floor(Math.random() * 2 - 1);
//         neuronWeights.push(weight);
//       }
//       weights.push(neuronWeights);
//     }

//     return weights;
//   }

//   private initializeBiasVector(size: number): number[] {
//     const biasVector: number[] = [];
//     for (let i = 0; i < size; i++) {
//       biasVector.push(Math.floor(Math.random() * 2 - 1));
//     }
//     return biasVector;
//   }
// }
