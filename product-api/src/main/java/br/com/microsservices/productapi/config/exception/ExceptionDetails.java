package br.com.microsservices.productapi.config.exception;

import lombok.Data;

@Data
public class ExceptionDetails {

    private int status;
    private String message;
}
