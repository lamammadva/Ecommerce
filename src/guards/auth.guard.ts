import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from 'src/common/enum/user-roles.enum';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private userService: UserService, private reflector:Reflector) { }


    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        if (!token) throw new UnauthorizedException();
        try {
            let payload = this.jwtService.verify(token)
            if (!payload) throw new UnauthorizedException();
            request.userId = payload.userId
            let user = await this.userService.findOne({ id: payload.userId })
            if (!user) throw new Error
            let roles = this.reflector.get("roles",context.getHandler())
            if(roles && !user.roles.includes(UserRoles.ADMIN)){
                let checkRole:boolean = !!roles.find(role=>user.roles?.includes(role))
                if (!checkRole) throw new UnauthorizedException();
            }
            request.user = user
        } catch (error){
            throw new UnauthorizedException();
        }
        return true


    }
}