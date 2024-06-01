package com.labdessoft.roteiro01.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class TaskTest {

    @Test
    @DisplayName("Should create a task with default values")
    public void should_create_task_with_default_values() {
        Task task = new Task();
        assertNotNull(task);
        assertFalse(task.isCompleted());
        assertEquals(TaskType.LIVRE, task.getTaskType());
        assertEquals(TaskPriority.BAIXA, task.getPriority());
    }

    @Test
    @DisplayName("Should set and get task properties")
    public void should_set_and_get_task_properties() {
        LocalDate dueDate = LocalDate.now().plusDays(10);
        Task task = new Task("Test Task", "Test Description", dueDate, 10, TaskPriority.ALTA);

        assertEquals("Test Task", task.getTitle());
        assertEquals("Test Description", task.getDescription());
        assertEquals(dueDate, task.getDueDate());
        assertEquals(10, task.getDueDays());
        assertEquals(TaskType.DATA, task.getTaskType());
        assertEquals(TaskPriority.ALTA, task.getPriority());
    }

    @Test
    @DisplayName("Should mark task as completed")
    public void should_mark_task_as_completed() {
        Task task = new Task();
        task.markAsCompleted();

        assertTrue(task.isCompleted());
    }

    @Test
    @DisplayName("Should calculate task status")
    public void should_calculate_task_status() {
        LocalDate dueDate = LocalDate.now().plusDays(5);
        Task task = new Task("Test Task", "Test Description", dueDate, null, TaskPriority.MEDIA);

        String status = task.getStatus();
        assertEquals("Prevista", status);

        task.setDueDate(LocalDate.now().minusDays(2));
        status = task.getStatus();
        assertTrue(status.contains("dias de atraso"));
    }
}
