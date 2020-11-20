package ua.project.protester.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import ua.project.protester.constants.SqlTemplates;
import ua.project.protester.model.PasswordResetToken;

import java.util.Date;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PasswordResetTokenRepository {

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public void save(PasswordResetToken token) {
        namedParameterJdbcTemplate.update(SqlTemplates.SAVE_TOKEN, new BeanPropertySqlParameterSource(token));
    }

    public Optional<Date> findExpiryDateByValue(String tokenValue) {
        try {
            Date expiryDate = namedParameterJdbcTemplate.queryForObject(
                    SqlTemplates.FIND_TOKEN_EXPIRY_DATE_BY_TOKEN_VALUE,
                    new MapSqlParameterSource().addValue("value", tokenValue),
                    Date.class);
            return Optional.ofNullable(expiryDate);
        } catch (DataAccessException e) {
            return Optional.empty();
        }
    }
}
