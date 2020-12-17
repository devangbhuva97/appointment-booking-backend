'use strict'

const { ErrorType } = require('./errors')

class FormatError {
  constructor (customErrors) {    
    this.ErrorType = ErrorType
    
    if (customErrors && Array.isArray(customErrors)) {
      customErrors.forEach(element => {        
        this.ErrorType[element.name] = {
          message: element.message,
          statusCode: element.statusCode
        }
      })
    } else if (customErrors && !Array.isArray(customErrors)) {
      throw new Error('The parameters of the class must be an array')
    }
  }

  getError (err) {
    
    const error = this.ErrorType[err.message]
    
    if (!error) {
      return err.message
    }

    return error
  }
}

module.exports = FormatError