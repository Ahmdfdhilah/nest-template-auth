import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DanaDesa {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    nama: string;

    @Column({ type: "decimal", precision: 12, scale: 2, nullable: false })
    anggaran: number;

    @Column({ type: "decimal", precision: 12, scale: 2, nullable: false })
    realisasi: number;

    @Column({ type: "decimal", precision: 12, scale: 2, nullable: false })
    selisih: number;

    @Column({ type: "decimal", precision: 5, scale: 2, nullable: false })
    presentase: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    tipe: string;
}
