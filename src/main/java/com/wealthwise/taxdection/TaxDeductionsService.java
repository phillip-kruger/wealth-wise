package com.wealthwise.taxdection;

import com.wealthwise.WealthWiseSystem;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import io.quarkiverse.langchain4j.RegisterAiService;

@RegisterAiService(retrievalAugmentor = TaxDeductionsAugmentor.class)
public interface TaxDeductionsService {


    @SystemMessage(WealthWiseSystem.SYSTEM_MESSAGE)
    @UserMessage(USER_MESSAGE)
    String chat(String question);

    public static final String USER_MESSAGE = """
        Question: {question}
    """;
    
}
