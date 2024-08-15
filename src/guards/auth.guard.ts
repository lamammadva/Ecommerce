import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService)  {}

    
    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        if (!token) throw new UnauthorizedException();
        let payload = this.jwtService.verify(token)
        if (!payload) throw new UnauthorizedException();
        request.userId = payload.userId
        return true


    }
}