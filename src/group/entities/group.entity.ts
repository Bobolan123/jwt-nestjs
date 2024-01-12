import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: 'dev' | 'user' | 'admin' 

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

  @ManyToMany(() => Role, role => role.groups)
  @JoinTable({
    name:"group_role",
    joinColumn: {
      name: "groupId",
      referencedColumnName: "id"
  },
  inverseJoinColumn: {
      name: "roleId",
      referencedColumnName: "id"
  }
  })  
  roles:Role[]

}
