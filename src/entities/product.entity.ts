import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    slug: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    category: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    image: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    phone: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    seller: string;

    @Column({ type: "text", nullable: true })
    description: string;
}
