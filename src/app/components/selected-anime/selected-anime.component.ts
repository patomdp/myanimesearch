import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyAnime } from 'src/app/interfaces/api-movies';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-selected-anime',
  templateUrl: './selected-anime.component.html',
  styleUrls: ['./selected-anime.component.css'],
})
export class SelectedAnimeComponent implements OnInit, OnDestroy {
  // Array de los anime seleccionados, inicializado en vacio
  animes_selected: MyAnime[] = [];
  animeSuscription!: Subscription;

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    // al inicio de la aplicacion, nos traemos lo que haya en el Local Storage
    const local = JSON.parse(localStorage.getItem('my_anime') as any) || [];
    console.log('Contenido Local Storage: ', local);
    // y ahora guardamos la constante en el this.anime_selected, para que se muestre en la lista al actualizar la pagina
    this.animes_selected = local;
    this.animeSuscription = this.animeService
      .getAnimeSelected()
      .subscribe((animeResult) => {
        console.log('Resultado desde selected Anime: ', animeResult);
        this.animes_selected.push(animeResult);
        // agregamos al localStorage
        localStorage.setItem('my_anime', JSON.stringify(this.animes_selected));
      });
  }

  ngOnDestroy(): void {
    this.animeSuscription.unsubscribe();
  }

  public increaseWatch(anime: MyAnime): void {
    anime.watched_episodes++;
    console.log('added episode');
    // agregamos al localStorage para que se guarde en local el numero de episodios
    localStorage.setItem('my_anime', JSON.stringify(this.animes_selected));
  }
  public decreseWatch(anime: MyAnime): void {
    if (anime.watched_episodes > 0) {
      anime.watched_episodes--;
    }
    console.log('removed episode');
    // agregamos al localStorage para que se guarde en local el numero de episodios
    localStorage.setItem('my_anime', JSON.stringify(this.animes_selected));
  }

  public removeFavorite(anime: MyAnime): void {
    // quitar el anime seleccionado del local storage y de la pantalla
    localStorage.clear();
    this.animes_selected = [];
  }
}
