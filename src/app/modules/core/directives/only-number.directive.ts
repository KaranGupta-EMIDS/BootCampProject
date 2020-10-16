import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {

    constructor(private el: ElementRef) { }

    @Input() OnlyNumber: boolean;
    @Input() AllowNegative: boolean = false;
    @Input() AllowGreaterThan: boolean = true;
    @Input() AllowPrecision: boolean = true;
    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;
        if (this.OnlyNumber) {
            if(!this.AllowGreaterThan && (e.shiftKey && e.keyCode == 190)){
                e.preventDefault();
            }
            if(!this.AllowPrecision && e.keyCode == 190){
                e.preventDefault();
            }
            if ([46, 8, 9, 27, 17, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                (e.keyCode == 65 && e.ctrlKey === true) ||
                (e.keyCode == 86 && e.ctrlKey === true) ||
                (e.keyCode == 67 && e.ctrlKey === true) ||
                (e.keyCode == 88 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            if(this.AllowNegative && e.keyCode == 189){
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }
    }
}
