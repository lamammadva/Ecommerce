import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dateFns from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgetPaswordDto } from './dto/forget_password.dto';
import config from 'src/config/config';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { ChangePassworDto } from './dto/change_password.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}
  async login(params: LoginUserDto) {
    let user = await this.userService.findOne({ email: params.email }, [
      'id',
      'password',
    ]);
    if (!user)
      throw new HttpException('login  is wrong', HttpStatus.BAD_REQUEST);
    let checkPassword = await bcrypt.compare(params.password, user.password);
    if (!checkPassword)
      throw new HttpException('password is wrong', HttpStatus.BAD_REQUEST);
    const payload = {
      userId: user.id,
    };
    console.log(payload)
    let token = this.jwtService.sign(payload);
    return {
      status: true,
      
      token,
    };
  }

  async register(params: RegisterUserDto) {
    let user = await this.userService.create(params);
    await this.mailerService.sendMail({
      to: user.email,
      from: 'lamanb.memmedova@gmail.com',
      subject: 'Registration for the e-commerce site ',
      text: 'Welcome Registration for the e-commerce site has been completed successfully',
      html: `<b>Welcome ${user.fullName}</b><br><p>Registration for the e-commerce site has been completed successfully</p>`,
    });
    return user;
  }

  async forget_password(body: ForgetPaswordDto) {
    const user = await this.userService.findOne({ email: body.email });
    if (!user) {
      throw new NotFoundException();
    }
    const activateToken = crypto.randomBytes(12).toString('hex');
    const activateExpire = dateFns.addMinutes(new Date(), 30);
    await this.userService.update(user.id, { activateToken, activateExpire });
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Forget Password',
      text: 'welcome',
      html: `<b>welcome </b>${user.fullName} to reset your password please use following link  ${config.url}/auth/forget_password?token=${activateToken}&email=${user.email}/`,
    });
    return {
      toke: activateToken,
      email: user.email,
    };
  }
  async reset_password(body: ResetPasswordDto) {
    const user = await this.userService.findOne({ email: body.email });
    if (!user) {
      throw new NotFoundException();
    }
    if (user.activateToken !== body.token) {
      throw new HttpException('toke is not correct', 400);
    }
    if (user.activateExpire < new Date()) {
      throw new HttpException('toke expired', 400);
    }
    if (body.password !== body.confirm_password) {
      throw new HttpException('passwords is not same', 400);
    }
    let password = await bcrypt.hash(body.password, 10);
    await this.userService.update(user.id, {
      password,
      activateToken: null,
      activateExpire: null,
    });
    return {
      message: 'succesfully',
      status: true,
    };
  }
  async change_password(body: ChangePassworDto) {
    const user = await this.userService.findOne({ email: body.email });
    if (!user) {
      throw new NotFoundException();
    }

    if (!user.password) {
      throw new HttpException('User has no password set', 400);
    }

    const check = await bcrypt.compare(body.password, user.password);
    console.log(check);

    if (!check) {
      throw new HttpException('old password is not correct', 400);
    }
    const new_password = await bcrypt.hash(body.new_password, 10);
    await this.userService.update(user.id, { password: new_password });
    return {
      message: 'password changed successfully',
      status: true,
    };
  }

  validateUser() {}
}
