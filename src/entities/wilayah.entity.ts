import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wilayah {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 10, nullable: false })
    rt: string;

    @Column({ type: "varchar", length: 10, nullable: false })
    kk: string;

    @Column({ type: "int",  nullable: false })
    male: number;

    @Column({ type: "int",  nullable: false })
    female: number;

    @Column({ type: "int",  nullable: false })
    total: number;
}
