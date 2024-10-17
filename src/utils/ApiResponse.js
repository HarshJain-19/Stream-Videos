class ApiResponse {
  constructor (statusCode, data, message="Success") {
    this.statusCode = statusCode;
    this.data = data || null;
    this.mesage = message;
    this.success = statusCode<400;
  }
};

export default ApiResponse;

