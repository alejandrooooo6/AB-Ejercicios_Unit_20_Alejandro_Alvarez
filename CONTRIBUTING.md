# Contributing to Unit 20

This document provides tehcnical guidelines and instructions for developers who want to work on this project.

### Directory Structure

The proejct is structured into separate deliverables (Entregables) to maintain clear isolation:
* **Entregable_1/**: Contains core data extraction and parsing logic.
* **Entregable_2/**: Contains metrics calculation, data analysis, and temrinal tables.
* **Entregable_3/**: Contains historical tracking over time and chart generation.

Inside each deliverable folder, you should follow this organization:
* **src/**: All TypeScript source files (`.ts`).
* **data/**: Raw or processed data files (`.json`).

### Class Architecture & Design Principles

We strictly follwo the **Single Responsibility Principle (SRP)**. Every class must have only one reason to change:
* **JsonFileReader**: Responsible only for reading raw files from the disk and parsing them.
* **StationFilter**: Responsible only for filtering gas stations based on criteria (like province IDs).
* etc ...

### Naming Conventions

To keep the project clean and consistent, follow these naming standards:
* **Classes**: Use **snake_case** (e.g., `data_extractor`, `api_reader`).
* **Variables and Functions**: Use **camelCase** (e.g., `extractedData`, `calculateMeans`, `pastDates`).
* **Configuration Constants**: Use **UPPER_CASE** (e.g., `TARGET_PROVINCES`, `RUTA_ARCHIVO_JSON`).
* **Language**: All code elements, filenames, variables, and comments must be written in **simple English** or **spanish***.

### Code Style Guidelines

* We prioritize readability and simple structures over advanced or complex language features:
* Never hardcode file paths or specific filter IDs inside the logic classes. Always pass them as parameters or configuration variables.

### Testing Workflow

Before submitting any code change, make sure the entire test suite passes perfectly:
1. **Open a new terminal**.
2. **Execute the test suite** using the following command:
   `npm test`
3. **Once finished**, ensrue that no errors appear on the terminal console.