package com.wealthwise.financialadvisor;

import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocket;
import jakarta.inject.Inject;

@WebSocket(path = "/financial-advisor")
public class FinancialAdvisor {

    @Inject
    FinancialAiService financialAiService;

    public enum MessageType {USER_JOINED, USER_LEFT, CHAT_MESSAGE}
    public record ChatMessage(MessageType type, String message) {
    }

    @OnTextMessage
    public ChatMessage onMessage(ChatMessage message){

        String response = financialAiService.getFinancialAdvice(message.message());

        return new ChatMessage(MessageType.CHAT_MESSAGE, response);
    }
    
}
