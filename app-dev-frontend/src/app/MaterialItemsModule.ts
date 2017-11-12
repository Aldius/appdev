import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatMenuModule, MatListModule, MatPaginatorModule, MatTooltipModule
} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule,
    MatTableModule, MatSelectModule, MatCardModule, MatDialogModule, MatMenuModule,
    MatListModule, MatPaginatorModule, MatTooltipModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule,
    MatTableModule, MatSelectModule, MatCardModule, MatDialogModule, MatMenuModule,
    MatListModule, MatPaginatorModule, MatTooltipModule],
})
export class MaterialItemsModule {
}
