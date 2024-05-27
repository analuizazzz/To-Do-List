package com.labdessoft.roteiro01.repository;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.entity.TaskPriority;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    @DisplayName("Should save a task")
    public void should_save_task() {
        Task task = new Task("Test Task", "Test Description", LocalDate.now().plusDays(10), 10, TaskPriority.MEDIA);
        Task savedTask = taskRepository.save(task);

        assertNotNull(savedTask);
        assertNotNull(savedTask.getId());
    }

    @Test
    @DisplayName("Should find task by ID")
    public void should_find_task_by_id() {
        Task task = new Task("Test Task", "Test Description", LocalDate.now().plusDays(10), 10, TaskPriority.MEDIA);
        Task savedTask = taskRepository.save(task);

        Optional<Task> foundTask = taskRepository.findById(savedTask.getId());
        assertTrue(foundTask.isPresent());
        assertEquals(savedTask.getId(), foundTask.get().getId());
    }

    @Test
    @DisplayName("Should find all tasks")
    public void should_find_all_tasks() {
        Task task1 = new Task("Task 1", "Description 1", LocalDate.now().plusDays(5), 5, TaskPriority.ALTA);
        Task task2 = new Task("Task 2", "Description 2", LocalDate.now().plusDays(15), 15, TaskPriority.BAIXA);
        taskRepository.save(task1);
        taskRepository.save(task2);

        List<Task> tasks = taskRepository.findAll();
        assertFalse(tasks.isEmpty());
        assertEquals(2, tasks.size());
    }

    @Test
    @DisplayName("Should delete a task")
    public void should_delete_task() {
        Task task = new Task("Task to Delete", "Description", LocalDate.now().plusDays(10), 10, TaskPriority.MEDIA);
        Task savedTask = taskRepository.save(task);

        taskRepository.deleteById(savedTask.getId());

        Optional<Task> deletedTask = taskRepository.findById(savedTask.getId());
        assertFalse(deletedTask.isPresent());
    }
}
