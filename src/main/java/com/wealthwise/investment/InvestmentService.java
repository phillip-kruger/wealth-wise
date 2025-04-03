package com.wealthwise.investment;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import io.quarkiverse.langchain4j.RegisterAiService;

@RegisterAiService
public interface InvestmentService {


    @SystemMessage(SYSTEM_MESSAGE)
    @UserMessage(USER_MESSAGE)
    String recommend(RiskLevel riskLevel);

    public static final String USER_MESSAGE = """
        Recommend a basic investment mix (e.g., “60% bonds, 40% stocks”) based on the risk level {riskLevel}.
    """;
    
    public static final String SYSTEM_MESSAGE = """
        You are a professional financial advisor specializing in Australian financial markets. 
        You are given a question and you need to answer it based on your knowledge and experience.
        Your reply should be in a conversational tone and should be easy to understand. 
        The format of your reply should be in valid Markdown that can be rendered in a web page.
    """;
    
    public static enum RiskLevel {
        Conservative, Balanced, Aggressive
    }
}
