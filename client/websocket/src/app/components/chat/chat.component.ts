import { Component, OnInit } from '@angular/core';
import { ChatWebsocketService } from 'src/app/chat-websocket.service';
interface Group {
  id: number;
  name: string;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  message!: string;
  chatHistory: string[] = [];
  groupChats: { [id: number] : string[] } = {};
  groups: Group[] = [];
  selectedGroup: number = 0;
  
  constructor(private chatService: ChatWebsocketService) {
    this.groups.push({
      id: 1,
      name: 'group1'
    },
    {
      id: 2,
      name: 'group2'
    })
    this.groupChats[this.groups[0].id] = ['group1 msg1', 'group 1 msg2'];
    this.groupChats[this.groups[1].id] = ['group 2 msg1', 'group 2 msg2'];
    this.onGroupChange({ value: this.groups[0].id});
  }

  ngOnInit(): void {
    this.chatService.connect();
  }

  subscribeToAChat() {
    setTimeout(() => {
      this.chatService.subscribeToChat(this.selectedGroup, (msg) => {
        this.chatHistory.push(msg);
      })
    }, 500);
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.selectedGroup);
    this.message = '';
  }

  onGroupChange(target: any) {
    this.selectedGroup = target?.value;
    this.chatHistory = this.groupChats[this.selectedGroup];
    this.chatService.unsubscribe();
    this.subscribeToAChat();
  }
  
}
