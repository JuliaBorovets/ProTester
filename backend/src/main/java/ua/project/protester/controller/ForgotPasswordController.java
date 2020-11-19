package ua.project.protester.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.project.protester.exception.DeactivatedUserAccessException;
import ua.project.protester.exception.InvalidPasswordResetTokenException;
import ua.project.protester.exception.MailSendException;
import ua.project.protester.exception.UserNotFoundException;
import ua.project.protester.model.User;
import ua.project.protester.service.ResetPasswordService;

@RestController
@RequestMapping("/api/forgot-password")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ResetPasswordService resetPasswordService;

    @PostMapping
    public ResponseEntity<?> resetPasswordRequest(@RequestBody User user) {
        try {
            resetPasswordService.processResetPasswordRequest(user.getEmail());
            return ResponseEntity.accepted().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().build();
        } catch (MailSendException e) {
            return ResponseEntity.status(502).build();
        } catch (DeactivatedUserAccessException e) {
            return ResponseEntity.status(403).build();
        }
    }

    @GetMapping("/confirm-reset")
    public ResponseEntity<String> validateResetToken(@RequestParam("t") String tokenValue) {
        try {
            String email = resetPasswordService.processTokenValidation(tokenValue);
            return ResponseEntity.ok(email);
        } catch (InvalidPasswordResetTokenException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody User user) {
        try {
            resetPasswordService.processPasswordReset(user.getEmail(), user.getPassword());
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().build();
        } catch (MailSendException e) {
            return ResponseEntity.status(502).build();
        } catch (DeactivatedUserAccessException e) {
            return ResponseEntity.status(403).build();
        }
    }
}
