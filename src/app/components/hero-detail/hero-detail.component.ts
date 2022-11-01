import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { HeroService } from '../../services/hero-service/hero.service'
import { Hero } from '../../../hero'

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getHero()
	}

	// The route.snapshot is a static image of the route information shortly after the component was created.
	// The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
	getHero(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'))
		this.heroService.getHero(id).subscribe(hero => (this.hero = hero))
	}

	goBack(): void {
		this.location.back()
	}

	save(): void {
		if (this.hero) {
			this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
		}
	}

	delete(hero: Hero): void {
		if (this.hero) {
			this.heroService.deleteHero(hero.id).subscribe()
		}
	}

	@Input() hero?: Hero
}
