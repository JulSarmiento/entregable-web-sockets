function notFoundPageError(req, res) {
  res.status(400).json({
    success: false,
    message: `The route "${req.path}" does not exist.`
  });
};

module.exports = notFoundPageError;