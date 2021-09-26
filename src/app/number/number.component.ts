import { Component, Inject, OnInit } from '@angular/core';
import { NumberService } from './number.service';
import { Numbers } from './numbers';
import { NumberExistential } from './number-existential';
import { Response } from './response';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumberViewComponent } from './number-view/number-view.component';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {
  maxNumber: number = 0;

  response: Response = {
    numbers: []
  };
  numbers: Array<Numbers> = [];
  numberExistentialList: Array<NumberExistential> = [];
  predictionNumber: number = 0;

  width = window.innerWidth + "px";

  constructor(private numberService: NumberService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getNumbers() {
    this.numberService.getNumbers(this.maxNumber)
      .subscribe(resp => {
        this.response = resp;
        this.numbers = this.response.numbers;
      },
      error => alert(error.message))
  }

  getPredictionNumber() {
      this.numberService.getPredictionNumber({ numberExistentialList: this.numberExistentialList })
        .subscribe(resp => {
          this.predictionNumber = resp;
        },
        error => alert(error.message))
    }

  openDialog(sequence: number): void {
    if (sequence > 0) {
      const dialogRef = this.dialog.open(NumberViewComponent, {
        width: this.width,
        data: this.numbers[sequence-1]
      });

      dialogRef.afterClosed().subscribe(result => {
        this.numberExistentialList.push(result);
        this.openDialog(result.sequence-1);
      });
    } else {
      this.getPredictionNumber();
    }
  }

  async startPrediction(): Promise<void> {
    this.clearData();
    this.getNumbers();
    await this.delay(2000); // delay 2 seconds
    this.openDialog(this.numbers.length);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  clearData(): void {
    this.numbers = [];
    this.numberExistentialList = [];
    this.predictionNumber = 0;
    this.response = { numbers: [] };
  }
}
