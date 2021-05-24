import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from 'src/app/core/model/recipe.model';

@Pipe({
    name: 'recipeFilter',
})
export class RecipeFilterPipe implements PipeTransform {
    transform(array: Recipe[], category: string = 'all'): Recipe[] {
        if (category === 'all') return array;
        return array.filter((item) => item.category === category);
    }
}
