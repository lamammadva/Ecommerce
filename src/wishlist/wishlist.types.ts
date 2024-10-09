import { WishlistEntity } from "src/entities/wishlist.entity";
import { FindOptionsSelect, FindOptionsWhere } from "typeorm";

export interface FindWislistParams {
    where?:FindOptionsWhere<WishlistEntity>;
    select?:FindOptionsSelect<WishlistEntity>;
}