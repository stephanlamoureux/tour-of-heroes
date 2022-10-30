import { Component, OnInit } from '@angular/core'
import { Hero } from '../../../hero'
import { HeroService } from '../../services/hero-service/hero.service'

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
	heroes: Hero[] = []

	constructor(private heroService: HeroService) {}

	ngOnInit(): void {
		this.getHeroes()
	}

	getHeroes(): void {
		this.heroService
			.getHeroes()
			.subscribe({ next: heroes => (this.heroes = heroes), error: err => console.log(err) })
	}

	/**
	 * When the given name isn't blank, the handler creates an object based on the hero's name.
	 * The handler passes the object name to the service's addHero() method.
	 * When addHero() creates a new object, the subscribe() callback receives the new hero and pushes it into to the heroes list for display.
	 */
	add(name: string): void {
		name = name.trim()
		if (!name) {
			return
		}
		this.heroService.addHero({ name } as Hero).subscribe(hero => {
			this.heroes.push(hero)
		})
	}

	delete(hero: Hero): void {
		this.heroes = this.heroes.filter(h => h !== hero)
		this.heroService.deleteHero(hero.id).subscribe()
	}
}
