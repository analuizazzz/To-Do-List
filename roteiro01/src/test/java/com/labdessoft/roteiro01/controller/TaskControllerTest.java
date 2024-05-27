package com.labdessoft.roteiro01.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.entity.TaskPriority;
import com.labdessoft.roteiro01.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
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
    public void should_return_all_tasks() throws Exception {
        when(taskService.listAllTasks()).thenReturn(taskList);

        mockMvc.perform(get("/tasks")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()").value(taskList.size()))
                .andExpect(jsonPath("$[0].id").value(task1.getId()))
                .andExpect(jsonPath("$[1].id").value(task2.getId()));

        verify(taskService, times(1)).listAllTasks();
    }

    @Test
    @DisplayName("Should return task by id")
    public void should_return_task_by_id() throws Exception {
        when(taskService.getTaskById(task1.getId())).thenReturn(java.util.Optional.of(task1));

        mockMvc.perform(get("/tasks/{id}", task1.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(task1.getId()))
                .andExpect(jsonPath("$.title").value(task1.getTitle()));

        verify(taskService, times(1)).getTaskById(task1.getId());
    }

    @Test
    @DisplayName("Should create a new task")
    public void should_create_new_task() throws Exception {
        when(taskService.createTask(any(Task.class))).thenReturn(task1);

        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(task1.getTitle()))
                .andExpect(jsonPath("$.description").value(task1.getDescription()));

        verify(taskService, times(1)).createTask(any(Task.class));
    }

    @Test
    @DisplayName("Should update a task")
    public void should_update_task() throws Exception {
        Task updatedTask = new Task("Tarefa Atualizada", "Descrição Atualizada", LocalDate.of(2024, 6, 20), 25, TaskPriority.MEDIA);
        updatedTask.setId(task1.getId());

        when(taskService.updateTask(eq(task1.getId()), any(Task.class))).thenReturn(java.util.Optional.of(updatedTask));

        mockMvc.perform(put("/tasks/{id}", task1.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedTask)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(updatedTask.getTitle()))
                .andExpect(jsonPath("$.description").value(updatedTask.getDescription()));

        verify(taskService, times(1)).updateTask(eq(task1.getId()), any(Task.class));
    }

    @Test
    @DisplayName("Should delete a task")
    public void should_delete_task() throws Exception {
        when(taskService.deleteTask(task1.getId())).thenReturn(true);

        mockMvc.perform(delete("/tasks/{id}", task1.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(taskService, times(1)).deleteTask(task1.getId());
    }
}
