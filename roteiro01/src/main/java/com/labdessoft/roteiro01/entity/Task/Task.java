package com.labdessoft.roteiro01.entity.Task;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Schema(description = "Todos os detalhes sobre uma tarefa. ")
public class Task {

    // Getters e Setters
    private Long id; @Schema(description = "Id da tarefa. ")
    private String title; @Schema(description = "Título da tarefa. ")

    private String description;@Schema(description = "Todos os detalhes sobre uma tarefa. ")
    private boolean completed;

    public Task() {
    }

    public Task(String title, String description) {
        this.title = title;
        this.description = description;
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
