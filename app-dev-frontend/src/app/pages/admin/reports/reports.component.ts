import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Report} from "../../../model/Report";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ReportService} from "../../../services/reports.service";
import {ViewAdComponent} from "../view-ad/view-ad.component";
import {Ad} from "../../../model/Ad";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
  displayedColumns = ['name', 'username', 'reported_by', 'reason', 'action'];
  dataSource: MatTableDataSource<Report> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private reportService: ReportService, private detectorRef: ChangeDetectorRef, private dialog: MatDialog) {}

  ngOnInit()
  {
    this.refresh();
  }

  refresh()
  {
    this.reportService.getReports().subscribe( res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.detectorRef.detectChanges();
    })
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
