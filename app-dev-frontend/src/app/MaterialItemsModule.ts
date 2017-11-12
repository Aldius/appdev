import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatMenuModule
} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatTableModule, MatSelectModule, MatCardModule, MatDialogModule, MatMenuModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatTableModule, MatSelectModule, MatCardModule, MatDialogModule, MatMenuModule],
})
export class MaterialItemsModule {
}
