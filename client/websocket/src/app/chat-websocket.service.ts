import { Injectable } from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
    providedIn: 'root'
})
export class ChatWebsocketService {
    private stompClient!: Stomp.Client;
    private subscription!: Stomp.Subscription;

    constructor() {

    }

    connect() {
        const socket = new SockJS('http://localhost:8080/chat');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, () => {
            console.log("connected to websocket");
        });
    }

    sendMessage(message: string, id: number) {
        this.stompClient.send('/app/sendMessage/' + id, {}, message);
    }

    subscribeToChat(id: number, callback: (message: string) => void) {
        const subs = '/topic/chat/' + id;
        console.log("subscribing to " + subs);
        this.subscription = this.stompClient.subscribe(subs, (response) => {
            callback(response.body);
        });
    }

    unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}