package com.labdessoft.roteiro01.repository;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.entity.TaskPriority;
import com.labdessoft.roteiro01.entity.TaskType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

public class TaskMock {

    public static Page<Task> createTasks() {
        Task task1 = new Task("Estudar Spring Boot", "Ler documentação e fazer tutoriais", LocalDate.of(2024, 6, 1), 10, TaskPriority.ALTA);
        Task task2 = new Task("Desenvolver Projeto", "Desenvolver um projeto Spring Boot", LocalDate.of(2024, 6, 15), 20, TaskPriority.MEDIA);
        
        List<Task> tasks = Arrays.asList(task1, task2);
        Pageable pageable = PageRequest.of(0, 5);

        return new PageImpl<>(tasks, pageable, tasks.size());
    }
}
