package com.tasktracker.backend.tasks;

import java.time.Instant;

public record TaskDto(
        String id,
        String title,
        String status,
        Instant createdAt) {
    public static TaskDto from(Task t) {
        return new TaskDto(
                t.getId(),
                t.getTitle(),
                t.getStatus().name(),
                t.getCreatedAt());
    }
}