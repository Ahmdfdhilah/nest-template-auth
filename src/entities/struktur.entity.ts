import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Struktur {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    alamat: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    jabatan: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    foto: string;
}
