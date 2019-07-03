import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import Stops from 'src/entities/Stops';
import { Repository, getConnection } from 'typeorm';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stop-view',
  templateUrl: './stop-view.page.html',
  styleUrls: ['./stop-view.page.scss'],
})
export class StopViewPage implements OnInit {
private stop$: Observable<Stops>;
private repositoryStops: Repository<Stops>;
private currentAccountId: number;
private currentStopId: number;
  constructor(private route: ActivatedRoute,
    private router: Router) { 
    this.currentAccountId = parseInt(this.route.snapshot.paramMap.get('accountId'))
    this.currentStopId = parseInt(this.route.snapshot.paramMap.get('externalId'))
    this.repositoryStops = getConnection().getRepository(Stops);


  }
  getStop(): Observable<Stops> {
    return from(this.repositoryStops.findOne({accountId: this.currentAccountId, externalId: this.currentStopId},{'relations':['loadOperations.Loads','unloadOperations.Loads','loadOperations','unloadOperations']}) );
}
  ngOnInit() {
    this.stop$ = this.getStop();
  }

}
