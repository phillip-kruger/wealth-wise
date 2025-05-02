package com.wealthwise.taxdection; 

import java.io.File;
import java.util.List;

import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.loader.FileSystemDocumentLoader;
import dev.langchain4j.data.document.parser.TextDocumentParser;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.pgvector.PgVectorEmbeddingStore;
import io.quarkus.logging.Log;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import static dev.langchain4j.data.document.splitter.DocumentSplitters.recursive;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
public class TaxDeductionsIngestor {

/**
     * The embedding store (the database).
     * The bean is provided by the quarkus-langchain4j-redis extension.
     */
    @Inject
    PgVectorEmbeddingStore store;

    /**
     * The embedding model (how the vector of a document is computed).
     * The bean is provided by the LLM (like openai) extension.
     */
    @Inject
    EmbeddingModel embeddingModel;

    @ConfigProperty(name = "quarkus.profile")
    String profile;
    
    public void ingestTaxDeductions(@Observes StartupEvent event) {
        if(!profile.equalsIgnoreCase("maas")){
            Log.infof("Ingesting documents...");
            List<Document> documents = FileSystemDocumentLoader.loadDocuments(new File("src/main/resources/documents/").toPath(),
                    new TextDocumentParser());
            if(!documents.isEmpty()) {
                var ingestor = EmbeddingStoreIngestor.builder()
                    .embeddingStore(store)
                    .embeddingModel(embeddingModel)
                    .documentSplitter(recursive(500, 0))
                   .build();
                ingestor.ingest(documents);
                Log.infof("Ingested %d documents.%n", documents.size());
            }
        }
    }
}
