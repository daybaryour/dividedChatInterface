//Get required Parameters
import { Component, OnInit } from '@angular/core';

import { ConversationService } from './services/conversation.service'; //Import Conversation service 

//declare global variables to allow us use jQuery 
declare var $:any; 

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ ConversationService ]
})

export class AppComponent {
	conversation : any[];
	parsed_convo:any = [];
	constructor(private _conversationService: ConversationService) {}

	//Initialize this when page is opened
	ngOnInit() {
		this.conversation = [];

		//Feed in dummy start message, this can feed from a a service or some json file as neccesary
		var start_message = "Hello there i'm the 2 sided chat Echo bot, developed by Adewumi Adebayo, type in anything and watch me repeat it with so much ease, as usual contributions are welcome.";

		this.updateConversationUi(start_message, "system");		
	}

	sendConversationMessage(message, next_message = false) {
		if(message != "") {			
			//save neccesary params as required
			var result:any;			
		
			var newMessage = { message : message, sender : "user", class:"personal", action: next_message };
			this.updateConversationUi(message, "user");

			$('#chatInputMessage').val(null);

			this.addLoadingMessage();
			setTimeout(() => {
				this.removeLoadingMessage();
				this.updateConversationUi(message, "system"); //Echo Message that was displayed previously
			}, 2000);
		}
		
	}

	updateConversationUi(message, sender)
	{
        if(this.parsed_convo == null) {
        } else {    
            var conversation_length = this.parsed_convo.length;
        }

        var curr_convo = {message:message, sender: sender}
		this.conversation.push(curr_convo);

        if(typeof(Storage) !== "undefined") {
            localStorage.setItem('curr_convo', JSON.stringify(this.conversation));

			var retrieved_convo = localStorage.getItem('curr_convo');
			this.parsed_convo = JSON.parse(retrieved_convo);			
        } else {
            
		}
		
		//handle scrolling to buttom feature
        this.scrollToBottom(); 
	}
	
	//Scroll to bottom using jquery
	scrollToBottom() {
        $("#chat_msg").animate({ scrollTop: $('#chat_msg').prop("scrollHeight")}, "slow");
	}

	addLoadingMessage() {
		this.updateConversationUi("", "loading");
	}

	removeLoadingMessage() {
		var loadingMessage = this.parsed_convo;
		this.conversation.pop();
	}
}
