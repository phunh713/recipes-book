import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Ingredient } from '../model/ingredient.model';
import { Recipe } from '../model/recipe.model';
import { DataService } from './data.service';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    recipeListChanged = new BehaviorSubject<Recipe[] | null>(null);
    // recipeListChanged = new Subject<Recipe[]>(); //Must be subjectBehavior for recipesDetail to work
    totalPagesObs =  new Subject<number>();
    
    isFetched: boolean = false;
    url: string = 'https://angular-udemy-project-dd66c-default-rtdb.firebaseio.com/recipes.json';

    private recipeList: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService, private dataService: DataService) {}

    getRecipeFromDatabase() {
        return this.dataService.getRecipesData(this.url).pipe(
            tap((data) => {
                if (data) this.setRecipes(data);
            })
        );
    }

    setRecipes(recipes: Recipe[]) {
        this.recipeList = recipes;
        this.recipeListChanged.next(this.recipeList.slice());
        this.isFetched = true;
    }

    getRecipeList() {
        return this.recipeList.slice();
    }

    getRecipeItem(index: number) {
        let recipe!: Recipe;

        for (let item of this.recipeList) {
            if (item.id == index) {
                recipe = item;
                return recipe;
            }
        }
        return recipe;
    }

    addNewRecipe(recipe: Recipe) {
        this.recipeList.push({ ...recipe, id: this.recipeList.length });
        this.recipeListChanged.next(this.recipeList.slice());
        this.updateData();
    }

    updateData() {
        this.dataService.putRecipesData(this.url, this.recipeList).subscribe();
    }

    updateRecipeItem(index: number, recipe: Recipe) {
        this.recipeList[index] = { ...recipe, id: index };
        this.updateData();
        this.recipeListChanged.next(this.recipeList.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.isAdd = true;
        this.shoppingListService.addIngredientsFromRecipe(ingredients);
    }

    removeRecipe(index: number) {
        this.recipeList.splice(index, 1);

        //update ID
        for (let i = index; i < this.recipeList.length; i++) {
            this.recipeList[i].id = i;
        }
        this.recipeListChanged.next(this.recipeList.slice());
        this.updateData();
    }
}
