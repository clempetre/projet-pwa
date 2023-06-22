import { EventEmitter, Injectable } from '@angular/core';
import PouchDB from "pouchdb";
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  db: any;
  isInstantiated: boolean = false;
  listener: EventEmitter<any> = new EventEmitter();

  constructor() {
    if (!this.isInstantiated) {
      this.db = new PouchDB("users");
      this.isInstantiated = true;
    }
    
  }
  
  public fetch(): User[] {
    let items: User[] = [];
    this.db
      .allDocs({ include_docs: true, descending: true })
      .then(function(result: any) {
        for (let row of result.rows) {
          let user: User = {
            id: row.doc._id,
            name: row.doc.name
          };
          console.log(user);
          items.push(user);
        }
      })
      .catch(function(err: any) {
        console.log(err);
      });
    return items;
  }

  public get(id: string) {
    return this.db.get(id);
  }

  public addNewUser(newUser: User) {
    this.db
      .put(newUser)
      .then(function(result: any) {
        console.log("Successfully !");
      })
      .catch(function(err: any) {
        console.log("Saving error");
        console.log(err);
      });
  }

  public put(id: string, document: any) {
    document.id = id;
    return this.get(id).then(
      (result: any) => {
        console.log({result});
        document._rev = result._rev;
        return this.db.put(document);
      },
      (error: any) => {
        if (error.status === "404") {
          return this.db.put(document);
        } else {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
      }
    );
  }

  public sync(remote: string) {
    const remoteDatabase = new PouchDB(remote);
    this.db
      .sync(remoteDatabase, {
        live: true
      })
      .on("change", (change: any) => {
        this.listener.emit(change);
      })
      .on("error", (error: any) => {
        console.error(JSON.stringify(error));
      });
  }

  public getChangeListener() {
    return this.listener;
  }
}

