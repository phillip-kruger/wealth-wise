package com.wealthwise;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.wealthwise.advice.FinancialAdviseService;
import com.wealthwise.investment.InvestmentService;
import com.wealthwise.investment.RiskLevel;
import com.wealthwise.taxdection.TaxDeductionsService;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocket;
import jakarta.inject.Inject;

@WebSocket(path = "/wealth-wise")
public class WealthWiseSocket {

    @Inject
    FinancialAdviseService financialAdviseService;

    @Inject
    TaxDeductionsService taxDeductionsService;

    @Inject
    InvestmentService investmentService;

    public enum MessageType {ERROR, CHAT_MESSAGE, INVESTMENT_MESSAGE}
    public record ChatMessage(MessageType type, String message) {
    }

    @OnTextMessage
    public ChatMessage onMessage(ChatMessage message){

        if(message.type() == MessageType.CHAT_MESSAGE){
            if(containsTaxDeduction(message.message())){ 
                String response = taxDeductionsService.chat(message.message());
                return new ChatMessage(MessageType.CHAT_MESSAGE, response);
            } else {
                String response = financialAdviseService.chat(message.message());
                return new ChatMessage(MessageType.CHAT_MESSAGE, response);
            } 
        }else if(message.type() == MessageType.INVESTMENT_MESSAGE){
            String response = investmentService.chat(RiskLevel.valueOf(message.message()));
            return new ChatMessage(MessageType.INVESTMENT_MESSAGE, response);
        }

        return new ChatMessage(MessageType.ERROR, "Unknown message type");
    }
    
    private boolean containsTaxDeduction(String input) {
        String regex = "(?i)\\btax deduction(s?)\\b";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }
}
