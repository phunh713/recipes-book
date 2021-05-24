import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private recipeService: RecipeService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let recipe = this.recipeService.getRecipeList();
        let onNotFound = () => {
            let id = route.params['id']
            let recipe = this.recipeService.getRecipeItem(+id)
            if (!recipe) {
                this.router.navigate(['/recipes/not-found'])
            }
        }

        //this.recipeService.isDetailShowObs.next(true)

        if (recipe.length === 0) {
            return this.recipeService.getRecipeFromDatabase().pipe(take(1), tap(
                () => {
                    onNotFound()
                }
            ));
        } else {
            onNotFound()
            return recipe
        }
    }
}
