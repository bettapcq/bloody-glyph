package bettapcq.bloodyglyph.exceptions;


import bettapcq.bloodyglyph.payloads.errors.ErrorsDTO;
import bettapcq.bloodyglyph.payloads.errors.ErrorsListDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ErrorsHandler {


    // 400 - Bad Request Exception
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorsDTO> handleBadRequest(BadRequestException ex) {
        ErrorsDTO response = new ErrorsDTO(
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

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

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorsDTO> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex
    ) {
        ErrorsDTO response = new ErrorsDTO(
                "Il valore del campo è in un formato non valido",
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }


    // 401 - Bad Credentials
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorsDTO> handleBadCredentials(
            BadCredentialsException ex
    ) {
        ErrorsDTO response = new ErrorsDTO(
                "Email o password non corretti",
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
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

    // 503 - Service Unavailable
    @ExceptionHandler(EmailSendingException.class)
    public ResponseEntity<ErrorsDTO> handleEmailSendingException(
            EmailSendingException ex
    ) {
        ErrorsDTO response = new ErrorsDTO(
                ex.getMessage(),
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(response);
    }


    // 500 - Generic Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorsDTO> handleGenericException(Exception ex) {
        ex.printStackTrace();

        ErrorsDTO response = new ErrorsDTO(
                "Errore interno, per favore riprova più tardi",
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }


}
