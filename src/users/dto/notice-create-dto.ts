import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Exclude} from "class-transformer";
import {Trail} from "../../trails/trail.entity";
import {User} from "../user.entity";


export class NoticeCreateDto {
    @Exclude()
    userId: number;
    @Exclude()
    id: number;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    @Exclude()
    trail: Trail;
    @Exclude()
    user: User;

    @IsNotEmpty()
    @IsNumber()
    trailId: number;

    @IsNotEmpty()
    @IsNumber()
    notation: number;

    @IsNotEmpty()
    @IsString()
    description: string;
}