import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.css'],
})
export class SearchAnimeComponent implements OnInit {
  public searchTerm: string = '';

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {}

  public search(): void {
    console.log('Estoy buscando', this.searchTerm);
    this.animeService.getAnime(this.searchTerm).subscribe((result) => {
      console.log(result);
      this.animeService.addResultAnime(result.data);
    });
    this.searchTerm = '';
  }
}
