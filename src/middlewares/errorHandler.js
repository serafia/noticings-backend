export function errorHandler(error, req, res, next) {
  console.error(error);

  res.status(error.statusCode || 500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
}
