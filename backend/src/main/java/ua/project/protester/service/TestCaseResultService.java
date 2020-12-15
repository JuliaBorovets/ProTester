package ua.project.protester.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.project.protester.exception.result.TestCaseResultNotFoundException;
import ua.project.protester.model.executable.result.TestCaseResultDto;
import ua.project.protester.repository.result.TestCaseResultRepository;

@Service
@RequiredArgsConstructor
public class TestCaseResultService {

    private final TestCaseResultRepository testCaseResultRepository;

    @Transactional
    public TestCaseResultDto getTestCaseResultById(int id) throws TestCaseResultNotFoundException {
        return testCaseResultRepository.findById(id);
    }
}