import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Recipe } from '../model/recipe.model';
import { AuthDataResponse } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) {}

    getRecipesData(url: string) {
        return this.http.get<Recipe[]>(url);
    }

    putRecipesData(url: string, data: Recipe[]) {
        return this.http.put(url, data);
    }

    postAuthData(url: string, body: { email: string; password: string; returnSecureToken: boolean }) {
        return this.http.post<AuthDataResponse>(url, body).pipe(tap(() => console.log('data in pipe in Data Service')));
    }
}
