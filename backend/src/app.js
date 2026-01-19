require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const analyticsRoutes = require("./routes/analyticsRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors()); // allow all localhost requests
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("💰 FinTech Expense Tracker API Running (Localhost)");
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("🗄️ Database connected successfully!");

    app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

  } 
  catch (err) {
    console.error("🚨 Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

