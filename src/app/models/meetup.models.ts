import { User } from "./auth.models";

export interface Meetup {
    id: number;
    name: string;
    description: string;
    location: string;
    target_audience: string;
    need_to_know: string;
    will_happen: string;
    reason_to_come: string;
    time: Date;
    duration: number;
    createdBy: number;
    owner: User;
    users: User[];
}