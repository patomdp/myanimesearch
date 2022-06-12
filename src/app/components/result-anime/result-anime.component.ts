import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Anime, MyAnime } from 'src/app/interfaces/api-movies';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-result-anime',
  templateUrl: './result-anime.component.html',
  styleUrls: ['./result-anime.component.css'],
})
export class ResultAnimeComponent implements OnInit, OnDestroy {
  anime_results: Anime[] = [];
  animeSuscription!: Subscription;

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeSuscription = this.animeService
      .getResultAnime()
      .subscribe((result) => {
        console.log('Resultado desde result-anime component: ', result);
        this.anime_results = result;
      });
  }
  ngOnDestroy(): void {
    this.animeSuscription.unsubscribe();
  }

  addAnime(anime: Anime): void {
    console.log(anime);
    const addAnime: MyAnime = {
      id: anime.mal_id,
      title: anime.title_english,
      image: anime.images.jpg.image_url,
      total_episodes: anime.episodes,
      watched_episodes: 0,
    };
    // le pasamos al servicio el objeto que creamos
    this.animeService.animeSelected(addAnime);
    // Seteamos los resultados en vacio asi se borran los resultados del componente de busqueda
    this.anime_results = [];
  }
}
