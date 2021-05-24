import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class IngredientsService {
    apiKey: string = '910942573aef483c82058a9f60587b45';
    searchUrl: string = 'https://api.spoonacular.com/food/ingredients/search';

    constructor(private http: HttpClient) {}

    getIngredientByName(searchStr: string) {
        let myParams = new HttpParams().set('apiKey', this.apiKey);
        myParams = myParams.append('query',searchStr)

        return this.http.get<any>('https://api.spoonacular.com/food/ingredients/search', {
            params: myParams
        })
    }

    getIngredientId(searchStr: string) {
        return this.getIngredientByName(searchStr).pipe(
            map(data => data.results[0].id)
        )
    }

    getIngredientInfo(id: number) {
        return this.http.get<any>(`https://api.spoonacular.com/food/ingredients/${id}/information`, {
            params: new HttpParams().set('apiKey', this.apiKey)
        }).pipe(
            map(data => {
                return {
                    name: data.nameClean,
                    imgUrl: `https://spoonacular.com/cdn/ingredients_500x500/${data.image}`,
                    nutrition: data.nutrition,
                    unit: data.possibleUnits
                }
            })
        )
    }
}
