import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from 'src/app/core/model/recipe.model';
import { AlertService } from 'src/app/core/Services/alert.service';
import { RecipeService } from 'src/app/core/Services/recipe.service';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
    @Input() recipe!: Recipe;
    @Input() index!: number | undefined;
    isImgLoaded: boolean = false;
    imgPlaceholder: string = "../../../assets/images/placeholder.png";


    constructor(private recipeService: RecipeService, private alertService: AlertService) {}

    ngOnInit(): void {}

    onClick() {
    }

}