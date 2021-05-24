import { Ingredient } from './ingredient.model';

export class Recipe {
    constructor(
        public name: string,
        public description: string,
        public imageUrl: string,
        public ingredients: Ingredient[],
        public serving: number,
        public calo: number,
        public time: { hour: number; min: number },
        public category: string,
        public id?: number
    ) {}
}
