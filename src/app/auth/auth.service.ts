import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId(){
    return this.userId;
  }

  constructor() { }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
