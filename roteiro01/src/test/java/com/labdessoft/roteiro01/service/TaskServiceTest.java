package com.labdessoft.roteiro01.service;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.entity.TaskPriority;
import com.labdessoft.roteiro01.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task1;
    private Task task2;
    private List<Task> taskList;

    @BeforeEach
    public void setup() {
        task1 = new Task("Estudar Spring Boot", "Ler documentação e fazer tutoriais", LocalDate.of(2024, 6, 1), 10, TaskPriority.ALTA);
        task1.setId(1L);
        task2 = new Task("Desenvolver Projeto", "Desenvolver um projeto Spring Boot", LocalDate.of(2024, 6, 15), 20, TaskPriority.MEDIA);
        task2.setId(2L);
        taskList = Arrays.asList(task1, task2);
    }

    @Test
    @DisplayName("Should return all tasks")
    public void should_list_all_tasks_repository() {
        Pageable pageable = PageRequest.of(0, 5, Sort.by(
            Sort.Order.asc("title"),
            Sort.Order.desc("id")
        ));
        Page<Task> page = new PageImpl<>(taskList, pageable, taskList.size());

        when(taskRepository.findAll(pageable)).thenReturn(page);

        Page<Task> tasks = taskService.listAll(pageable);
        assertNotNull(tasks);
        assertEquals(1, tasks.getTotalPages());
        assertEquals(2, tasks.getNumberOfElements());
        assertEquals(taskList.size(), tasks.getContent().size());

        verify(taskRepository, times(1)).findAll(pageable);
    }

    @Test
    @DisplayName("Should return a task by id")
    public void should_get_task_by_id() {
        when(taskRepository.findById(task1.getId())).thenReturn(Optional.of(task1));

        Optional<Task> foundTask = taskService.getTaskById(task1.getId());
        assertTrue(foundTask.isPresent());
        assertEquals(task1.getId(), foundTask.get().getId());

        verify(taskRepository, times(1)).findById(task1.getId());
    }

    @Test
    @DisplayName("Should create a new task")
    public void should_create_new_task() {
        Task newTask = new Task("Nova Tarefa", "Descrição da nova tarefa", LocalDate.of(2024, 7, 1), 15, TaskPriority.BAIXA);
        when(taskRepository.save(newTask)).thenReturn(newTask);

        Task createdTask = taskService.createTask(newTask);
        assertNotNull(createdTask);
        assertEquals("Nova Tarefa", createdTask.getTitle());

        verify(taskRepository, times(1)).save(newTask);
    }

    @Test
    @DisplayName("Should update an existing task")
    public void should_update_task() {
        Task updatedTask = new Task("Tarefa Atualizada", "Descrição Atualizada", LocalDate.of(2024, 6, 20), 25, TaskPriority.MEDIA);
        updatedTask.setId(task1.getId());

        when(taskRepository.findById(task1.getId())).thenReturn(Optional.of(task1));
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        Optional<Task> result = taskService.updateTask(task1.getId(), updatedTask);
        assertTrue(result.isPresent());
        assertEquals("Tarefa Atualizada", result.get().getTitle());

        verify(taskRepository, times(1)).findById(task1.getId());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    @DisplayName("Should delete a task by id")
    public void should_delete_task() {
        when(taskRepository.existsById(task1.getId())).thenReturn(true);

        boolean isDeleted = taskService.deleteTask(task1.getId());
        assertTrue(isDeleted);

        verify(taskRepository, times(1)).existsById(task1.getId());
        verify(taskRepository, times(1)).deleteById(task1.getId());
    }

    @Test
    @DisplayName("Should return empty optional for non-existent task id")
    public void should_return_empty_optional_for_non_existent_task_id() {
        when(taskRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Task> task = taskService.getTaskById(999L);
        assertFalse(task.isPresent());

        verify(taskRepository, times(1)).findById(999L);
    }

    @Test
    @DisplayName("Should return false when deleting non-existent task id")
    public void should_return_false_when_deleting_non_existent_task_id() {
        when(taskRepository.existsById(999L)).thenReturn(false);

        boolean isDeleted = taskService.deleteTask(999L);
        assertFalse(isDeleted);

        verify(taskRepository, times(1)).existsById(999L);
    }
}
