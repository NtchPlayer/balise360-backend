import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too week!',
  // })
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  firstname: string;

  @IsNotEmpty()
  @MinLength(2)
  lastname: string;

  @IsNotEmpty()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: 'Birthday must be formatted as yyyy-mm-dd',
  })
  birthday: string;

  @IsNotEmpty()
  @IsIn(['female', 'male', 'other'])
  gender: string;
}
