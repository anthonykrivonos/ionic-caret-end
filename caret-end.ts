/*
      Developed By Anthony Krivonos
      Use With Attribution
      October 2017
 */

import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
      selector: '[caret-end]'
})
export class CaretEndDirective {

      input:HTMLInputElement;
      textarea:HTMLInputElement;

      constructor(public element: ElementRef, public renderer: Renderer) {}

      ngAfterViewInit():void {
            this.input = this.element.nativeElement.querySelector("input");
            this.textarea = this.element.nativeElement.querySelector("textarea");
            var tagName = this.element.nativeElement.tagName.toLowerCase();
            if (tagName == 'ion-input') {
                  this.input.onfocus = () => {
                        this.moveCursorToEnd(this.input);
                  };
            } else if (tagName == 'ion-textarea') {
                  this.textarea.onfocus = () => {
                        this.moveCursorToEnd(this.textarea);
                  };
            }
      }

      moveCursorToEnd(el):void {
            if (typeof el.selectionStart == "number") {
                  el.selectionStart = el.selectionEnd = el.value.length;
            } else if (typeof el.createTextRange != "undefined") {
                  el.focus();
                  var range = el.createTextRange();
                  range.collapse(false);
                  range.select();
            }
      }
}
