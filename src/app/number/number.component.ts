import { Component, OnInit } from '@angular/core';
import { NumberService } from './number.service';
import { Numbers } from './numbers';
import { Response } from './response';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  response: Response = {
    numbers: []
  };
  numbers: Array<Numbers> = [];

    constructor(private numberService: NumberService) {
      this.getNumbers();
    }

    ngOnInit(): void {
    }

    getNumbers() {
      this.numberService.getNumbers()
        .subscribe(resp => {
          this.response = resp;
          this.numbers = this.response.numbers;
        },
        error => alert(error.message))
    }

}
