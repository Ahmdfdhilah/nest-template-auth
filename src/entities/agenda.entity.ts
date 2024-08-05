import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agenda {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    slug: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    author: string;

    @Column({ type: "date", nullable: false })
    date: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    location: string;

    @Column({ type: "time", nullable: false })
    time: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    image: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;

    @Column({ type: "text", nullable: true })
    body: string;
}
