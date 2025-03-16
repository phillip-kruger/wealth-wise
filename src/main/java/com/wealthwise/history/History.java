package com.wealthwise.history;

import java.time.LocalDateTime;
import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.panache.common.Sort;
import jakarta.persistence.Entity;

@Entity
public class History extends PanacheEntity{
    public LocalDateTime timestamp;
    public String question;
    
    
    public History(){

    }

    public History(String question) {
        this.timestamp = LocalDateTime.now();
        this.question = question;
    }

    public History(LocalDateTime timestamp, String question) {
        this.timestamp = timestamp;
        this.question = question;
    }

    public static List<History> findAllByOrderByTimestampDesc() {
        return findAll(Sort.by("timestamp").descending()).list();
    }
}
