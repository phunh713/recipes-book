import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root',
})
export class RecipeDetailNotFoundGuard implements CanActivate {
    constructor(private recipeService: RecipeService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let id = route.params['id'];
        let recipe = this.recipeService.getRecipeItem(+id);
        console.log(recipe);
        
        return true
    }
}
