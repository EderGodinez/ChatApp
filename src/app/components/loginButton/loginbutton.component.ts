import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'loginButtonComponent',
  standalone: true,
  imports: [
    CommonModule,

  ],
  template: `
  <div class="container">
    <button class="button"  #LoginButton>
    <i [class]="getclassIcon()" style="font-size: 1.3rem;"></i>
    </button>
</div>
  `,
  styleUrls: ['./loginbutton.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginButtonComponent implements AfterViewInit{
  constructor(private renderer: Renderer2){}
  ngAfterViewInit(): void {
    if (this.TypeButton==='Google')
    this.button.nativeElement.classList.add('google')
  if (this.TypeButton==='GitHub')
  this.button.nativeElement.classList.add('github')
  }

  @ViewChild('LoginButton')
  public button!: ElementRef;
  @Input()
  TypeButton:string=''
  ButtonProperties:Record<string,string>={
    Facebook:"bi bi-facebook",
    Google: "bi bi-google",
    GitHub:"bi bi-github",
  };
getclassIcon():string{
  return this.ButtonProperties[this.TypeButton]
}
  ExecuteFuntion(){
    console.log('se emitio')
  }

}
