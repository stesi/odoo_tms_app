import {Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index} from 'typeorm';

import Operations from './Operations';

@Entity()
@Index(['externalId', 'accountId'])
@Index(['operationExternalId', 'accountId'])
export default class Loads extends BaseEntity {
    @PrimaryColumn()
    externalId: number;
    @PrimaryColumn()
    accountId: number;
    
    @Column()
    name: string;

    @Column()
    operationExternalId: number;

    @Column({ default:false})
    confirmed: boolean;

    @Column({default:false})
    isMissing: boolean;


    @ManyToOne((type) => Operations,{ onDelete:'CASCADE'})
    @JoinColumn({name: 'operationExternalId', referencedColumnName: 'externalId'})
    @JoinColumn({name: 'accountId', referencedColumnName: 'accountId'})
    operation: Operations;
    

}
