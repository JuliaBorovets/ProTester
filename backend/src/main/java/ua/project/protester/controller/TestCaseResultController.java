package ua.project.protester.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.project.protester.exception.result.TestCaseResultNotFoundException;
import ua.project.protester.model.executable.result.TestCaseResultDto;
import ua.project.protester.service.TestCaseResultService;

@PreAuthorize("isAuthenticated()")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/test-case-results")
public class TestCaseResultController {

    private final TestCaseResultService testCaseResultService;

    @GetMapping("/{id}")
    public TestCaseResultDto getResultById(@PathVariable int id) throws TestCaseResultNotFoundException {
        return testCaseResultService.getTestCaseResultById(id);
    }
}
