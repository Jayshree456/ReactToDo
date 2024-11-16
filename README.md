#About application:

This is ToDo application buit from scratch which has mulitple features incluidng user sign, signout, new user registration and existing user sign functionality. Users can add, update, view, delete their daily todo's.
There are 2 project structure deployed in this repository. "react-todo" is the frontend part developed in react.js tech and "server-app" is the backend part which serves as the API and connects to Mongo DB.

#Technologies used:

1. React
2. Node.js
3. Mongo DB

#Run this application:

1. Install the libraries for react-todo
  npm i   bootstrap  bootstrap-icons
  npm i   react-cookie
  npm i   react-router-dom
  npm i   formik  yup
  npm i   moment
  npm i   axios
  npm i @mui/material @emotion/react @emotion/styled

  To Run the react-todo:
    >npm start
    > Then use this url to run the app: http://localhost:3000/
  To test this application
    >npm test

2. To Run the server-app:
   Install libraries
   npm install  express  mongodb  cors  --save
>node business-layer.js
For information purpose, server side program will run in ->   http://localhost:4040/routes (this will be internally invoked from react app)
