package ua.project.protester.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.project.protester.exception.result.TestCaseResultNotFoundException;
import ua.project.protester.model.executable.result.TestCaseResult;
import ua.project.protester.repository.result.TestCaseResultRepository;

@Service
@RequiredArgsConstructor
public class AnalyzeTestCaseResultService {

    private final TestCaseResultRepository testCaseResultRepository;

    public TestCaseResult getTestCaseResultById(int id) throws TestCaseResultNotFoundException {
        // TODO: uncomment
        //return testCaseResultRepository.findTestCaseResultById(id)
        //            .orElseThrow(TestCaseResultNotFoundException::new);
        return null;
    }
}
