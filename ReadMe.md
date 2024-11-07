# FinPay - Financial Transaction Management App

## Purpose
Help users manage personal or small business finances, including tracking expenses, income, and budgeting.

## Key Features
- User authentication and dashboard.
- Expense and income tracking with categorization.
- Budget setting and management.
- Reporting tools (monthly summaries, spending insights).
- Payment gateway integration for real-world experience.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ridgebenson/FinPay.git
    cd FinPay
    ```

2. Navigate to the backend directory and install dependencies:
    ```sh
    cd server
    npm install
    ```

3. Navigate to the frontend directory and install dependencies:
    ```sh
    cd ../client
    npm install
    ```

4. Set up the database:
    - Create a PostgreSQL database.
    - Create a `.env` in the `server` directory and in the file, update the database connection string and JWT secret:
        ```plaintext
        DATABASE_URL=your_database_url
        JWT_SECRET=your_jwt_secret
        ```

5. Run database migrations:
    ```sh
    cd ../server
    npx prisma migrate dev --name init
    ```

## Running the Application

1. Start the development backend server:
    ```sh
    npm run dev
    ```

2. Start the development frontend server:
    ```sh
    cd ../client
    npm run dev
    ```

3. Open your browser and access:
    ```
    http://localhost:5173
    ```
