export class HttpException extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
