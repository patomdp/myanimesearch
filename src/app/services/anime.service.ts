import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Anime, APIAnime, MyAnime } from '../interfaces/api-movies';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private API_URL = 'https://api.jikan.moe/v4/anime?q=';
  private anime_response$ = new Subject<Anime[]>();
  private anime_selected$ = new Subject<MyAnime>();

  constructor(private http: HttpClient) {}

  /*
  Este método retorna el anime buscado en el comopnente que utilice este servicio
  */
  public getAnime(searchTerm: string): Observable<APIAnime> {
    return this.http.get<APIAnime>(`${this.API_URL}${searchTerm}`);
  }

  // public getAnime(searchTerm: string): Observable<any> {
  //   // const url = this.API_URL + searchTerm;
  //   const urlCheta = `${this.API_URL}${searchTerm}`;
  //   // console.log('La url: ', url);
  //   // console.log('La url Cheta: ', urlCheta);
  //   return this.http.get(urlCheta);
  // }

  public addResultAnime(anime: Anime[]): void {
    this.anime_response$.next(anime);
  }

  public getResultAnime(): Observable<Anime[]> {
    return this.anime_response$.asObservable();
  }

  public animeSelected(anime: MyAnime): void {
    // next es para que haga multicast hacia todos los que se suscriban
    this.anime_selected$.next(anime);
  }

  public getAnimeSelected(): Observable<MyAnime> {
    return this.anime_selected$.asObservable();
  }
}
