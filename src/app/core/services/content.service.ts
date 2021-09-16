import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  ITheme } from '../../shared/interfaces';

@Injectable()
export class ContentService {

  constructor(private http: HttpClient) { }

  loadTheme(id: string) {
    return this.http.get<ITheme>(`/api/themes/${id}`);
  }

  loadThemes() {
    return this.http.get<ITheme[]>(`/api/themes`);
  }

  
  getMyThemes(username:string){
      
      return this.http.get<ITheme[]>(`/api/themes/${username}`);
    }

  saveTheme(data:any) {
    return this.http.post<ITheme>(`/api/themes`, data);
  }
  deleteTheme(id: string){
      return this.http.delete<ITheme>(`/api/themes/${id}`)
  }
}
