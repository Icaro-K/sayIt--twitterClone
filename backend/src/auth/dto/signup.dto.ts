/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'A senha deve conter pelo menos 6 caracteres, incluindo letras e números',
  })
  password: string;

  @IsString()
  username: string;

  @IsString()
  name: string;
}
