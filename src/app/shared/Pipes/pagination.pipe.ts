import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from 'src/app/core/model/recipe.model';
import { RecipeService } from 'src/app/core/Services/recipe.service';

@Pipe({
    name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
    constructor(private recipeService: RecipeService) {}

    transform(array: Recipe[], itemPerPage: number, currentPage: number = 0): Recipe[] {
        if (array.length === 0) return [];
        let result = [];
        let totalPages = Math.ceil(array.length / itemPerPage);
        this.recipeService.totalPagesObs.next(totalPages);

        if (currentPage > totalPages) {
            result = array.slice(totalPages * itemPerPage, array.length);
        } else if (currentPage < 1) {
            result = array.slice(0, itemPerPage);
        } else {
            result = [];
            result = array.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage);
        }

        return result;
    }
}
