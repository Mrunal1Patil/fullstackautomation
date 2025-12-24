package com.tasktracker.backend.tasks;

import jakarta.validation.constraints.NotBlank;

public record CreateTaskRequest(
        @NotBlank String title) {
}