import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the GCU Cloud Test App';
  private host: string= 'https://pokeapi.co/';
  
  constructor(private http: HttpClient) {

      this.getPokemons().pipe(switchMap(pokemons => {
        const pokemonsArray$: Observable<any>[] = [];
        
        pokemons.forEach((pokemon: any) => {
          const pokemon$: Observable<any> = this.getPokemonByName();
          pokemonsArray$.push(pokemon$);
        });
        
        return forkJoin(pokemons);
      })).subscribe(data => { 
        console.log(data)
      });

  }
  

  private getPokemons() {
    return this.http.get<any>(this.host + "/pokemon?offset=100&limit=100")
  }
  private getPokemonByName() {
      return this.http.get<any>(this.host + "/pokemon/" + "name");
  }
}
