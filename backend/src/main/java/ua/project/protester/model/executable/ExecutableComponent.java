package ua.project.protester.model.executable;

import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.WebDriver;

import java.util.Map;

@Setter
@Getter
public abstract class ExecutableComponent {
    protected Integer id;
    protected String name;
    protected String description;
    protected ExecutableComponentType type;
    protected String[] parameterNames;

    public abstract void execute(Map<String, String> params, WebDriver driver);
}
