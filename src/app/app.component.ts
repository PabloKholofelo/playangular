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
      this.getPokemonByName("ivysaur").subscribe(x => {
        console.log(x);
      });
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
    return this.http.get<any>(this.host + "/pokemon?offset=10limit=10)
  }
  private getPokemonByName(name: string) {
      return this.http.get<any>("https://cors-anywhere.herokuapp.com/" + this.host + "/pokemon/" + name);
       // return of({"id":5,"name":"charmeleon","sprites":{"back_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png","back_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/5.png","front_default":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png","front_shiny":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/5.png"},"stats":[{"base_stat":"58","effort":"0","stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}},{"base_stat":"64","effort":"0","stat":{"name":"attack","url":"https://pokeapi.co/api/v2/stat/2/"}},{"base_stat":"58","effort":"0","stat":{"name":"defense","url":"https://pokeapi.co/api/v2/stat/3/"}},{"base_stat":"80","effort":"1","stat":{"name":"special-attack","url":"https://pokeapi.co/api/v2/stat/4/"}},{"base_stat":"65","effort":"0","stat":{"name":"special-defense","url":"https://pokeapi.co/api/v2/stat/5/"}},{"base_stat":"80","effort":"1","stat":{"name":"speed","url":"https://pokeapi.co/api/v2/stat/6/"}}]})
     
  }
}
