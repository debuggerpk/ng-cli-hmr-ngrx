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

import { CountrySearchService } from './../services/search';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatListModule,
    HttpModule,
  ],
  exports: [
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatListModule,
    HttpModule,
  ],
  declarations: [],
  providers: [CountrySearchService, ]
})
export class SharedModule { }
