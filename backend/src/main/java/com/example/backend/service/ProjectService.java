package com.example.backend.service;

import com.example.backend.exception.ClientNotFoundException;
import com.example.backend.exception.ExceptionMessages;
import com.example.backend.model.Project;
import com.example.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(ExceptionMessages.CLIENT_NOT_FOUND + id));

        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());
        existingProject.setBudget(project.getBudget());
        existingProject.setClientId(project.getClientId());

        return projectRepository.save(existingProject);
    }

    public void deleteProject(Long id) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(ExceptionMessages.CLIENT_NOT_FOUND + id));
        projectRepository.deleteById(id);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(ExceptionMessages.CLIENT_NOT_FOUND + id));
    }
}
