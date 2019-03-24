import { IMedia } from "./IMedia";

export interface IEpisode extends IMedia {
    Season: string;
    Episode: string;
}