import { Injectable } from '@angular/core'
import { Hero } from '../../../hero'
import { Observable, of } from 'rxjs'
import { MessageService } from '../message-service/message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, retry, tap, map } from 'rxjs/operators'

@Injectable({
	providedIn: 'root',
})
export class HeroService {
	constructor(private messageService: MessageService, private http: HttpClient) {}

	private heroesUrl = 'api/heroes.php' // URL to web api

	/** GET heroes from the server
	 *
	 * The RxJS tap() operator looks at the observable values, does something with those values, and passes them along.
	 * The tap() call back doesn't access the values themselves.
	 *
	 * To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.
	 */

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	}

	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>('api/heroes.php')
	}

	/** GET hero by id. Will 404 if id not found
	 *
	 * getHero() returns an Observable<Hero>, which is an observable of Hero objects rather than an observable of Hero arrays.
	 */
	getHero(id: number): Observable<Hero> {
		const url = `api/hero.php?id=${id}`
		return this.http.get<Hero[]>(url).pipe(
			map(hero => hero[0]),
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		)
	}

	/* GET heroes whose name contains search term */
	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			// if not search term, return empty hero array.
			return of([])
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(x =>
				x.length
					? this.log(`found heroes matching "${term}"`)
					: this.log(`no heroes matching "${term}"`)
			),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		)
	}

	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
			tap(_ => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		)
	}

	/** POST: add a new hero to the server */
	addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
			tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		)
	}

	/** DELETE: delete the hero from the server */
	deleteHero(id: number): Observable<Hero> {
		const url = `api/deletehero.php?id=${id}`
		return this.http.delete<Hero>(url, this.httpOptions).pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		)
	}

	/** Error handling
	 *
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * The following handleError() method reports the error and then returns an innocuous result so that the application keeps working.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error) // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`)

			// Let the app keep running by returning an empty result.
			return of(result as T)
		}
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add(`HeroService: ${message}`)
	}
}
