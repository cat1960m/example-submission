const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("userId:", request.userId);
  //  logger.info('Body:  ', request.body)
  logger.info("---");
  next();
};

const userExtractor = (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      return authorization.replace("Bearer ", "");
    }
    return null;
  };

  const token = getTokenFrom(request);

  if (token) {
    //request.token = token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken.id) {
      request.userId = decodedToken.id;
    }
  }

  next();
};

const undefinedRoute = (request, response) => {
  info("undefined route", request.path);
  response.status(404).json({ undefinedRoute: request.path });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  undefinedRoute,
  errorHandler,
  userExtractor,
};
