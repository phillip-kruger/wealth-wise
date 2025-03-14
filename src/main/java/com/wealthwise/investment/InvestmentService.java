package com.wealthwise.investment;

import com.wealthwise.WealthWiseSystem;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import io.quarkiverse.langchain4j.RegisterAiService;

@RegisterAiService
public interface InvestmentService {


    @SystemMessage(WealthWiseSystem.SYSTEM_MESSAGE)
    @UserMessage(USER_MESSAGE)
    String chat(RiskLevel riskLevel);

    public static final String USER_MESSAGE = """
        Recommend a basic investment mix (e.g., “60% bonds, 40% stocks”) based on the risk level {riskLevel}.
    """;
    
}
