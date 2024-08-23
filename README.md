# fullstack blog project using 
# Blog App

This is a blog application built using React for the frontend and Appwrite for the backend. The app provides user authentication and functionality to create, update, and delete both content and images. User data is managed using the React Redux Toolkit.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Create, Update, Delete Content**: Users can create new blog posts, update existing ones, and delete posts.
- **Image Management**: Users can upload images to their blog posts, update them, and delete them.
- **State Management**: User data is stored and managed using the React Redux Toolkit.
- **Backend Functionality**: Appwrite is used for managing backend operations including authentication, database interactions, and file storage.

## Technologies Used

- **Frontend**: React
- **State Management**: React Redux Toolkit
- **Backend**: Appwrite

## Getting Started

### Prerequisites

- Node.js installed
- Appwrite server set up

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/zenitssuu/Project-DailyBlog.git
    cd Project-DailyBlog.git
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Set up Appwrite:
    - Follow the [Appwrite documentation](https://appwrite.io/docs) to set up your Appwrite server.
    - Create a new project in Appwrite.
    - Set up authentication (email/password).
    - Create collections for storing blog posts and images.
    - Set up Appwrite storage for handling image uploads.

4. Configure environment variables:
    - Create a `.env` file in the root directory of your project.
    - Add the necessary environment variables for your Appwrite setup:
        ```
        REACT_APP_APPWRITE_ENDPOINT=<Your Appwrite Endpoint>
        REACT_APP_APPWRITE_PROJECT=<Your Appwrite Project ID>
        REACT_APP_APPWRITE_API_KEY=<Your Appwrite API Key>
        ```

### Running the App

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:5173`.

## Usage

### Authentication

- **Sign Up**: Create a new account by providing an email and password.
- **Log In**: Log in to your account with your email and password.
- **Log Out**: Log out from your account.

### Blog Management

- **Create Post**: Click on "Create New Post" to add a new blog post. You can also upload an image with your post.
- **Update Post**: Click on an existing post to edit its content or image.
- **Delete Post**: Click on the delete button on a post to remove it.


## Project Structure

```plaintext
your-blog-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header section
│   │   │   ├── Logout function
│   │   │   |-- Nav section  
|   |   |
│   │   ├── Footer/
│   │   │   ├── Footer section
│   │   │   ├── Links 
│   │   │   
│   │   |── Post Form/
│   │   |   └── React hook form for post management
│   │   |
|   |   |-- AuthLayout , Button, Input, Login, Logo, PostCard, RTE, Select , SingnUp
|   |   |
|   |   |
│   ├── features/
│   │   ├── authSlice.js
│   │   └── postSlice.js
│   │
│   ├── Appwrite services/
│   │   └── user services
|   |   |-- post services 
|   |
|   |___ Pages
│   │ 
│   ├── App.js
│   ├── main.js
│   └── store /
|   |  |- Store for user information
│
├── .env
├── package.json
└── README.md