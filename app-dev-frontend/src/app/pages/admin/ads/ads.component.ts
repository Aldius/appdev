import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {AdsService} from "../../../services/ads.service";
import {Ad, STATUS} from "../../../model/Ad";
import "rxjs/add/observable/of";
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {ChangeStatusComponent} from "../change-status/change-status.component";
import {ViewAdComponent} from "../view-ad/view-ad.component";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdsComponent implements OnInit {
  displayedColumns = ['name', 'username', 'title', 'status', 'action'];
  dataSource: MatTableDataSource<Ad> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: AuthService, private adsService: AdsService, private _flashMessagesService: FlashMessagesService,
              private detectorRef: ChangeDetectorRef, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn)
    {
      this.router.navigate(['/login']);
    }
    this.refresh();
  }

  refresh()
  {
    this.adsService.getAdsForAdmin().subscribe( res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.detectorRef.detectChanges();
    })
  }

  delete(ad: Ad)
  {
    this.adsService.deleteAd(ad).subscribe( res => {
      this._flashMessagesService.show('Deleted successfully', { timeout: 2000, cssClass: 'flash-error' })
      this.refresh();
    })
  }

  changeStatus(ad: Ad): void {
    let statusDialogRef = this.dialog.open(ChangeStatusComponent, {
      data: ad
    });

    statusDialogRef.afterClosed().subscribe(result => {
      this._flashMessagesService.show('Status changed', { timeout: 2000, cssClass: 'success' })
      this.refresh();
    });
  }

  viewAd(ad: Ad): void {
    let viewAdDialogRef = this.dialog.open(ViewAdComponent, {
      data: ad
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
