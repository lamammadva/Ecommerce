import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRoles } from "src/common/enum/user-roles.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { UploadService } from "./upload.service";

@Controller('upload')
@ApiTags('Upload')
@UseGuards(AuthGuard)
@Roles(UserRoles.ADMIN,UserRoles.CONTENT_MANAGER)
export class UploadController{
    constructor(private uploadService: UploadService){}
}