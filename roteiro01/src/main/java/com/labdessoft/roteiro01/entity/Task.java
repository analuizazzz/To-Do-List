package com.labdessoft.roteiro01.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import com.labdessoft.roteiro01.entity.TaskType;
@Setter
@Getter
@Schema(description = "Todos os detalhes sobre uma tarefa. ")
@Entity
public class Task {

    // Getters e Setters
    @Setter
    @Id
    private Long id; @Schema(description = "Id da tarefa. ")
    private String title; @Schema(description = "Título da tarefa. ")

    private String description;@Schema(description = "Todos os detalhes sobre uma tarefa. ")
    private boolean completed;
    @Schema(description = "Data prevista de conclusão da tarefa.")
    private LocalDate dueDate;
    @Schema(description = "Prazo previsto de conclusão da tarefa (em dias).")
    private Integer dueDays;
    @Schema(description = "Tipo de tarefa (Data, Prazo, Livre).")
    private TaskType taskType;


    public Task() {
    }

    public Task(String title, String description, TaskType taskType) {
        this.title = title;
        this.description = description;
        this.taskType = taskType;
        this.completed = false;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void markAsCompleted() {
        this.completed = true;
    }

    public void markAsNotCompleted() {
        this.completed = false;
    }


    @Override
    public String toString() {
        return "Task [id=" + id + ", description=" + description + ", completed=" +
                completed + "]";
    }

}
