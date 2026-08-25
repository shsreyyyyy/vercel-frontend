# E-Shop User Frontend

This is the **User Frontend** of the E-Shop application built using **React and Vite**.

## Features

* User Registration & Login
* OTP Verification
* Forgot Password
* Product Listing
* Category-wise Products
* Product Details
* Add to Cart
* Wishlist
* Order Placement
* Order History
* Order Cancellation
* Order Status Tracking
* Responsive UI

## Tech Stack

* React
* Vite
* React Router DOM
* Axios
* React Toastify
* React Icons
* Tailwind CSS

## Installation

Open the **User Frontend** folder:

```bash
cd frontends/ecomerce
```

Install all required dependencies:

```bash
npm install
```

> **Note:** All required packages are already listed in `package.json`.
> You do **not** need to install Vite, React Router, Axios, React Toastify, React Icons or Tailwind CSS separately.

### Included Dependencies

The project already includes:

* Vite
* React Router DOM
* Axios
* React Toastify
* React Icons
* Tailwind CSS

Therefore, **only `npm install` is required** after downloading/cloning the project.

## Run the Project

```bash
npm run dev
```

The application will start on the Vite development server.

## Backend Connection

Make sure the Backend server is running before using features such as:

* Login / Registration
* Products
* Cart
* Wishlist
* Orders

The frontend communicates with the backend using Axios.

## Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```
