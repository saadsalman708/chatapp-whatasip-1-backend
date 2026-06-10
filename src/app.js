const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {frontendUrl , frontendPort , nodeEnv, backendPort} = require("../src/config/index");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(helmet());

const allowedOrigins = [
    `${frontendUrl}`,
    `http://localhost:${frontendPort}`,
    `http://localhost:${backendPort}`
];

app.use(cors({
    origin: (origin , callback)=>{
        if (!origin) return callback(null , true);
        if (allowedOrigins.includes(origin)) {
            return callback(null , true);
        } else {
            return callback(new Error("Not allowed by CORS Policy"));
        }
    },
    // methods: ["GET" , "POST" , "PUT" , "DELETE" , "PATCH"],
    credentials: true,
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth" , authRouter);

app.use(( err , req , res , next )=> {
    const statusCode = err.statusCode || 500;
    const msg = err.message || "Internal Service Error";
  console.error(`[Error Vault] : ${statusCode} - ${msg}`);
    res.status(statusCode).json({
        success: false,
        message: msg,
        // stack: nodeEnv === "production" ? null: err.stack
    });
});

module.exports = app;