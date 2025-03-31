package com.UrbanFlow.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // Optional: specify role (e.g., "USER", "ADMIN", "DRIVER", "CONDUCTOR")
    // If not provided, the backend will default to USER.
    private String role;
}
