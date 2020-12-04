package ua.project.protester.action;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import ua.project.protester.annotation.Action;
import ua.project.protester.model.executable.ExecutableComponentType;
import ua.project.protester.model.executable.AbstractAction;

import java.util.Map;

@Action(
        type = ExecutableComponentType.REST,
        description = "Performs get method on specified url",
        parameterNames = {"url"}
)
public class GoToUrlAction extends AbstractAction {
    @Override
    public void execute(Map<String, String> params, WebDriver driver) {

        try {
            driver.get(params.get("url"));
        } catch (WebDriverException ex) {
            System.out.println(ex.getClass().getName());
        }
    }
}