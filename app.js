require("dotenv").config();
require("express-async-errors"); // async wrapper
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const psychiatristRouter = require("./routes/psychiatrist");
const patientRouter = require("./routes/patient");
const hospitalRouter = require("./routes/hospital");
const detailsRouter = require("./routes/allDetails");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.get("/", (req, res) => {
    res.send("<h1>Hospital API</h1><a href='/api-docs'>Documentation</a>");
});

app.use("/api/v1/psychiatrists", psychiatristRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/hospitals", hospitalRouter);
app.use("/api/v1/details", detailsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_CONNECT).then(() => {
            console.log("Connected to DB...");
        });
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};
start();
