package ua.project.protester.action;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import ua.project.protester.annotation.Action;
import ua.project.protester.model.executable.ExecutableComponentType;
import ua.project.protester.model.executable.AbstractAction;
import ua.project.protester.model.executable.result.ActionResult;

import java.util.Map;

@Action(
        type = ExecutableComponentType.TECHNICAL,
        description = "Input specified text into field with specified xpath",
        parameterNames = {"text", "xpath"}
)
public class InputTextIntoFieldWithXPathAction extends AbstractAction {
    @Override
    protected void logic(Map<String, String> params, Map<String, String> context, WebDriver driver, ActionResult result) {
        try {
            driver.findElement(By.xpath(params.get("xpath"))).sendKeys(params.get("text"));
        } catch (WebDriverException ex) {
            System.out.println(ex.getClass().getName());
        }
    }
}
