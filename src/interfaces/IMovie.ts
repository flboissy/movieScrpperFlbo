import { Rating } from './IRating';
import { IMedia } from './IMedia';


export interface IMovie extends IMedia{
    BoxOffice: string;
    Production: string;
    Website: string;
    DVD: string;
}