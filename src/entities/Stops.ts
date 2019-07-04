/* tslint:disable:no-trailing-whitespace */
import {Entity, Column, PrimaryColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn, Index, Generated, JoinColumn, OneToMany} from 'typeorm';
import Accounts from './Accounts';
import Trips from './Trips';
import Operations from './Operations';

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

    @Column({nullable: true})
    arrivalExecutedAt: Date;

    @Column({nullable: true})
    departureExecutedAt: Date;

    @ManyToOne((type) => Accounts, (account) => account.stops, {primary: true, onDelete:'CASCADE'})
    account: number;


    @ManyToOne((type) => Trips,{ onDelete:'CASCADE'})
    @JoinColumn({name: 'tripExternalId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    trip: Trips;


    @OneToMany((type) => Operations, (operation) => operation.stopLoad)
    loadOperations: Operations[];
    
    @OneToMany((type) => Operations, (operation) => operation.stopUnload)
    unloadOperations: Operations[];

}
