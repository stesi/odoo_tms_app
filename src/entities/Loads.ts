import {Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

import Operations from './Operations';

@Entity()
export default class Loads extends BaseEntity {
    @PrimaryColumn()
    externalId: number;
    @PrimaryColumn()
    accountId: number;
    
    @Column()
    name: string;

    @Column()
    operationExternalId: number;


    @ManyToOne((type) => Operations)
    @JoinColumn({name: 'operationExternalId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    operation: Operations;

}
