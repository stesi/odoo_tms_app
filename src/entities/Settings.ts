import {Entity, Column, PrimaryColumn, OneToMany, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Settings extends BaseEntity {


    @PrimaryColumn()
    name: string;
    @Column({nullable: true})
    StringValue: string;
    @Column({nullable: true})
    IntegerValue: string;
}
