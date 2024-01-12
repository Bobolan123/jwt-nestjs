import { Group } from 'src/group/entities/group.entity';
import { Column, Entity , ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 30 })
  url: string;

  @Column({ type: 'varchar' })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToMany(() => Group, group => group.roles)
  groups: Group[]
}
