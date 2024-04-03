package com.projects.websocket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {
    @MessageMapping("/sendMessage/{id}")
    @SendTo("/topic/chat/{id}")
    public Greeting greet(@DestinationVariable long id,  String message) {

        System.out.println(id);
        System.out.println(message);
        return new Greeting("Hello," + HtmlUtils.htmlEscape(message));
    }
}
