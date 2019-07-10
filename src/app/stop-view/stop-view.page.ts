import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from, Subscription } from 'rxjs';
import Stops from 'src/entities/Stops';
import { Repository, getConnection } from 'typeorm';
import { ActivatedRoute, Router } from '@angular/router';
import Events from 'src/entities/Events';
import { EventService } from 'src/services/EventService';
import Loads from 'src/entities/Loads';
import Operations from 'src/entities/Operations';

@Component({
  selector: 'app-stop-view',
  templateUrl: './stop-view.page.html',
  styleUrls: ['./stop-view.page.scss'],
})
export class StopViewPage implements OnInit, OnDestroy {

  private stop$: Observable<Stops>;
  private repositoryStops: Repository<Stops>;
  private repositoryEvents: Repository<Events>;
  private repositoryLoads: Repository<Loads>;
  private currentAccountId: number;
  private currentStopId: number;
  private currentTripId: number;
  private stopSubscriber: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router, private eventService: EventService) {
    this.currentAccountId = parseInt(this.route.snapshot.paramMap.get('accountId'))
    this.currentStopId = parseInt(this.route.snapshot.paramMap.get('externalId'))
    this.repositoryStops = getConnection().getRepository(Stops);
    this.repositoryEvents = getConnection().getRepository(Events)
    this.repositoryLoads = getConnection().getRepository(Loads)

  }
  ngOnDestroy() {
    this.stopSubscriber.unsubscribe();
  }
  confirmArrival() {
    this.eventService.confirmStopArrival(this.currentStopId, this.currentAccountId, this.currentTripId).then(() => {
      this.loadData();
    })


  }
  confirmDeparture() {
    this.eventService.confirmStopDeparture(this.currentStopId, this.currentAccountId, this.currentTripId).then(() => {
      this.loadData();
    })
  }
  confirmOperation(operation: Operations, type: string){
    this.eventService.confirmOperation(operation,type).then(()=>{
      this.loadData();
    })
  }
  confirmOperations(type: string){
    this.eventService.confirmOperations(this.currentStopId, this.currentAccountId, type).then(()=>{
      this.loadData();
    })

  }
  confirmMissingPickup(loadId: number) {
    this.eventService.confirmStopDeparture(this.currentStopId, this.currentAccountId, this.currentTripId).then(() => {
      this.loadData();
    })
  }
  /*  generateEvent(type) {
     let event = new Events();
     event.accountId = this.currentAccountId;
     event.stopExternalId = this.currentStopId;
     event.when = new Date()
     event.type = type;
     return this.repositoryEvents.save(event)
   } */
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
    this.stopSubscriber = this.stop$.subscribe((stop) => {
      this.currentTripId = stop.tripExternalId;
    })

  }


}
