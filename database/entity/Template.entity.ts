import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("template")
export class TemplateEntity {
  @PrimaryGeneratedColumn("identity")
  public id: number

  @Column("text")
  public name: string

  @Column("text")
  public data: string
}
