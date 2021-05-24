import { Component, OnInit, Input, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/core/model/recipe.model';
import { RecipeService } from 'src/app/core/Services/recipe.service';
import { Subscription } from 'rxjs';
import { concatMap, exhaustMap, map, mergeMap, skip, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
    recipe!: Recipe | undefined;
    recipeIndex!: number;
    isImgLoaded: boolean = false;
    imgPlaceholder: string = '../../../assets/images/placeholder.png';

    paramSub!: Subscription;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        //USING RESOLVER:
        // this.paramSub = this.route.params.subscribe((params) => {
        //     this.recipeIndex = +params['id'];
        //     this.recipe = this.recipeService.getRecipeItem(+params['id']);
        //     this.isImgLoaded = false;
        // });


        //NOT USING RESOLVER:
        this.paramSub = this.route.params
            .pipe(
                tap((params: Params) => (this.recipeIndex = +params['id'])),
                switchMap(() => this.recipeService.recipeListChanged)
            )
            .subscribe((data) => {
                this.recipe = this.recipeService.getRecipeItem(this.recipeIndex);
                this.isImgLoaded = false;
                if (data && !this.recipe) this.router.navigate(['/recipes/not-found'])
            });
    }

    addIngredientToShoppingList() {
        if (this.recipe) this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    removeRecipe() {
        this.recipeService.removeRecipe(this.recipeIndex);
        this.router.navigate(['../'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }

    ngOnDestroy() {
        this.paramSub.unsubscribe();
    }
}
