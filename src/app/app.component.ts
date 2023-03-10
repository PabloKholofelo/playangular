import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.get<any>(this.host + "/pokemon?offset=100&limit=100").subscribe((data: any) => {
     console.log(data); 
    })
  }
}
