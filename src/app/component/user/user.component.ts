import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  userName: string = "";

  constructor(
    private database: DataService,
  ) {}


  ngOnInit() {

    this.database.sync("http://localhost:4200/user");
    this.database.getChangeListener().subscribe(data => {
      for (let i = 0; i < data.change.docs.length; i++) {
        this.users.push(data.change.docs[i]);
      }
    });
    this.users = this.database.fetch();
  }

  
  AddUser() {
    let newUser: User = {
      id: new Date().toISOString(),
      name: this.userName
    };
    this.database.addNewUser(newUser);
    this.users = this.database.fetch();
    this.userName = "";
  }
}
