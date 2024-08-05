import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Education {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    total: number;
}
