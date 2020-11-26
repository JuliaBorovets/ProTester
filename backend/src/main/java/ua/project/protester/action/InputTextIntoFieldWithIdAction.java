package ua.project.protester.action;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import ua.project.protester.annotation.Action;
import ua.project.protester.model.ActionType;
import ua.project.protester.model.BaseAction;

import java.util.Map;

@Action(
        type = ActionType.TECHNICAL,
        defaultDescription = "Input specified text into field with specified id",
        parameterNames = {"text", "id"}
)
public class InputTextIntoFieldWithIdAction extends BaseAction {
    @Override
    public void invoke(Map<String, String> params, WebDriver driver) {
        driver.findElement(By.id(params.get("id"))).sendKeys(params.get("text"));
    }
}
