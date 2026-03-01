# Digital Image Processing Interactive Quiz

This project is a learning tool designed for students to visualize and calculate image processing operations on a coordinate grid.

## Core Features
* **10x10 Global Matrix:** Input custom pixel values or generate random noise.
* [cite_start]**Neighborhood Logic:** Supports calculations for 4-neighbors, 8-neighbors, and diagonal neighbors. [cite: 56, 57, 58]
* **Distance Metrics:** Instant calculation of:
    * [cite_start]**City-block Distance (D4)** [cite: 5]
    * [cite_start]**Chessboard Distance (D8)** [cite: 21]
    * [cite_start]**Euclidean Distance (De)** [cite: 38]
* [cite_start]**Spatial Transformations:** * Shift the 3x3 window (e.g., 1 pixel right, 2 pixels down). [cite: 60, 61]
    * [cite_start]Rotate sub-matrices (e.g., 90-degree right rotation). [cite: 62]

## How to Use
1. Enter your pixel values in the 10x10 grid.
2. Use the transformation buttons to move your active 3x3 window.
3. Input coordinates (P and Q) to verify distance math results.
