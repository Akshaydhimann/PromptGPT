// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";

// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());

// app.use("/api", chatRoutes);

// app.listen(PORT, () => {
//     console.log(`server running on ${PORT}`);
//     connectDB();
// });

// const connectDB = async() => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected with Database!");
//     } catch(err) {
//         console.log("Failed to connect with Db", err);
//     }
// }

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./routes/chat.js";   // path adjust karo agar folder name alag ho

const app = express();
app.use(cors());
app.use(express.json());

// use chat routes
app.use("/api", chatRoutes);

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/promptgpt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

//+++++++++++++++++++++++++++
app.get("/api/thread", (req, res) => {
    res.json([
        { id: 1, name: "Thread 1" },
        { id: 2, name: "Thread 2" },
        { id: 3, name: "Thread 3" },
    ]);
});
//+++++++++++++++++++++++++++

app.listen(8080, () => {
    console.log("✅ Server running on http://localhost:8080");
});


