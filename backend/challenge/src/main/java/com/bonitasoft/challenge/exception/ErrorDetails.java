package com.bonitasoft.challenge.exception;

import java.util.Date;
/**
 * Error details to return handled exceptions.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
public class ErrorDetails {
    private Date timestamp;
    private String message;
    private String details;

    public ErrorDetails(Date timestamp, String message, String details) {
        super();
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public String getDetails() {
        return details;
    }
}