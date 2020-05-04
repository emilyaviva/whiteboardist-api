const errorHandler = (err, req, res, next) => {
  console.error('__SERVER_ERROR__', err);
  res.status(500).json({ error: err.toString() });
};

export default errorHandler;
