const express = require("express");
const helmet = require("helmet")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {frontendUrl , frontendPort , nodeEnv} = require("../src/config/index");

const app = express();

app.use(helmet());

const allowedOrigins = [
    `${frontendUrl}`,
    `http://localhost:${frontendPort}`,
];

app.use(cors({
    origin: (origin , callback)=>{
        if (!origin) return callback(null , true);
        if (allowedOrigins.includes(origin)) {
            callback(null , true);
        } else {
            callback(new Error("Not allowed by CORS Policy"));
        }
    },
    methods: ["GET" , "POST" , "PUT" , "DELETE" , "PATCH"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(( err , req , res , next )=> {
    const statusCode = err.statusCode || 500;
    const msg = err.message || "Internal Service Error";
  console.error(`[Error Vault] : ${statusCode} - ${msg}`);
    res.status(statusCode).json({
        success: false,
        message: msg,
        stack: nodeEnv === "production" ? null: err.stack
    });
});

module.exports = app;