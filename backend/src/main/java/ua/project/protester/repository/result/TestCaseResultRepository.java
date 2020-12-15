package ua.project.protester.repository.result;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import ua.project.protester.exception.result.TestCaseResultNotFoundException;
import ua.project.protester.model.executable.result.ResultStatus;
import ua.project.protester.model.executable.result.TestCaseResult;
import ua.project.protester.model.executable.result.TestCaseResultDto;
import ua.project.protester.repository.StatusRepository;
import ua.project.protester.repository.UserRepository;
import ua.project.protester.repository.testCase.TestCaseRepository;
import ua.project.protester.request.TestCaseResultFilter;
import ua.project.protester.utils.PropertyExtractor;

import java.time.OffsetDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@PropertySource("classpath:queries/test-case-result.properties")
@Repository
@RequiredArgsConstructor
@Slf4j
public class TestCaseResultRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final Environment env;
    private final ActionResultRepository actionResultRepository;
    private final TestCaseRepository testCaseRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;

    public TestCaseResultDto save(TestCaseResultDto result) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(
                PropertyExtractor.extract(env, "saveTestCaseResult"),
                new BeanPropertySqlParameterSource(getModelFromDto(result)),
                keyHolder,
                new String[]{"test_case_result_id"});
        result.setId((Integer) keyHolder.getKey());
        return result;
    }

    public int updateStatusAndEndDate(Integer id, ResultStatus status, OffsetDateTime endDate) {
        return namedParameterJdbcTemplate.update(
                PropertyExtractor.extract(env, "updateTestCaseResultStatusAndEndDate"),
                new MapSqlParameterSource()
                        .addValue("id", id)
                        .addValue("statusId", statusRepository.getIdByLabel(status))
                        .addValue("endDate", endDate));
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public TestCaseResultDto findById(Integer id) throws TestCaseResultNotFoundException {
        try {
            TestCaseResult result = namedParameterJdbcTemplate.queryForObject(
                    PropertyExtractor.extract(env, "findTestCaseResultById"),
                    new MapSqlParameterSource()
                            .addValue("id", id),
                    new BeanPropertyRowMapper<>(TestCaseResult.class));
            if (result == null) {
                throw new TestCaseResultNotFoundException(id);
            }
            return getDtoFromModel(result, true);
        } catch (DataAccessException e) {
            log.warn(e.getMessage(), e);
            throw new TestCaseResultNotFoundException(id, e);
        }
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public List<TestCaseResultDto> findAll(TestCaseResultFilter filter, boolean loadActionResults) {
        return namedParameterJdbcTemplate.query(
                setupSqlQuery(filter, "findAllTestCaseResults"),
                new MapSqlParameterSource()
                        .addValue("pageSize", filter.getPageSize())
                        .addValue("offset", filter.getOffset())
                        .addValue("userId", filter.getUserId())
                        .addValue("testCaseId", filter.getTestCaseId())
                        .addValue("statusId", statusRepository.getIdByStringRepresentation(filter.getStatus()))
                        .addValue("dateTimeFrom", filter.getDateTimeFrom())
                        .addValue("dateTimeTo", filter.getDateTimeTo()),
                new BeanPropertyRowMapper<>(TestCaseResult.class))
                .stream()
                .map(testCaseResult -> getDtoFromModel(testCaseResult, loadActionResults))
                .collect(Collectors.toList());
    }

    public Long countAll(TestCaseResultFilter filter) {
        return namedParameterJdbcTemplate.queryForObject(
                setupSqlQuery(filter, "countAllTestCaseResults"),
                new MapSqlParameterSource()
                        .addValue("userId", filter.getUserId())
                        .addValue("testCaseId", filter.getTestCaseId())
                        .addValue("statusId", filter.getStatus() != null
                                ? statusRepository.getIdByStringRepresentation(filter.getStatus())
                                : null)
                        .addValue("dateTimeFrom", filter.getDateTimeFrom())
                        .addValue("dateTimeTo", filter.getDateTimeTo()),
                Long.class);
    }

    private TestCaseResult getModelFromDto(TestCaseResultDto dto) {
        return new TestCaseResult(
                null,
                dto.getUser() != null ? dto.getUser().getId() : null,
                dto.getTestCase() != null ? dto.getTestCase().getId() : null,
                statusRepository.getIdByLabel(dto.getStatus()),
                dto.getStartDate(),
                dto.getEndDate());
    }

    private TestCaseResultDto getDtoFromModel(TestCaseResult result, boolean loadActionResults) {
        return new TestCaseResultDto(
                result.getId(),
                userRepository.findById(result.getUserId()).orElse(null),
                testCaseRepository.findById(result.getTestCaseId()).orElse(null),
                statusRepository.getLabelById(result.getStatusId()),
                result.getStartDate(),
                result.getEndDate(),
                loadActionResults
                        ? actionResultRepository.findByTestCaseResultId(result.getId())
                        : null);
    }

    private String setupSqlQuery(TestCaseResultFilter filter, String propertyName) {
        List<String> sqlFilterParts = getFilterParts(
                new Object[]{
                        filter.getUserId(),
                        filter.getTestCaseId(),
                        filter.getStatus(),
                        filter.getDateTimeFrom(),
                        filter.getDateTimeTo()},
                new String[]{
                        "sqlUserFilter",
                        "sqlTestCaseFilter",
                        "sqlStatusFilter",
                        "sqlDateFromFilter",
                        "sqlDateToFilter"});

        String filterCondition = String.join("AND", sqlFilterParts);

        return String.format(
                PropertyExtractor.extract(env, propertyName),
                filterCondition.isEmpty() ? "" : "WHERE " + filterCondition);
    }

    private List<String> getFilterParts(Object[] values, String[] propertyNames) {
        List<String> sqlFilterParts = new LinkedList<>();
        for (int i = 0; i < values.length; i++) {
            if (values[i] != null) {
                sqlFilterParts.add(PropertyExtractor.extract(env, propertyNames[i]));
            }
        }
        return sqlFilterParts;
    }
}
