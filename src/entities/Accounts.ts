import {Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import Trips from './Trips';
import Stops from './Stops';
import Events from './Events';

@Entity()
export default class Accounts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    password: string;
    @Column()
    userId: number;

    @Column({nullable: true})
    url: string;
    @Column({nullable: true})
    accessToken: string;
    @Column({nullable: true})
    lastUpdate: Date;
    @Column({nullable: true})
    createDate: Date;
    @Column({nullable: true})
    valid: boolean;

    @OneToMany((type) => Trips, (trip) => trip.account)
    trips: Trips[];

    @OneToMany((type) => Stops, (stop) => stop.account)
    stops: Stops[];

    @OneToMany((type) => Events, (event) => event.account)
    events: Events[];
}
