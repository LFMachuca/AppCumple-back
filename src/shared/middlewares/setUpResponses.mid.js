const setUpResponses = (req, res, next) => {
    try {
      const { method, originalUrl: url } = req;
      const messages = {
        200: "Succes",
        201: "Created",
        400: "Client Error",
        401: "Bad Auth",
        403: "Forbidden",
        404: "Not Found",
        500: "Serve Error",
      };
      const successResponse = (code, response, message = messages[code]) => {
        res.status(code).json({ method, url, response, message });
      };
      const errorResponse = (code, errorMessage = messages[code]) => {
        const error = new Error(errorMessage);
        error.statusCode = code;
        throw error;
      };
      res.json200 = (response, message) =>
        successResponse(200, response, message);
      res.json201 = (response, message) =>
        successResponse(201, response, message);
      res.json400 = (response, message) => errorResponse(400, response, message);
      res.json401 = (response, message) => errorResponse(401, response, message);
      res.json403 = (response, message) => errorResponse(403, response, message);
      res.json404 = (response, message) => errorResponse(404, response, message);
      res.json500 = (response, message) => errorResponse(500, response, message);
      next();
    } catch (error) {
      next(error);
    }
  };
  export default setUpResponses;