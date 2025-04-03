package com.wealthwise;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.wealthwise.advice.FinancialAdviseService;
import com.wealthwise.history.History;
import com.wealthwise.investment.InvestmentService;
import com.wealthwise.taxdection.TaxDeductionsService;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocket;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@WebSocket(path = "/wealth-wise")
public class WealthWiseSocket {

    @Inject
    FinancialAdviseService financialAdviseService;

    @Inject
    TaxDeductionsService taxDeductionsService;

    @Inject
    InvestmentService investmentService;

    public enum MessageType {ERROR, CHAT_MESSAGE, INVESTMENT_MESSAGE, HISTORY_MESSAGE}
    public record ChatMessage(MessageType type, Object message) {
    }

    @OnTextMessage
    @Transactional
    public ChatMessage onMessage(ChatMessage message){

        if(message.message() != null && !String.valueOf(message.message()).isEmpty()){
            History history = new History(String.valueOf(message.message()));
            history.persist();
        }

        if(message.type() == MessageType.CHAT_MESSAGE){
            if(containsTaxDeduction(String.valueOf(message.message()))){ 
                String response = taxDeductionsService.chat(String.valueOf(message.message()));
                return new ChatMessage(MessageType.CHAT_MESSAGE, response);
            } else {
                String response = financialAdviseService.chat(String.valueOf(message.message()));
                return new ChatMessage(MessageType.CHAT_MESSAGE, response);
            } 
        }else if(message.type() == MessageType.INVESTMENT_MESSAGE){
            String response = investmentService.recommend(InvestmentService.RiskLevel.valueOf(String.valueOf(message.message())));
            return new ChatMessage(MessageType.INVESTMENT_MESSAGE, response);
        }else if(message.type() == MessageType.HISTORY_MESSAGE){
            List<History> h = History.findAllByOrderByTimestampDesc();
            return new ChatMessage(MessageType.HISTORY_MESSAGE, h);
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
