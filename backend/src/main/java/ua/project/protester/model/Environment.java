package ua.project.protester.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;

@Data
@NoArgsConstructor
public class Environment {
    private Long id;

    private String name;

    private String description;

    private String username;

    private String password;

    private String url;


    public Environment(Long id, String name, String description, String username, String password, String url) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.username = username;
        this.password = password;
        this.url = url;
    }

    public NamedParameterJdbcTemplate getTemplate(Environment environment) {
        DataSource dataSource = DataSourceBuilder
                .create()
                .url(environment.getUrl())
                .username(environment.getUsername())
                .password(environment.getPassword())
                .build();
        return new NamedParameterJdbcTemplate(dataSource);
    }
}
