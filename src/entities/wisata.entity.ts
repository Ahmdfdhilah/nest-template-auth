import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wisata {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    slug: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "text", nullable: true })
    body: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    foto: string;
}
