# Cosmink Frontend

[![Lint Status](https://github.com/Nielk74/cosmink/actions/workflows/lint.yml/badge.svg?branch=main)](https://github.com/Nielk74/cosmink/actions/workflows/lint.yml)
[![SonarQube](https://sonarcloud.io/api/project_badges/measure?project=Nielk74_cosmink&metric=alert_status)](https://sonarcloud.io/project/overview?id=Nielk74_cosmink)

Welcome to the frontend service for **Cosmink**, a graphical insights analyzer. This project provides the user interface and client-side functionality to support the visualization and analysis features of Cosmink.

## Project Structure

The frontend is organized into a modular and scalable structure:

```
.
├── app
│   ├── api   
│   ├── import   
│   └── project    
├── components
│   ├── feature  
│   ├── layout  
│   └── ui    
├── public 
├── styles
└── lib 
```

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [pnpm](https://pnpm.io/) (preferred package manager)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nielk74/cosmink
   cd cosmink-frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser at `http://localhost:3000` to view the application.

## Docker

To build and run the application using Docker:

1. Build the Docker image:

   ```bash
   docker build -t cosmink-frontend:latest .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 cosmink-frontend:latest
   ```

3. Open your browser at `http://localhost:3000`.

## Testing

Run linting and tests to ensure code quality:

1. Lint the code:

   ```bash
   pnpm lint
   ```

2. Run tests:

   ```bash
   pnpm test
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

