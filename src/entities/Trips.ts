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
    JoinColumn
} from 'typeorm';
import Accounts from './Accounts';
import Stops from './Stops';

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
    fromAddress: string;
    @Column({nullable: true})
    toAddress: string;
    @Column({nullable: true})
    startDate: Date;
    @Column({nullable: true})
    endDate: Date;

    @OneToMany((type) => Stops, (stop) => stop.trip, {
        eager: true
    })
    stops: Stops[];
    @PrimaryColumn()
    accountId: number;
    @ManyToOne((type) => Accounts, (account) => account.trips )
    @JoinColumn({name: 'accountId'})
    account: Accounts;
}
