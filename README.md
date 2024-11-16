#About application:

This is ToDo application buit from scratch which has mulitple features incluidng user sign, signout, new user registration and existing user sign functionality. Users can add, update, view, delete their daily todo's.
There are 2 project structure deployed in this repository. "react-todo" is the frontend part developed in react.js tech and "server-app" is the backend part which serves as the API and connects to Mongo DB.

#Technologies used:

1. React
2. Node.js
3. Mongo DB

#Run this application:

1. Install the libraries for react-todo
  1. npm i   bootstrap  bootstrap-icons
  2. npm i   react-cookie
  3. npm i   react-router-dom
  4. npm i   formik  yup
  5. npm i   moment
  6. npm i   axios
  7. npm i @mui/material @emotion/react @emotion/styled


2.To Run the react-todo application use below command:
    1.npm start   
    > Then use this url to run the app: http://localhost:3000/
  To test this application
    1.npm test

3. To Run the server-app:
   Install libraries
     1. npm install  express  mongodb  cors  --save
   Use below command to run:
    1. node business-layer.js
For information purpose, server side program will run in ->   http://localhost:4040/routes (this will be internally invoked from react app)
