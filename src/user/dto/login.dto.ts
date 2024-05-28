import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register.dto';

export class LoginDto extends PartialType(RegisterUserDto) {}
