import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {Message} from "../../../model/Message";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SentMessageComponent implements OnInit {
  displayedColumns = ['to', 'text', 'action'];
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
    this.messageService.sentMessage().subscribe( res => {
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
