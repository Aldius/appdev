import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Message} from "../../../model/Message";
import {AuthService} from "../../../services/auth.service";
import {MessagesService} from "../../../services/messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-got',
  templateUrl: './got.component.html',
  styleUrls: ['./got.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GotMessageComponent implements OnInit {
  displayedColumns = ['from', 'text', 'action'];
  dataSource: MatTableDataSource<Message> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: AuthService,private messageService: MessagesService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn)
    {
      this.router.navigate(['/login']);
    }
    this.refresh();
  }

  refresh()
  {
    this.messageService.gotMessage().subscribe( res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  viewMessage(message: Message): void {
    this.dialog.open(null, {
      data: message
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
