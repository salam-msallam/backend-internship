import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  ValidateIf,
} from 'class-validator';

export class CreateTaskDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsBoolean()
  completed?: boolean;
}
