import { Timestamp } from "@angular/fire/firestore";

export interface Comment {
    name: string,
    content: string,
    id: string,
    postId : string,
    createdAt: Timestamp
}
