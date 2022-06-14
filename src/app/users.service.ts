import { Injectable } from "@angular/core";
import { UsersData } from "./interfaces";

@Injectable({providedIn: 'root'})
export class UsersService {
  public static allUsers: UsersData[] = JSON.parse(localStorage.getItem('users')!)
    ? JSON.parse(localStorage.getItem('users')!)
    : [];
}
