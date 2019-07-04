import {Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Accounts from './Accounts';
import Trips from './Trips';
import Stops from './Stops';

@Entity()
export default class Events extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    when: Date;
    @Column()
    type: string;
    @Column({nullable:true})
    tripExternalId: number;

    @Column({nullable:true})
    stopExternalId: number;

    @ManyToOne((type) => Accounts, (account) => account.events,{ onDelete:'CASCADE'} )
    @JoinColumn({name: 'accountId'})
    account: Accounts;
    
    @ManyToOne((type) => Trips,{ onDelete:'CASCADE'})
    @JoinColumn({name: 'tripExternalId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    trip: Trips;

    @ManyToOne((type) => Stops,{ onDelete:'CASCADE'})
    @JoinColumn({name: 'stopExternalId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    stop: Trips;
}
