import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class StationCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  oblast: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfPlatforms: number;
}
