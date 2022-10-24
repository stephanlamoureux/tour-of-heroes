import { Component, OnInit } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Hero } from '../../../hero'
import { HeroService } from '../../services/hero-service/hero.service'

@Component({
	selector: 'app-hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
	/**
	 * With the non-null assertion operator (!) we can tell the compiler explicitly that an expression has value other than null or undefined.
	 * This can be useful when the compiler cannot infer the type with certainty but we have more information than the compiler.
	 * Specifically, the operation x! produces a value of the type of x with null and undefined excluded.
	 * Similar to type assertions of the forms <T>x and x as T, the non-null assertion operator is simply removed in the emitted JavaScript code.
	 */
	heroes$!: Observable<Hero[]>

	/**
	 * A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
	 * You can also push values into that Observable by calling its next(value) method as the search() method does.
	 */
	private searchTerms = new Subject<string>()

	constructor(private heroService: HeroService) {}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term)
	}

	/**
	 * Passing a new search term directly to the searchHeroes() after every user keystroke creates excessive HTTP requests, which taxes server
	 * resources and burning through data plans. Instead, the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS
	 * operators that reduce the number of calls to the searchHeroes(). Ultimately, this returns an observable of timely hero search results
	 * where each one is a Hero[]
	 */
	ngOnInit(): void {
		this.heroes$ = this.searchTerms.pipe(
			// wait 300ms after each keystroke before considering the term
			debounceTime(300),

			// ignore new term if same as previous term
			distinctUntilChanged(),

			// switch to new search observable each time the term changes
			switchMap((term: string) => this.heroService.searchHeroes(term))
		)
	}
}
