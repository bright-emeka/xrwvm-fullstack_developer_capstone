# Full Stack Developer Capstone Project

## Project Overview

This repository contains a full stack dealership review application built with:
- Django for the primary backend and static page routing
- React for the frontend UI
- Node.js + Express + MongoDB for the dealership API service
- Flask + NLTK for sentiment analysis

The app allows users to browse car dealerships, view dealer details, and submit reviews. Reviews are analyzed for sentiment before display.

## Repository Structure

- `server/`
  - `manage.py` - Django management entrypoint
  - `requirements.txt` - Python dependencies for Django
  - `db.sqlite3` - local Django SQLite database
  - `djangoproj/` - Django project settings, URLs, WSGI/ASGI
  - `djangoapp/` - Django app with views, REST integration, and microservice support
  - `database/` - Node.js/Express API service and MongoDB Docker compose definition
  - `frontend/` - React source and build assets
  - `static/` - compiled frontend assets served by Django
  - `deployment.yaml` - Kubernetes deployment manifest for the dealership service

- `LICENSE` - Apache 2.0 license

## Key Features

- Browse and filter dealerships by state
- View dealer details and customer reviews
- Submit new reviews with purchase metadata
- Sentiment analysis for posted reviews via Flask microservice
- MongoDB database service for dealership and review data

## Prerequisites

- Python 3.x
- Node.js and npm
- Docker / Docker Compose
- Git

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ibm-developer-skills-network/xrwvm-fullstack_developer_capstone.git
   cd xrwvm-fullstack_developer_capstone
   ```

2. Install Django backend dependencies:

   ```bash
   cd server
   pip install -r requirements.txt
   ```

3. Install the Node API dependencies:

   ```bash
   cd server/database
   npm install
   ```

4. Install the React frontend dependencies:

   ```bash
   cd server/frontend
   npm install
   ```

## Running the Project Locally

1. Start MongoDB and API service:

   ```bash
   cd server/database
   docker-compose up -d
   node app.js
   ```

   The API service listens on `http://localhost:3030`.

2. Start the sentiment analysis microservice:

   ```bash
   cd server/djangoapp/microservices
   python app.py
   ```

   The sentiment service listens on `http://localhost:5000`.

3. Start the Django server:

   ```bash
   cd server
   python manage.py runserver
   ```

   The Django frontend is available at `http://127.0.0.1:8000/`.

## Environment Variables

The Django app reads the following environment variables from `server/djangoapp/.env`:

- `backend_url` - URL of the Node.js dealership API (default: `http://localhost:3030`)
- `sentiment_analyzer_url` - URL of the sentiment analysis service (default: `http://localhost:5000/`)

## Usage

- Open `http://127.0.0.1:8000/` in your browser.
- Use `/login` to sign in.
- Browse dealers at `/dealers`.
- View dealer details at `/dealer/<id>`.
- Post a review at `/postreview/<id>`.

## Notes

- The Node API reads seeded data from `server/database/data/*.json` and stores it in MongoDB.
- The React app in `server/frontend/src` powers the dealer listing, detail view, and review submission UI.
- The Django project serves the static frontend and routing templates from `server/static`.
- The `deployment.yaml` file is provided for containerized deployment of the dealership service.

## License

This project is licensed under the Apache License 2.0.
