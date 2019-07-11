/* tslint:disable:no-trailing-whitespace */
import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    BaseEntity,
    PrimaryGeneratedColumn,
    Index,
    OneToMany,
    Generated,
    JoinColumn,
    CreateDateColumn
} from 'typeorm';
import Accounts from './Accounts';
import Stops from './Stops';
import Events from './Events';

@Entity()
@Index(['externalId', 'accountId'], {unique: true})
export default class Trips extends BaseEntity {



    @PrimaryColumn()
    externalId: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    tripType: string;
    @Column({nullable: true})
    whenControlTimestamp:Date;
    @Column({nullable: true})
    fromAddress: string;
    @Column({nullable: true})
    toAddress: string;
    @Column({nullable: true})
    startDate: Date;
    @Column({nullable: true})
    endDate: Date;
    @OneToMany((type) => Events, (event) => event.trip)
   
    events: Events[];
    @OneToMany((type) => Stops, (stop) => stop.trip)
    stops: Stops[];
    @CreateDateColumn()
    createdAt:Date;
    @PrimaryColumn()
    accountId: number;
    @ManyToOne((type) => Accounts, (account) => account.trips,{ onDelete:'CASCADE'} )
    @JoinColumn({name: 'accountId'})
    account: Accounts;

    
}
