import {Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Trips from './Trips';
import Stops from './Stops';
import Loads from './Loads';

@Entity()
export default class Operations extends BaseEntity {


    @Column()
    tripExternalId: number;

    @Column()
    stopLoadId: number;

    @Column()

    stopUnloadId: number;

    @PrimaryColumn()
    externalId: number;
    @PrimaryColumn()
    accountId: number;
    

    @OneToMany((type) => Loads, (load) => load.operation)
    Loads: Loads[];

    @ManyToOne((type) => Stops)
    @JoinColumn({name: 'stopLoadId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    stopLoad: Trips;

    @ManyToOne((type) => Stops)
    @JoinColumn({name: 'stopUnloadId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    stopUnload: Trips;


    @ManyToOne((type) => Trips)
    @JoinColumn({name: 'tripExternalId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    trip: Trips;
}
