import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// setting for handling json
app.use(
  express.json({
    limit: "16kb",
  })
);

//setting for URLS
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

//config cookie-parse
app.use(cookieParser());

export { app };
