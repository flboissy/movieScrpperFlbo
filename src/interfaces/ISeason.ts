import { IEpisode } from './IEpisode';

export interface ISeason{
    Title: string;
    Season: string;
    totalSeasons: string;
    Episodes: IEpisode[];
}