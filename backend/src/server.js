const express = require("express");
const cors = require("cors");
require("dotenv").config();

const interviewRoutes = require("./routes/interviewsRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/interview-requests", interviewRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "Backend running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


