const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);
    

  //duplicate key(mongo)
   if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    return res.status(400).json({
      status: "fail",
      message: `${field} already exists`
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token"
    });
  }
    if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "fail",
      message: "Token expired. Please login again."
    });
  }


  // Validation errors (mongoose)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "fail",
      message: Object.values(err.errors).map(e => e.message).join(", ")
    });
  }

  //default
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Something went wrong on the server."
  });
};

module.exports = errorHandler;