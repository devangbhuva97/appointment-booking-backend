'use strict'

const ErrorType = {
  BAD_REQUEST: {
    message: 'Bad Request',
    statusCode: 400
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    statusCode: 401
  },
  FORBIDDEN: {
    message: 'Forbidden',
    statusCode: 403
  },
  NOT_FOUND: {
    message: 'Not Found',
    statusCode: 404
  },
  METHOD_NOT_ALLOWED: {
    message: 'Method Not Allowed',
    statusCode: 405
  },
  NOT_ACCEPTABLE: {
    message: 'Not Acceptable',
    statusCode: 406
  },
  TOO_MANY_REQUESTS: {
    message: 'Too Many Requests',
    statusCode: 429
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    statusCode: 500
  },
  NOT_IMPLEMENTED: {
    message: 'Not Implemented',
    statusCode: 501
  },
  BAD_GATEWAY: {
    message: 'Bad Gateway',
    statusCode: 502
  },
  SERVICE_UNAVAILABLE: {
    message: 'Service Unavailable',
    statusCode: 503
  },
  GATEWAY_TIMEOUT: {
    message: 'Gateway Timeout',
    statusCode: 504
  }
}

module.exports = { ErrorType }