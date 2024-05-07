package com.labdessoft.roteiro01.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Setter
@Getter
@Schema(description = "Todos os detalhes sobre uma tarefa.")
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Schema(description = "Título da tarefa.")
    private String title;

    @Schema(description = "Descrição da tarefa.")
    private String description;

    @Schema(description = "Indica se a tarefa foi concluída.")
    private boolean completed;

    @Schema(description = "Data prevista de conclusão da tarefa.")
    private LocalDate dueDate;

    @Schema(description = "Prazo previsto de conclusão da tarefa (em dias).")
    private Integer dueDays;

    @Schema(description = "Tipo de tarefa (Data, Prazo, Livre).")
    @Enumerated(EnumType.STRING)
    private TaskType taskType;

    @Schema(description = "Prioridade da tarefa (Alta, Média, Baixa).")
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    public Task() {
        this.completed = false;
        this.taskType = TaskType.LIVRE;
        this.priority = TaskPriority.BAIXA;
    }

    public Task(String title, String description, LocalDate dueDate, Integer dueDays, TaskPriority priority) {
        this.title = title;
        this.description = description;
        this.completed = false;
        this.dueDate = dueDate;
        this.dueDays = dueDays;
        this.taskType = determineTaskType(dueDate, dueDays);
        this.priority = priority;
    }

    private TaskType determineTaskType(LocalDate dueDate, Integer dueDays) {
        if (dueDate != null) {
            return TaskType.DATA;
        } else if (dueDays != null) {
            return TaskType.PRAZO;
        } else {
            return TaskType.LIVRE;
        }
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

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        this.taskType = determineTaskType(dueDate, dueDays);
    }

    public Integer getDueDays() {
        return dueDays;
    }

    public void setDueDays(Integer dueDays) {
        this.dueDays = dueDays;
        this.taskType = determineTaskType(dueDate, dueDays);
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public void markAsCompleted() {
        this.completed = true;
    }

    public void markAsNotCompleted() {
        this.completed = false;
    }

    public String getStatus() {
        LocalDate today = LocalDate.now();
        switch (taskType) {
            case DATA:
                if(completed){
                    return "Concluída";
                }else if (dueDate.isAfter(today)) {
                    return "Prevista";
                } else if (dueDate.isBefore(today)) {
                    long daysLate = ChronoUnit.DAYS.between(dueDate, today);
                    return daysLate + " dias de atraso";
                } 
            case PRAZO:
                LocalDate dueDateFromDays = LocalDate.now().plusDays(dueDays);
                if(completed){
                    return "Concluída";
                }else if (dueDateFromDays.isAfter(today)) {
                    return "Prevista";
                } else if (dueDateFromDays.isBefore(today)) {
                    long daysLate = ChronoUnit.DAYS.between(dueDateFromDays, today);
                    return daysLate + " dias de atraso";
                }
            default:
                return completed ? "Concluída" : "Prevista";
        }
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", completed=" + completed +
                ", dueDate=" + dueDate +
                ", dueDays=" + dueDays +
                ", taskType=" + taskType +
                ", priority=" + priority +
                '}';
    }
}
