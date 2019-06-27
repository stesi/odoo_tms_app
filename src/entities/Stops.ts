/* tslint:disable:no-trailing-whitespace */
import {Entity, Column, PrimaryColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn, Index, Generated, JoinColumn} from 'typeorm';
import Accounts from './Accounts';
import Trips from './Trips';

@Entity()
@Index(['externalId', 'accountId'], {unique: true})
export default class Stops extends BaseEntity {


    @PrimaryColumn()
    externalId: number;
    @PrimaryColumn()
    accountId: number;

    @Column()
    tripExternalId: number;
    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    arrivalPlannedAt: Date;

    @Column({nullable: true})
    departurePlannedAt: Date;

    @ManyToOne((type) => Accounts, (account) => account.stops, {primary: true})
    account: number;


    @ManyToOne((type) => Trips)
    @JoinColumn({name: 'tripExternalId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    trip: Trips;
}
