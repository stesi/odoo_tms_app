import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import Stops from 'src/entities/Stops';
import { Repository, getConnection } from 'typeorm';
import { ActivatedRoute, Router } from '@angular/router';
import Events from 'src/entities/Events';

@Component({
  selector: 'app-stop-view',
  templateUrl: './stop-view.page.html',
  styleUrls: ['./stop-view.page.scss'],
})
export class StopViewPage implements OnInit {
  private stop$: Observable<Stops>;
  private repositoryStops: Repository<Stops>;
  private repositoryEvents: Repository<Events>;
  private currentAccountId: number;
  private currentStopId: number;
  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.currentAccountId = parseInt(this.route.snapshot.paramMap.get('accountId'))
    this.currentStopId = parseInt(this.route.snapshot.paramMap.get('externalId'))
    this.repositoryStops = getConnection().getRepository(Stops);
    this.repositoryEvents = getConnection().getRepository(Events)

  }
  confirmArrival() {
    this.getStop(false).then((out: any) => {
      if (out !== undefined) {
        out.arrivalExecutedAt = Date.now()
        this.generateEvent('ARRIVAL').then((ev) => {
          this.repositoryStops.save(out).then((out) => {
            this.loadData();
          })
        })
      }
    })
  }
  confirmDeparture() {
    this.getStop(false).then((out: any) => {
      if (out !== undefined) {
        out.departureExecutedAt = new Date()
        this.generateEvent('DEPARTURE').then((ev) => {
          this.repositoryStops.save(out).then((out) => {
            this.loadData();
          })
        })


      }
    })
  }
  generateEvent(type) {
    let event = new Events();
    event.accountId = this.currentAccountId;
    event.stopExternalId = this.currentStopId;
    event.when = new Date()
    event.type = type;
    return this.repositoryEvents.save(event)
  }
  getStop(loadRelations = true) {
    var options;
    if (loadRelations) {
      options = { 'relations': ['loadOperations.Loads', 'unloadOperations.Loads', 'loadOperations', 'unloadOperations'] };
    } else {
      options = {};
    }
    return this.repositoryStops.findOne({ accountId: this.currentAccountId, externalId: this.currentStopId }, options);
  }
  getStopData(): Observable<Stops> {
    return from(this.getStop());
  }
  loadData() {
    this.stop$ = this.getStopData();
  }
  ngOnInit() {
    this.loadData()
  }

}
