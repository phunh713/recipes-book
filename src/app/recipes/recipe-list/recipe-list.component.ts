import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { Recipe } from 'src/app/core/model/recipe.model';
import { RecipeService } from 'src/app/core/Services/recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipeList: Recipe[] = [];
    isGettingData: boolean = true;
    pagCurrentIndex: number = 1;
    pagItemPerPage: number = 3;
    totalpagPages!: number;
    categoryFilter: string = 'all';
    recipeObs!: Subscription;

    totalPagPabesSub!: Subscription;
    recipeListChangeSub!: Subscription;

    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.recipeObs = this.recipeService.getRecipeFromDatabase().subscribe((data) => {
            console.log('fetch recipe from server');
        });

        this.recipeListChangeSub = this.recipeService.recipeListChanged.subscribe((data) => {
            if (data) this.recipeList = data;
            this.isGettingData = false;
        });

        this.totalPagPabesSub = this.recipeService.totalPagesObs.subscribe((numberOfPages) => (this.totalpagPages = numberOfPages));

        this.route.queryParams.subscribe((data) => {
            this.categoryFilter = data['category'] ? data['category'] : "all";
            this.pagCurrentIndex = data['page'] ? data['page'] : 1; 
        });

    }

    onChangePag(index: number) {
        this.router.navigate([], {relativeTo: this.route, queryParams: {'page': index + 1}, queryParamsHandling: 'merge'})
        
    }

    onCreateNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.totalPagPabesSub.unsubscribe();
        this.recipeListChangeSub.unsubscribe();
        this.recipeObs.unsubscribe();
    }
}
