import { Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, In } from 'typeorm';
import Trips from './Trips';
import Stops from './Stops';
import Loads from './Loads';

@Entity()
@Index(['externalId', 'accountId'])
@Index(['stopLoadId', 'accountId'])
@Index(['stopUnloadId', 'accountId'])
@Index(['tripExternalId', 'accountId'])
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

    @Column({ nullable: true })
    whenLoadExecutedAt: Date;
    @Column({ nullable: true })
    whenUnloadExecutedAt: Date;

    @OneToMany((type) => Loads, (load) => load.operation)
    Loads: Loads[];

    @ManyToOne((type) => Stops, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'stopLoadId', referencedColumnName: 'externalId' })
    @JoinColumn({ name: 'accountId', referencedColumnName: 'accountId' })
    stopLoad: Trips;

    @ManyToOne((type) => Stops, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'stopUnloadId', referencedColumnName: 'externalId' })
    @JoinColumn({ name: 'accountId', referencedColumnName: 'accountId' })
    stopUnload: Trips;


    @ManyToOne((type) => Trips, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tripExternalId', referencedColumnName: 'externalId' })
    @JoinColumn({ name: 'accountId', referencedColumnName: 'accountId' })
    trip: Trips;


}
