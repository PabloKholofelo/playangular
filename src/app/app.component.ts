import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the GCU Cloud Test App';
  private host: string= 'http://pakapokemon-env.eba-hshdfk2s.eu-north-1.elasticbeanstalk.com';
  
  constructor(private http: HttpClient) {

      this.getPokemons().pipe(switchMap(pokemons => {
        const pokemonsArray$: Observable<any>[] = [];
        
        pokemons.results.forEach((pokemon: any) => {
          const pokemon$: Observable<any> = this.getPokemonByName(pokemon.name);
          pokemonsArray$.push(pokemon$);
        });
        
        return forkJoin(pokemonsArray$);
      })).subscribe(data => { 
        console.log(data)
      });

  }
  

  private getPokemons() {
    return this.http.get<any>(this.host + "/pokemon?offset=1&limit=1")
  }
  private getPokemonByName(name: string) {
      return this.http.get<any>(this.host + "/pokemon/" + name);
  }
}
