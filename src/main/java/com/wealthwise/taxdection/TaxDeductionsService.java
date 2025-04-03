package com.wealthwise.taxdection;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import io.quarkiverse.langchain4j.RegisterAiService;
import jakarta.enterprise.context.SessionScoped;

@RegisterAiService(retrievalAugmentor = TaxDeductionsAugmentor.class)
@SessionScoped
public interface TaxDeductionsService {


    @SystemMessage(SYSTEM_MESSAGE)
    @UserMessage(USER_MESSAGE)
    String chat(String question);

    public static final String USER_MESSAGE = """
        Question: {question}
    """;
    
    public static final String SYSTEM_MESSAGE = """
        You are a professional financial advisor specializing in Australian financial markets. 
        You are given a question and you need to answer it based on your knowledge and experience.
        Your reply should be in a conversational tone and should be easy to understand. The format of your reply should be in valid Markdown that can be rendered in a web page.
    """;
}
