## Prerequisites

- Node.js
- MongoDB
- Firebase account
- Razorpay account

# Follow the steps properly to run the project successfully

- Clone the repository

```bash
    git clone https://github.com/Aritra212/JobNest.git
```

Now first let's try to run the backend first.

## Steps to run the backend properly

- For the database open your MongoDB and create a **cluster** then within the cluster create a new **database**.
- After creating the database get the connection URL ( e.g. mongodb+srv://**username**:**password**@cluster0.occop3z.mongodb.net/**databasename**?retryWrites=true&w=majority&appName=Cluster0 )
- Open the cloned repository in VS Code (you can use other IDEs also).
- Go to the backend folder and create a **.env** file. Now open the **.env_sample** file and copy all data. After that paste all data in the created **.env** file, then change the values in the **.env** file according to your data. Don't change the name of the variable just change the values according to your need.

  ```bash
    PORT = 8000; // server port number
    MONGODB_URL = "mongodb connection url";

    ADMIN_NAME = "admin name";
    ADMIN_PASS = "admin password";

    // Razorpay credentials
    KEY_ID = "key id";
    KEY_SECRET = "key secret";

    // mail credentials  for sending mails
    EMAIL = "emailid";
    EMAIL_PASSWORD = "app password";

  ```

- Next, open a new Terminal and execute the following commands to run the backend

  ```bash
    cd ./backend
    npm i
    npm start
  ```

Now move on to the frontend setup.

## Steps to run the frontend properly.

- In frontend follow the same procedure to create the **.env** by using **.env_sample** file and fill all values.

  ```bash
    // Firebase credentials
    VITE_API_KEY = "api key";
    VITE_AUTH_DOMAIN = "domain";
    VITE_PROJECT_ID = "project id";
    VITE_BUCKET_ID = "bucket id";
    VITE_MESSAGE_SENDER_ID = "message sender id";
    VITE_APP_ID = "app id";

    // Razorpay credentials
    VITE_RAZORPAY_KEY_ID = "key id";
    VITE_RAZORPAY_KEY_SECRET = "key secret";

    // Backend url prefix
    VITE_BACKEND_URL = "http://127.0.0.1:8000/api/v1";

  ```

- Next, open a new Terminal and execute the following commands to run the frontend

  ```bash
    cd ./frontend
    npm i
    npm run dev
  ```

If you face any problem to run the project contact me - **aritrapaulpc@gmail.com**
