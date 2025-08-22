# 🌦️ Weather Dashboard Setup Steps

setup:
  prerequisites:
    - Node.js (v18+ recommended)
    - MongoDB Atlas account
    - OpenWeatherMap API key

  steps:
    frontend:
      description: "Set up the frontend (React + Vite + Tailwind CSS)"
      steps:
        - "Navigate to the frontend directory:"
          command: "cd frontend"
        
        - "Install frontend dependencies:"
          command: "npm install"
        
        - "Create a .env file in the frontend directory and add the following variable:"
          command: |
            echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env
        
        - "Run the frontend development server:"
          command: "npm run dev"
        
        - "Frontend will be accessible at http://localhost:5173"
  steps:
    backend:
      description: "Set up the backend (Node.js + Express + MongoDB)"
      steps:
        - "Navigate to the backend directory:"
          command: "cd backend"
        
        - "Install backend dependencies:"
          command: "npm install"
        
        - "Create a .env file in the backend directory and add the following variables:"
          command: |
            echo "PORT=5000" > .env
            echo "MONGODB_URI=your_mongo_connection_uri" >> .env
            echo "OPENWEATHER_API_KEY=your_openweather_api_key" >> .env
            echo "CLIENT_ORIGIN=http://localhost:5173" >> .env
            echo "CACHE_TTL_MINUTES=10" >> .env
        
        - "Start the backend server:"
          command: "npm start"
        
        - "Backend will be accessible at http://localhost:5000"
