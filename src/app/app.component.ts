import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the GCU Cloud Test App';
    title = "CodeSandbox";
  private host: string= 'http://pakapokemon-env.eba-hshdfk2s.eu-north-1.elasticbeanstalk.com';
  
  constructor(private http: HttpClient) {
    console.log("FD"); 
    this.http.get<any>("https://jsonplaceholder.typicode.com/todos/1").subscribe((data: any) => {
     console.log(data); 
    })
  }
}
