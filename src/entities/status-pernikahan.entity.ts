import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StatusPernikahan {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "int",  nullable: false })
    total: number;
}
