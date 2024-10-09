import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { CommonEntity } from './Base.entity';
import { Category } from './Category.entity';
import { ApiTags } from '@nestjs/swagger';
import { ImageEntity } from './Image.entity';
import { WishlistEntity } from './wishlist.entity';
export type ProductKey = keyof Product;
@Entity()
export class Product extends CommonEntity {
  @Column()
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  description: string;

 
  @ManyToMany(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  categories: Partial<Category>[];


  @ManyToMany(() => WishlistEntity, (wishlist) => wishlist.products, {
  })
  wishlist: WishlistEntity[];
 
  @OneToMany(() => ImageEntity, (image) => image.product, {
    eager: true,
  })
  images: Partial<ImageEntity>[];
}
