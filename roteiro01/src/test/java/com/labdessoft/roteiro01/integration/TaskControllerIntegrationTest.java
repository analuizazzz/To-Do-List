package com.labdessoft.roteiro01.integration;

import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import com.labdessoft.Roteiro01Application;
import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.entity.TaskPriority;
import com.labdessoft.roteiro01.repository.TaskRepository;

import java.time.LocalDate;

import static io.restassured.RestAssured.get;
import static org.hamcrest.Matchers.equalTo;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {Roteiro01Application.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost:8080";
        RestAssured.port = port;

        taskRepository.deleteAll();

        Task task1 = new Task("Primeira tarefa", "Descrição da primeira tarefa", LocalDate.of(2024, 6, 1), 10, TaskPriority.ALTA);
        task1.setId(1L);
        taskRepository.save(task1);
    }

    @Test
    public void givenUrl_whenSuccessOnGetsResponseAndJsonHasRequiredKV_thenCorrect() {
        get("/api/tasks").then().statusCode(200);
    }

    @Test
    public void givenUrl_whenSuccessOnGetsResponseAndJsonHasOneTask_thenCorrect() {
        get("/api/tasks/1L").then().statusCode(200)
            .assertThat().body("description", equalTo("Descrição da primeira tarefa"));
    }
}
