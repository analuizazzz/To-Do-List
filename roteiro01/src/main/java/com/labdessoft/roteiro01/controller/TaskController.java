package com.labdessoft.roteiro01.controller;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import io.swagger.v3.oas.annotations.Operation;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/tasks")
    @Operation(summary = "Lista todas as tarefas da lista")
    public ResponseEntity<List<Task>> listAll() {
        List<Task> taskList = taskRepository.findAll();
        if (taskList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(taskList, HttpStatus.OK);
    }

    @GetMapping("/tasks/{id}")
    @Operation(summary = "Listar tarefa por id")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            Task itemTask = task.get();
            itemTask.setTaskType(itemTask.getTaskType()); 
            return ResponseEntity.ok(itemTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/newTask")
    @Operation(summary = "Criar uma nova tarefa")
    public ResponseEntity<Task> createTask(@RequestBody Task newTask) {
        try {
            Task task = taskRepository.save(newTask);
            return ResponseEntity.status(HttpStatus.CREATED).body(task);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("edit/{id}")
    @Operation(summary = "Editar tarefa")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task taskToUpdate = existingTask.get();
            taskToUpdate.setTitle(updatedTask.getTitle());
            taskToUpdate.setDescription(updatedTask.getDescription());
            taskToUpdate.setCompleted(updatedTask.isCompleted());
            taskToUpdate.setDueDate(updatedTask.getDueDate());
            taskToUpdate.setDueDays(updatedTask.getDueDays());
            taskToUpdate.setTaskType(updatedTask.getTaskType()); 
            taskToUpdate.setPriority(updatedTask.getPriority());
            taskRepository.save(taskToUpdate);
            return ResponseEntity.ok(taskToUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("delete/{id}")
    @Operation(summary = "Deletar Tarefa")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
