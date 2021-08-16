package com.bonitasoft.challenge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
/**
 * This is the class of the main project, this projedt allow us to interact with our database, through
 * resfull API services and token authentication and authorization.
 * @author: Edgar Salazar
 * @version: 08/15/2021
 */
@SpringBootApplication
public class ChallengeApplication {
    public static void main(String[] args) {
        SpringApplication.run(ChallengeApplication.class, args);
    }
}