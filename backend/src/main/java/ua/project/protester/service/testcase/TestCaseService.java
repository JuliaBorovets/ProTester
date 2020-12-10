package ua.project.protester.service.testcase;

import ua.project.protester.exception.TestCaseNotFoundException;
import ua.project.protester.request.TestCaseRequest;
import ua.project.protester.response.TestCaseResponse;
import ua.project.protester.utils.Page;
import ua.project.protester.utils.Pagination;

public interface TestCaseService {

    TestCaseResponse create(TestCaseRequest testCaseRequest);

    TestCaseResponse update(TestCaseRequest testCaseRequest);

    void delete(Long id) throws TestCaseNotFoundException;

    TestCaseResponse findById(Long id) throws TestCaseNotFoundException;

    Page<TestCaseResponse> findAllProjectTestCases(Pagination pagination, Long projectId);
}