import {Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';
import Trips from './Trips';

@Entity()
export default class Accounts extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    username: string;

    @Column({nullable: true})
    password: string;

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

    @OneToMany((type) => Trips, (trip) => trip.accountId)
    trips: Trips[];
}
