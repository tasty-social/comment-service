import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from 'src/common/decorator/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    const user = request.user

    if (!user || !requiredRoles.some((role) => user.roles.includes(role))) {
      throw new ForbiddenException('You do not have the required role')
    }

    return true
  }
}
