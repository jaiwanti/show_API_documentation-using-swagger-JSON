
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private swaggerUrl = 'assets/Swagger.json';

  constructor(private http: HttpClient) {}

  getSwaggerData(): Observable<any> {
    return this.http.get(this.swaggerUrl);
  }

  
}
