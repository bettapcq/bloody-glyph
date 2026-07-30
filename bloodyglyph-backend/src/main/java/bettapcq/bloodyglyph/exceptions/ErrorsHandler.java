package bettapcq.bloodyglyph.exceptions;


import bettapcq.bloodyglyph.payloads.errors.ErrorsDTO;
import bettapcq.bloodyglyph.payloads.errors.ErrorsListDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ErrorsHandler {


    // 400 - Validation Exception (errors list)
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorsListDTO> handleValidationException(ValidationException ex) {
        ErrorsListDTO response = new ErrorsListDTO(
                ex.getMessage(),
                LocalDateTime.now(),
                ex.getErrors()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // 403 - Authorization Denied Exception
    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<ErrorsDTO> handleForbidden(AuthorizationDeniedException ex) {
        ErrorsDTO response = new ErrorsDTO(
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }


    // 404 - Not Found Exception
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorsDTO> handleNotFound(NotFoundException ex) {
        ErrorsDTO response = new ErrorsDTO(
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }


    // 500 - Generic Exception

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorsDTO> handleGenericException(Exception ex) {
        ex.printStackTrace();

        ErrorsDTO response = new ErrorsDTO(
                "Internal error, please try later",
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }


}
