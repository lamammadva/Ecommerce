import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { User } from 'src/entities/User.entity';
import { WishlistEntity } from 'src/entities/wishlist.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { FindWislistParams } from './wishlist.types';

@Injectable()
export class wishlistService {
  constructor(
    @InjectRepository(WishlistEntity)
    private wishlistRepo: Repository<WishlistEntity>,
    private productService: ProductService,
    private cls: ClsService,
  ) {}
  find(params?: FindWislistParams) {
    const { where, select } = params;
    return this.wishlistRepo.find({ where, select });
  }
  findOne(params?: FindWislistParams) {
    const { where, select } = params;
    return this.wishlistRepo.findOne({ where, select });
  }
  async getWishlist(userId: number) {
    const myUser = await this.cls.get<User>('user');
    if (!myUser) throw new NotFoundException();
    const wishlist = await this.wishlistRepo.findOne({
      where: { user: { id: userId } },
      relations: ['products','products.categories'],
    });
    return wishlist;
  }
  async createWishlist(productId: number) {
    const myUser = await this.cls.get<User>('user');

    if (!myUser) throw new NotFoundException('not found user');
    const product = await this.productService.findOne({where: { id: productId}})
    if(!product) throw new NotFoundException()
    let wishlist = await  this.wishlistRepo.findOne({where: {user:{id:myUser.id}},relations:['products']})
    
    
    if (!wishlist) {
       wishlist = await  this.wishlistRepo.create({
        user:{id:myUser.id},
        products: [{ id: productId }],
      });
      await this.wishlistRepo.save(wishlist);
      return {
        message:"create  wishlist added product"
      }
      
    }else{
      const products =  wishlist.products.some(product=>product.id===productId);
      console.log(products);
      
      if(!products){
        await wishlist.products.push(product);
        await this.wishlistRepo.save(wishlist);
        return {
          message:"product added wishlist"
        }
        
        
        
      }else{
        wishlist.products = wishlist.products.filter(product=>product.id !== productId);
        await this.wishlistRepo.save(wishlist);
        return {
          message:"product remove wishlist"
        }
        
      }

    }
   
  }
  async deleteWishlist(userId: number) {
    
  }
}
