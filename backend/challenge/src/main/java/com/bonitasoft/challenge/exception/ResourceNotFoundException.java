package com.bonitasoft.challenge.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
/**
 * Error details to return not found exception.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends Exception{
    private static final long serialVersionUID = 1L;
    public ResourceNotFoundException(String message){
        super(message);
    }
}