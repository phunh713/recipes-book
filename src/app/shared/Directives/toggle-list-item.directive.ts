import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appToggleListItem]',
})
export class ToggleListItemDirective {
    @HostBinding('class.active') isOpen = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        let thisEle = this.elRef.nativeElement;

        if (thisEle.classList.contains('show') && ((event.target as any).classList.contains('nav-link') || !thisEle.contains(event.target))) {
            thisEle.classList.remove('show');
        }
    }
    constructor(private elRef: ElementRef) {}
}
