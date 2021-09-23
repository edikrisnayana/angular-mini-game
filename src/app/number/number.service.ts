import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Numbers } from './numbers';
import { Response } from './response';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor(private http: HttpClient) { }

    numbersUrl = 'assets/numbers.json';
    numbersApiUrl = 'http://localhost:8001/numbers/500';

    getNumbers(): Observable<Response> {
      return this.http.get<Response>(this.numbersUrl);
    }
}
