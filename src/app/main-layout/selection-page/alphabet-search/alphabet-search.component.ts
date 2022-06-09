import { Component } from '@angular/core';
import { SelectionPageComponent } from "../selection-page.component";

@Component({
  selector: 'app-alphabet-search',
  templateUrl: './alphabet-search.component.html',
  styleUrls: ['./alphabet-search.component.scss']
})
export class AlphabetSearchComponent {
  public alphabet: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  public showLetter: boolean = false
  public letter: string = 'a'

  constructor(private _selectionPage: SelectionPageComponent) {}

  public alphabetSearch(letter: string): void {
    this._selectionPage.form.controls.heroSearch.setValue(letter);
    this._selectionPage.addToRecentSearch(letter);
    this._selectionPage.submit();
    this.letter = letter;
    this.showLetter = !this.showLetter;
  }
}
