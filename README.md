# React-redux-MySQL-Express-CRUD
Fullstack Application using Redux, ORM Sequelize, Express Server and Database MySQL

Learning about basics and understanding about how React Redux works in a full-stack application, also benefit of using ORM in developing backend on Nodejs. 

Notes:
-To set up connections with MySQL we are going to put in a folder called "config".
-To use successful connections for Vite React we need to set up proxy for its file(like we did before in React(in file package.json):
server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",  //our backend port 
        changeOrigin: true,  //allow to change origin 
        secure: false,       //no requirements for encrypted access 
        ws: true,            //allow websocket 
      },
    },
  },
And also cors-headers options in Nodejs:
var corsOptions = {
  origin: "http://localhost:5173",  //though here we can add other options (more at: https://www.npmjs.com/package/cors)
};

//enable cors with provided option access to front-end
app.use(cors(corsOptions));


