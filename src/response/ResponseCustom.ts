import { APIGatewayProxyResult } from 'aws-lambda';

export default class ResponseCustom implements APIGatewayProxyResult {

    statusCode: number;
    headers: { [header: string]: string | number | boolean; } | undefined;
    multiValueHeaders: { [header: string]: (string | number | boolean)[]; } | undefined;
    body: string;
    isBase64Encoded: boolean | undefined;

    constructor(statusCode: number, body: any = {}) {
        this.statusCode = statusCode;
        this.body = JSON.stringify({ body });

        this.headers = { 'Content-Type': 'application/json' };
    }

    public static badRequestJson(): ResponseCustom {
        return new ResponseCustom(400, 'Bad Request');
    }
    public static notFound(): ResponseCustom {
        return new ResponseCustom(404, 'Not found');
    }
   
    respuesta
    toJSON(): APIGatewayProxyResult {
        return {
            statusCode: this.statusCode,
            headers: this.headers,
            multiValueHeaders: this.multiValueHeaders,
            body: this.body,
            isBase64Encoded: this.isBase64Encoded,
        };
    }
}
