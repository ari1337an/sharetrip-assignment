const requestSuccessOutputWrapper = (message: any) => {
  return {
    status: "OK",
    response: message
  }
}

const requestFailedOutputWrapper = (message: any) => {
  return {
    status: "FAILED",
    response: message
  }
}

const exportObjects = {
  requestSuccessOutputWrapper,
  requestFailedOutputWrapper
}

export default exportObjects