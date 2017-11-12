import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {AdsService} from "../../../services/ads.service";
import {Ad, STATUS} from "../../../model/Ad";
import "rxjs/add/observable/of";
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {ChangeStatusComponent} from "../change-status/change-status.component";

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

  constructor(private adsService: AdsService, private detectorRef: ChangeDetectorRef, private dialog: MatDialog) {}

  ngOnInit()
  {
    this.refresh();
  }

  refresh()
  {
    this.adsService.getAdsForAdmin().subscribe( res => {
      this.dataSource = new MatTableDataSource(res);
      this.detectorRef.detectChanges();
    })
  }

  delete(ad: Ad)
  {
    this.adsService.deleteAd(ad).subscribe( res => {
      console.log(res);
      this.refresh();
    })
  }

  changeStatus(ad: Ad): void {
    let statusDialogRef = this.dialog.open(ChangeStatusComponent, {
      data: ad
    });

    statusDialogRef.afterClosed().subscribe(result => {
      this.refresh();
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

export class AdDataSource extends DataSource<any> {

  constructor(private adsService: AdsService) {
    super();
  }

  connect(): Observable<any> {
    return Observable.of(this.adsService.getAdsForAdmin());
  }


  disconnect() {
    // No-op
  }
}
