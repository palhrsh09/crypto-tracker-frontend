# Crypto Tracker Frontend

A frontend application built with React that allows users to authenticate, view top 10 cryptocurrencies, and analyze individual coin performance using interactive charts powered by Recharts.

## 🔐 Features

- **User Authentication**  
  - Secure login functionality.
  - Authenticated users are redirected to the dashboard.

- **Dashboard View**
  - Displays the top 10 cryptocurrencies.
  - Shows key data like name, price, market cap, and 24h change.

- **Coin History Charts**
  - On clicking the "Charts" button next to a coin, the app navigates to a detailed chart page.
  - Visualizes historical price data using `Recharts`.

## 🚀 Tech Stack

- **Frontend**: React, Axios, Recharts, React Router
- **Authentication**: JWT-based (token stored in localStorage or cookies)
- **Styling**: Tailwind CSS / SCSS (if applicable)

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/palhrsh09/crypto-tracker-frontend
cd crypto-tracker-frontend
