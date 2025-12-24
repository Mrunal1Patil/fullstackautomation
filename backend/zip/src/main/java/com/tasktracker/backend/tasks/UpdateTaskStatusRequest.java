package com.tasktracker.backend.tasks;

import jakarta.validation.constraints.NotBlank;

public record UpdateTaskStatusRequest(
        @NotBlank String status) {
}