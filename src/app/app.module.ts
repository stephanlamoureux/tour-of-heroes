import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms' // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeroesComponent } from './components/heroes/heroes.component'
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component'
import { MessagesComponent } from './components/messages/messages.component'
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { HeroSearchComponent } from './components/hero-search/hero-search.component'
import { NavComponent } from './components/nav/nav.component'

@NgModule({
	declarations: [
		AppComponent,
		HeroesComponent,
		HeroDetailComponent,
		MessagesComponent,
		DashboardComponent,
		HeroSearchComponent,
		NavComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
