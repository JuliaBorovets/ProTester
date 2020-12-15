package ua.project.protester.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.project.protester.request.TestCaseRequest;

import java.util.List;

@Service
@Slf4j
public class StartService {

    // TODO: uncomment
    // private WebDriver webDriver;
    // private DataSetRepository dataSetRepository;
    // private TestScenarioService testScenarioService;
    // private ModelMapper modelMapper;
    // private ActionResultRepository actionResultRepository;
    // private TestCaseResultRepository resultRepository;


    // TODO uncomment
    /*
    @Autowired
    public StartService(@Lazy WebDriver webDriver, DataSetRepository dataSetRepository, TestScenarioService testScenarioService, ModelMapper modelMapper, ActionResultRepository actionResultRepository, TestCaseResultRepository resultRepository) {
        // TODO: delete all logs, uncomment lines
        // this.webDriver = webDriver;
        log.warn(webDriver.toString());
        // this.dataSetRepository = dataSetRepository;
        log.warn(dataSetRepository.toString());
        // this.testScenarioService = testScenarioService;
        log.warn(testScenarioService.toString());
        // this.modelMapper = modelMapper;
        log.warn(modelMapper.toString());
        // this.actionResultRepository = actionResultRepository;
        log.warn(actionResultRepository.toString());
        // this.resultRepository = resultRepository;
        log.warn(resultRepository.toString());
    }
    */

    public void execute(List<TestCaseRequest> testCaseRequests) {
        List<Integer> testCaseResults = getTestCaseExecutionResult(testCaseRequests);
        for (int i = 0; i < testCaseRequests.size(); i++) {
            runTestCase(testCaseRequests.get(i), testCaseResults.get(i));
        }
    }

    private void runTestCase(TestCaseRequest testCaseRequest, int testCaseResultId) {
        // TODO: implement
        /* TestCase testCase = modelMapper.map(testCaseRequest, TestCase.class);
        List<DataSet> dataSets = new ArrayList<>();

        testCaseRequest.getDataSetId()
                .forEach(id -> dataSets.add(dataSetRepository.findDataSetById(id).get()));
        testCase.setDataSetList(dataSets);

        Map<String, String> initMap = new HashMap<>();
        initMap.put("username", "volodya");
        initMap.put("password", "tank85943221");
        initMap.put("url", "www.youtube.com");

        TestCaseResult testCaseResult = resultRepository.findTestCaseResultById(testCaseResultId).get();

        testCase.getDataSetList().stream()
                .map(DataSet::getId)
                .map(id -> connectDataSetWithTestScenario(testCase.getScenarioId().intValue(), id, initMap))
                .filter(Objects::nonNull)
                .forEach(outerComponent -> {
                            resultRepository.updateTestCaseResultStartDate(testCaseResultId, OffsetDateTime.now());
                            try {
                                Consumer<ActionResult> resultCallback = (action) -> {
                                    action.setTestCaseResultId(testCaseResultId);
                                    actionResultRepository.save(action);
                                    testCaseResult.getInnerResults().add(action);
                                };
                                outerComponent.get().execute(initMap, webDriver, resultCallback);
                                resultRepository.updateTestCaseResultStatus(testCaseResult.getId(), ResultStatus.PASSED);
                                resultRepository.updateTestCaseResultEndDate(testCaseResult.getId(), OffsetDateTime.now());
                            } catch (ActionExecutionException e) {
                                resultRepository.updateTestCaseResultStatus(testCaseResult.getId(), ResultStatus.FAILED);
                                resultRepository.updateTestCaseResultEndDate(testCaseResult.getId(), OffsetDateTime.now());
                            }
                        }
                );*/
        // TODO: delete log
        log.warn(testCaseRequest.toString() + " " + testCaseResultId);
    }

    private List<Integer> getTestCaseExecutionResult(List<TestCaseRequest> testCaseRequests) {
        // TODO: implement
        /*return testCaseRequests.stream()
                .map(testCaseRequest -> {
                    TestCaseResult testCaseResult = new TestCaseResult();
                    List<ActionResult> actionResult = new ArrayList<>();
                    testCaseResult.setTestCaseId(testCaseRequest.getId().intValue());
                    testCaseResult.setUserId(testCaseRequest.getAuthorId().intValue());
                    testCaseResult.setStatus(ResultStatus.IN_PROGRESS);
                    testCaseResult.setStatusId(3);
                    testCaseResult.setStartDate(OffsetDateTime.now());
                    testCaseResult.setInnerResults(actionResult);
                    return resultRepository.saveTestCaseResult(testCaseResult).getId();
                })
                .collect(Collectors.toList());*/
        // TODO: delete log
        log.warn(testCaseRequests.toString());
        return null;
    }

    // TODO: uncomment
    /*
    private Optional<OuterComponent> connectDataSetWithTestScenario(Integer scenarioId, Long dataSetId, Map<String, String> initMap) {
        try {
            OuterComponent testScenario = testScenarioService.getTestScenarioById(scenarioId);
            DataSet dataSet = dataSetRepository.findDataSetById(dataSetId).get();
            List<Step> stepsParams = testScenario.getSteps();
            for (Step s : stepsParams
            ) {
                for (Map.Entry<String, String> entry : s.getParameters().entrySet()) {
                    if (dataSet.getDataset().containsKey(entry.getValue()) && !initMap.containsKey(entry.getValue())) {
                        entry.setValue(dataSetRepository.findValueByKeyAndId(dataSetId, entry.getValue()).get());
                    }
                }
            }
            return Optional.of(testScenario);
        } catch (TestScenarioNotFoundException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }
    */
}
