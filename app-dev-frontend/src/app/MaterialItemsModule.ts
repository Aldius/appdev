import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatCardModule
} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatTableModule, MatSelectModule, MatCardModule],
  exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatTableModule, MatSelectModule, MatCardModule],
})
export class MaterialItemsModule {
}
