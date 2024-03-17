# Flappy Bird A.I
an implementation of the classic game Flappy Bird, built entirely using TypeScript, HTML, and CSS.
Enhanced with artificial intelligence (AI) capabilities to enable autonomous gameplay. 

## Overview
The game features an AI-controlled bird that learns to navigate through obstacles using a neural network and a genetic algorithm.
The first time a population of 500 randomly created birds start playing the game, once they all die the best bird is chosen and "bred" passing down the best "genes" for the next generation.
This process which imitates nature's "Survival of the Fittest" eventually generates a population of birds that are able to beat the game.

## Features
-  **Neural Network Implementation:** Each bird in the game is controlled by a neural network, which takes input from the game environment and outputs commands for the bird to move.
-  **NEAT Algorithm:** The NEAT algorithm is used to evolve the neural networks over successive generations, allowing the birds to improve their performance through a process similar to natural selection.
-  **Genetic Algorithm:** The genetic algorithm is employed to select the fittest birds from each generation and create the next generation through crossover and mutation.
