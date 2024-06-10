import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermConditionTempComponent } from '../term-condition-temp/term-condition-temp.component';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css']
})
export class TermsAndConditionComponent {
  constructor(public dialog: MatDialog) {}

  openDialogTerms() {
    const dialogRef = this.dialog.open( TermConditionTempComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
