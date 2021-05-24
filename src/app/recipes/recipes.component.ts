import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, DoCheck, HostListener, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { RecipeService } from '../core/Services/recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit, OnDestroy, DoCheck {
    FiltersArray = ['all', 'cakes', 'chicken', 'pork', 'beef', 'seafood'];
    isChecked!: string;
    isDetailShow!: boolean;
    screenSize!: number;
    onRouterChangeSub!: Subscription;

    testData!: any;

    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2) {
        this.screenSize = window.screen.availWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenSize = event.target.innerWidth;
        this.addScreenLockClass();
    }

    ngDoCheck() {}

    ngOnInit(): void {
        this.isDetailShow = this.route.snapshot.firstChild?.url.length === 0 ? false : true;
        this.addScreenLockClass();

        this.onRouterChangeSub = this.router.events
            .pipe(
                filter((data) => data instanceof NavigationEnd),
                switchMap(() => {
                    return of(this.route.firstChild);
                })
            )
            .subscribe((data: any) => {
                this.isDetailShow = data.snapshot.url.length === 0 ? false : true;
                this.addScreenLockClass();
            });

        this.route.queryParams.subscribe((data) => {
            if (!data['category']) {
                this.isChecked = 'all';
            } else {
                this.isChecked = data['category'];
            }
        });
    }
    onFilter(category: string) {
        this.router.navigate(['/recipes'], { queryParams: { category: category, page: 1 }, queryParamsHandling: 'merge' });
    }

    addScreenLockClass() {
        if (this.isDetailShow && this.screenSize < 992) {
            this.renderer.addClass(document.body, 'scroll-lock');
        } else {
            this.renderer.removeClass(document.body, 'scroll-lock');
        }
    }

    ngOnDestroy() {
        this.onRouterChangeSub.unsubscribe();
    }
}
