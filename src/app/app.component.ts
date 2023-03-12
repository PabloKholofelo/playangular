import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the GCU Cloud Test App';
  private host: string= 'http://pakapokemon-env.eba-hshdfk2s.eu-north-1.elasticbeanstalk.com';
  
  constructor(private http: HttpClient) {
    console.log("FD"); 
      this.getPokemons.pipe(
        switchMap(pokemons => {
          // Create and initialize the array
          const pokemonsArray$: Observable<any>[] = [];
          pokemons.forEach(pokemon => {
            const pokemon$: Observable<any> = getPokemonByName(pokemons.name);
            pokemonsArray$.push(pokemon$);
          });
          
          return forkJoin(pokemonsArray$);
        })
        }).subscribe(x => {
          console.log(x) 
      });
  }
  

  private getPokemons() {
    this.http.get<any>(this.host + "/pokemon?offset=100&limit=100")
 }
  private getPokemonByName(name: string) {
      this.http.get<any>(this.host + "/pokemon/ + name);
  }
}
