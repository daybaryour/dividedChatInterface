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
		
		// this._conversationService.startConversation()
        //         .subscribe(chat => {
		// 			//Set the conversation chat to the response

		// 			//Scroll to the bottom of the chat
		// 			this.scrollToBottom();
        //         })
		
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
		//display the conversation content
		//var curr_time:string = this.getSystemTime();

		//personalize text where neccesary
		//message = this.processOutputMessage(message)

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
		
		//handle what shows next
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
