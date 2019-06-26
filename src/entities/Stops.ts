/* tslint:disable:no-trailing-whitespace */
import {Entity, Column, PrimaryColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn, Index} from 'typeorm';
import Accounts from './Accounts';
import Trips from './Trips';

@Entity()
@Index(['externalId'], {unique: true})
export default class Stops extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    externalId: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    tripType: string;

    @Column({nullable: true})
    from: string;
    @Column({nullable: true})
    to: string;
    @Column({nullable: true})
    startDate: Date;
    @Column({nullable: true})
    endDate: Date;

    @ManyToOne((type) => Trips, (trip) => trip.stops)
    tripId: Trips;
}
