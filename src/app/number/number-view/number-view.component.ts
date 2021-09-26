import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Numbers } from './../numbers';

@Component({
  selector: 'app-number-view',
  templateUrl: './number-view.component.html',
  styleUrls: ['./number-view.component.scss']
})
export class NumberViewComponent {
  numberText: Array<string> = [];

  constructor(
      public dialogRef: MatDialogRef<NumberViewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Numbers) {
        let sqrtSize = Math.ceil(Math.sqrt(data.numbers.length));
        let text = "" + data.numbers[0];
        let index = 0;
        for(let i = 1; i < data.numbers.length; i++) {
          if(i % sqrtSize == 0) {
            this.numberText[index++] = text;
            text = "" + data.numbers[i];
          } else {
            text += (" " + data.numbers[i]);
          }
        }
        this.numberText[index] = text;
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
