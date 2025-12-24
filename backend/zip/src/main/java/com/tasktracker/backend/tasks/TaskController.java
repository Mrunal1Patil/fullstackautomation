package com.tasktracker.backend.tasks;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository repo;

    public TaskController(TaskRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<TaskDto> list() {
        return repo.findAll().stream().map(TaskDto::from).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskDto create(@Valid @RequestBody CreateTaskRequest req) {
        Task task = new Task();
        task.setTitle(req.title());
        task.setStatus(Task.Status.TODO);

        return TaskDto.from(repo.save(task));
    }

    @PutMapping("/{id}")
    public TaskDto updateStatus(
            @PathVariable String id,
            @RequestBody UpdateTaskStatusRequest req) {
        Task task = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(Task.Status.valueOf(req.status()));
        return TaskDto.from(repo.save(task));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        repo.deleteById(id);
    }
}