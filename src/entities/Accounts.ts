import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Accounts {

    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    url: string;
    @Column({ nullable: true })
    accessToken: string;
    @Column({ nullable: true })
    lastUpdate: Date;
    @Column({ nullable: true })
    createDate: Date;
    @Column({ nullable: true })
    valid: boolean  ;
}
