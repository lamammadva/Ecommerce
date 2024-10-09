import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishlistEntity } from "src/entities/wishlist.entity";
import { wishlistService } from "./wishlist.service";
import { wishlistController } from "./wishlist.controller";
import { ProductModule } from "src/product/product.module";

@Module({
    imports: [TypeOrmModule.forFeature([WishlistEntity]),ProductModule],
    controllers: [wishlistController],
    providers: [wishlistService]
})
export class wishlistModule {}