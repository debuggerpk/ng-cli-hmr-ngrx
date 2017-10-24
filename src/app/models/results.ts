export interface ResultInteface {
  name: string;
  alpha2_code: string;
  alpha3_code: string;
}

export interface ResponseInterface {
  messages: string[];
  result: ResultInteface[];
}

export interface RestResponseInterface {
  RestResponse: ResponseInterface;
}
