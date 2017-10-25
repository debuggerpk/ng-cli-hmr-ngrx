import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CountrySearchService } from './../services/search';

const MAT_MODULES = [
  MatAutocompleteModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatRadioModule,
  MatListModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MAT_MODULES,
  ],
  exports: [
    FormsModule,
    HttpModule,
    MAT_MODULES,
  ],
  declarations: [],
  providers: [CountrySearchService, ]
})
export class SharedModule { }
