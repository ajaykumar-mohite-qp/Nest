import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  isCompleted: boolean;
}
