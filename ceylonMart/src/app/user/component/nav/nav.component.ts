import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TmpmyOrderComponent } from '../tmpmy-order/tmpmy-order.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  userName:String|null=null;
  address: String | null = null;
  userId: String | null = null;
  userEmail: String | null = null;
  @ViewChild('element')
  element!: ElementRef<HTMLElement>;
  @ViewChild('subtree')
  subtree!: ElementRef<HTMLElement>;

  elementOrigin = this.formatOrigin(null);
  subtreeOrigin = this.formatOrigin(null);

  constructor(
    private _focusMonitor: FocusMonitor,
    private _cdr: ChangeDetectorRef,
    private _ngZone: NgZone,
    public dialog: MatDialog
  ) {}

 

  openDialog() {
    const dialogRef = this.dialog.open(TmpmyOrderComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }








  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this.element).subscribe(origin =>
      this._ngZone.run(() => {
        this.elementOrigin = this.formatOrigin(origin);
        this._cdr.markForCheck();
      }),
    );
    this._focusMonitor.monitor(this.subtree, true).subscribe(origin =>
      this._ngZone.run(() => {
        this.subtreeOrigin = this.formatOrigin(origin);
        this._cdr.markForCheck();
      }),
    );
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this.element);
    this._focusMonitor.stopMonitoring(this.subtree);
  }

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + ' focused' : 'blurred';
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }



}
