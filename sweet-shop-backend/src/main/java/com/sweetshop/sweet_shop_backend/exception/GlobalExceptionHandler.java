package com.sweetshop.sweet_shop_backend.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiError> notFound(NotFoundException ex, HttpServletRequest req){
    return build(HttpStatus.NOT_FOUND, "Not Found", ex.getMessage(), req.getRequestURI());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex, HttpServletRequest req){
    var msg = ex.getBindingResult().getFieldErrors().stream()
      .map(e -> e.getField() + " " + e.getDefaultMessage()).findFirst().orElse("Validation error");
    return build(HttpStatus.BAD_REQUEST, "Bad Request", msg, req.getRequestURI());
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiError> illegalArg(IllegalArgumentException ex, HttpServletRequest req){
    return build(HttpStatus.BAD_REQUEST, "Bad Request", ex.getMessage(), req.getRequestURI());
  }

  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<ApiError> illegalState(IllegalStateException ex, HttpServletRequest req){
    return build(HttpStatus.CONFLICT, "Conflict", ex.getMessage(), req.getRequestURI());
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ApiError> runtime(RuntimeException ex, HttpServletRequest req){
    return build(HttpStatus.FORBIDDEN, "Forbidden", ex.getMessage(), req.getRequestURI());
  }

  private ResponseEntity<ApiError> build(HttpStatus status, String error, String message, String path){
    var body = new ApiError(Instant.now(), status.value(), error, message, path);
    return ResponseEntity.status(status).body(body);
  }
}

