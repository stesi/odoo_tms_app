import { Injectable } from '@angular/core';
import { getConnection, Repository } from 'typeorm';
import Events from 'src/entities/Events';
import Stops from 'src/entities/Stops';
import Trips from 'src/entities/Trips';
import Operations from 'src/entities/Operations';


@Injectable()
export class EventService {

    private connection;

    private repositoryEvents: Repository<Events>;
    private repositoryStops: Repository<Stops>;
    private repositoryTrips: Repository<Trips>;
    private repositoryOperations: Repository<Operations>;
    constructor() {
        this.connection = getConnection();

        this.repositoryEvents = this.connection.getRepository(Events)
        this.repositoryStops = this.connection.getRepository(Stops);
        this.repositoryOperations = this.connection.getRepository(Operations);

    }
    async   confirmStopArrival(id: number, accountId: number, tripId: number) {
        var stop = await this.repositoryStops.findOne({ accountId: accountId, externalId: id })
        stop.arrivalExecutedAt = new Date()
        var event = await this.generateStopEvent('ARRIVAL', id, accountId, tripId);




        return this.repositoryStops.save(stop)


    }
    async confirmOperation(operation: Operations, type: string) {
        var operationToUpdate = { externalId: operation.externalId, accountId: operation.accountId }
        if (type == 'LOAD') {

            operationToUpdate['whenLoadExecutedAt'] = new Date();
        } else {
            operationToUpdate['whenUnloadExecutedAt'] = new Date();
        }
        await this.generateOperationEvent(type, null, operation.accountId, operation.tripExternalId, operation.externalId)
        await this.repositoryOperations.save(operationToUpdate);
    }
    async confirmOperations(stopId: number, accountId: number, type: string) {
        var stop = await this.repositoryStops.findOne({ accountId: accountId, externalId: stopId }, { 'relations': ['loadOperations', 'unloadOperations'] })
        var operationToConfirm;
        if (type == 'LOAD') {
            operationToConfirm = stop.loadOperations;

        } else {
            operationToConfirm = stop.unloadOperations;
        }

        for (let operation of operationToConfirm) {
            await this.confirmOperation(operation, type);
        }
    }
    async confirmStopDeparture(stopId: number, accountId: number, tripId: number) {
        var stop = await this.repositoryStops.findOne({ accountId: accountId, externalId: stopId })
        stop.departureExecutedAt = new Date()
        var event = await this.generateStopEvent('DEPARTURE', stopId, accountId, tripId);




        return this.repositoryStops.save(stop)
    }
    generateOperationEvent(type, stopId, accountId, tripId, operationExternalId) {
        let event = new Events();
        event.accountId = accountId;
        event.stopExternalId = stopId;
        event.tripExternalId = tripId;
        event.operationExternalId = operationExternalId;
        event.when = new Date()
        event.type = type;
        return this.repositoryEvents.save(event)
    }


    generateStopEvent(type, stopId, accountId, tripId) {
        let event = new Events();
        event.accountId = accountId;
        event.stopExternalId = stopId;
        event.tripExternalId = tripId;
        event.when = new Date()
        event.type = type;
        return this.repositoryEvents.save(event)
    }
}
