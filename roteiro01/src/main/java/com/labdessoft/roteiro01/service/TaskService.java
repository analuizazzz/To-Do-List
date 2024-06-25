package com.labdessoft.roteiro01.service;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> listAllTasks() {
        return taskRepository.findAll();
    }

    public Page<Task> listAll(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task newTask) {
        return taskRepository.save(newTask);
    }

    public Optional<Task> updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id).map(existingTask -> {
            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setCompleted(updatedTask.isCompleted());
            existingTask.setDueDate(updatedTask.getDueDate());
            existingTask.setDueDays(updatedTask.getDueDays());
            existingTask.setTaskType(updatedTask.getTaskType());
            existingTask.setPriority(updatedTask.getPriority());
            return taskRepository.save(existingTask);
        });
    }

    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void deleteAllTasks() {
        taskRepository.deleteAll();
    }
 
}
