import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveData(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  getData(name: string): any {
    const data = JSON.parse(localStorage.getItem(name))
    return data;
  }

  clearData(name: string) {
    localStorage.removeItem(name);
  }

  clearAllData() {
    localStorage.clear();
  }
}
