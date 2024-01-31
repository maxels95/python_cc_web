import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReadingListComponent } from './reading-list/reading-list.component';

const routes: Routes = [
    { path: 'readings', component: ReadingListComponent },
    // Add other routes as needed
    { path: '', redirectTo: '/readings', pathMatch: 'full' },
  ];

@NgModule({
  declarations: [
    AppComponent,
    ReadingListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    // Add other modules if any
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
