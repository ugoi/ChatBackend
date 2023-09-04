import { ExecutionContext, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const errors = [];

        if (!request.body.username) {
            errors.push({ field: 'username', message: 'Username should not be empty' });
        }

        if (!request.body.password) {
            errors.push({ field: 'password', message: 'Password should not be empty' });
        }

        if (errors.length) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Input data validation failed',
                details: errors
            }, HttpStatus.BAD_REQUEST);
        }

        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
