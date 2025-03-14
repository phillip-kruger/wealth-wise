package com.wealthwise.advice;

import com.wealthwise.WealthWiseSystem;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import io.quarkiverse.langchain4j.RegisterAiService;

@RegisterAiService
public interface FinancialAdviseService {

    @SystemMessage(WealthWiseSystem.SYSTEM_MESSAGE)
    @UserMessage(FINANCIAL_ADVISOR_USER_MESSAGE)
    String chat(String question);

    public static final String FINANCIAL_ADVISOR_USER_MESSAGE = """
        Question: {question}
    """;
}
