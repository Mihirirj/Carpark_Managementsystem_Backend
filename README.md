# Car Park System  

## Description  
The Car Park System is a Node.js based application with a React.js frontend, designed to manage parking reservations, track available spots, and facilitate secure user authentication. It integrates MySQL for data storage and includes automated tasks using Node-Cron. The system also supports email notifications via Node-Mailer and ensures secure transactions with an integrated PayHere payment gateway for seamless online payments. 

## Features  
- User Authentication: Secure login and signup with JWT-based authentication.
- Parking Management: Track available parking spaces and manage reservations.
- Automated Tasks: Scheduled operations using node-cron (e.g., clearing expired reservations).
- Email Notifications: Send booking confirmations and alerts using node-mailer.
- Security: Uses crypto-js for encryption and secure storage of sensitive data.
- Cross-Origin Support: Enabled via cors for smooth frontend-backend communication.
- Payment System: Integrated PayHere payment gateway for secure and seamless online transactions

## Tech Stack  
- Backend: Node.js, Express
- Frontend: React.js
- Database: MySQL  
- Security: JWT, Crypto-JS  
- Utilities: Axios, Node-Cron, Node-Mailer  
- Environment Management: Dotenv  

## Installation  

### Clone the repository  
```bash
git clone https://github.com/yourusername/car-park-system.git
cd car-park-system
Install dependencies
npm install

Running the Project
npm start
Create a .env file in the root directory and add the required environment variables
DB_HOST=your_database_host  
DB_USER=your_database_user  
DB_PASSWORD=your_database_password  
DB_NAME=your_database_name  
JWT_SECRET=your_secret_key  

Notes
node_modules is not included in the repository. Run npm install to install dependencies.
