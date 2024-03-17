# Flappy Bird A.I
An implementation of the classic game Flappy Bird, built entirely using TypeScript, HTML, and CSS.
Enhanced with artificial intelligence (AI) capabilities to enable autonomous gameplay. 

## Overview
The game features an AI-controlled bird that learns to navigate through obstacles using a neural network and a genetic algorithm.

The first population generated consists of 500 randomly created birds that start playing the game, once they all die the best bird is chosen and "bred" passing down the best "genes" for the next generation:

![FirstGen](https://github.com/cohen-tal/Flappy-Bird-A.I/assets/157098453/7bc7f142-57c0-450c-a1cc-26a155abdbbe)

This process eventually generates a population of birds that are able to beat the game:

![BestGen](https://github.com/cohen-tal/Flappy-Bird-A.I/assets/157098453/7c5fe6d5-3708-4bef-807d-aa353ff06425)

## Features
-  **Neural Network Implementation:** Each bird in the game is controlled by a neural network, which takes input from the game environment and outputs commands for the bird to move.
-  **NEAT Algorithm:** The NEAT algorithm is used to evolve the neural networks over successive generations, allowing the birds to improve their performance through a process similar to natural selection ("Survival of the Fittest").
-  **Genetic Algorithm:** The genetic algorithm is employed to select the fittest birds from each generation and create the next generation through crossover and mutation.

## How It Works
### Brain
Each bird has it's own Neural-Network instance, also known as the "brain" of the bird. The Neural-Network is incharge of controlling the birds decision.

### Vision
Each bird can "see" the following:
1. Vertical Distance to the closest top pipe.
2. Vertical Distance to the closest bottom pipe.
3. Linear Distance to the center passage between the two pipes.

![Distances](https://github.com/cohen-tal/Flappy-Bird-A.I/assets/157098453/5cc4a2af-f2e4-44f2-9eb9-4ce176b0e49e)

### Decision
After passing the input to the Neural-Network, an output is produced, deciding wheter the bird should flap its wings or not.

## Tech Used
- TypeScript
- HTML5
- CSS
- Webpack for bundling
  
 ***Note: NO frameworks or AI libraries were used in this project*** 
