import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prestasi {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "text", nullable: true })
    desc: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    foto: string;
}
