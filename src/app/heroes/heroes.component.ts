import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
// import { HEROES } from '../heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // hero: Hero = { id: 1, name: 'Windstorm' };
  // heroes = HEROES;
  heroes: Hero[] = [];
  getHeroes(): void {
    //retrieve the data from the service
    // this.heroes = this.heroService.getHeroes(); //synchronous operation, will not work with http request
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes)); //async with an observable
  }

  // selectedHero?: Hero;
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id ${hero.id}`);
  // }
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }
}
