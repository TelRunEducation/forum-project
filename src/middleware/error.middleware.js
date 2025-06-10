const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  if (err.message && err.message.includes('not found')> 0) {
    return res.status(404).send({
      code: 404,
      status: 'Not Found',
      message: err.message,
      path: req.path,
    })
  }

  if (err.message && err.message.toLowerCase().includes('bad request')> 0) {
    return res.status(400).send({
      code: 400,
      status: 'Bad Request',
      message: err.message,
      path: req.path,
    })
  }

  if (err.name === 'CastError' ) {
    return res.status(400).send({
      code: 400,
      status: 'Bad Request. Invalid input data',
      message: err.message,
      path: req.path,
    })
  }

  if (err.message.toLowerCase() === BAD_CREDENTIALS.toLowerCase() ) {
    return res.status(409).send({
      code: 409 ,
      status: 'Confilct',
      message: err.message,
      path: req.path,
    })
  }

  return res.status(500).send({
    code: 500,
    status: 'InternalServerError',
    message: err.message,
    path: req.path,
  })
}

export default errorHandler;