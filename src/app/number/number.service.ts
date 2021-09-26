import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Numbers } from './numbers';
import { Response } from './response';
import { Request } from './request';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor(private http: HttpClient) { }

    numbersUrl = 'assets/numbers.json';
    numberBaseApiUrl = "http://192.168.0.180:8001/numbers/"

    getNumbers(maxNumber: number): Observable<Response> {
      return this.http.get<Response>(this.numberBaseApiUrl + maxNumber);
    }

    getPredictionNumber(request: Request): Observable<number> {
      return this.http.post<number>(this.numberBaseApiUrl + "evaluate", request);
    }
}
