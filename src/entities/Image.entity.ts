
import { BeforeRemove, Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './Product.entity';
import { rmSync } from 'fs';
import { join } from 'path';
import { CommonEntity } from './Commen.entity';

@Entity('image')
export class ImageEntity extends CommonEntity {
  @Column()
  filename: string;

  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  product: Product;

  @BeforeRemove()
  beforeRemove() {
    rmSync(join(__dirname, '../../uploads', this.filename));
  }
}
