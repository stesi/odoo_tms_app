/* tslint:disable:no-trailing-whitespace */
import {Entity, Column, PrimaryColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn, Index, OneToMany} from 'typeorm';
import Accounts from './Accounts';
import Stops from './Stops';

@Entity()
@Index(['externalId', 'accountId'], {unique: true})
export default class Trips extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    externalId: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    tripType: string;

    @Column({nullable: true})
    fromAddress: string;
    @Column({nullable: true})
    toAddress: string;
    @Column({nullable: true})
    startDate: Date;
    @Column({nullable: true})
    endDate: Date;

    @OneToMany((type) => Stops, (stop) => stop.tripId)
    stops: Stops[];

    @ManyToOne((type) => Accounts, (account) => account.trips)
    accountId: Accounts;
}
