package ua.project.protester.model.executable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.openqa.selenium.WebDriver;
import ua.project.protester.model.executable.result.AbstractActionResult;

import java.util.*;
import java.util.function.Consumer;

@Setter
@Getter
@ToString
public class OuterComponent extends ExecutableComponent {

    protected List<Step> steps;

    protected static boolean isParameterPlaceholder(String parameter) {
        return parameter.startsWith("${") && parameter.endsWith("}");
    }

    protected static String extractParameterValue(String parameter) {
        return isParameterPlaceholder(parameter)
                ?
                parameter.substring(2, parameter.length() - 1)
                :
                parameter;
    }

    protected Map<String, String> fitInputParameters(Map<String, String> inputParameters, Map<String, String> mapping) {
        Map<String, String> result = new HashMap<>();
        mapping.forEach((key, value) -> {
            if (isParameterPlaceholder(value)) {
                result.put(key, inputParameters.get(extractParameterValue(value)));
            } else {
                result.put(key, value);
            }
        });
        return result;
    }

    public String[] getParameterNames() {
        if (parameterNames != null) {
            return parameterNames;
        }

        parameterNames = steps
                .stream()
                .map(Step::getParameters)
                .flatMap(map -> map.values().stream())
                .filter(OuterComponent::isParameterPlaceholder)
                .distinct()
                .map(OuterComponent::extractParameterValue)
                .toArray(String[]::new);
        return parameterNames;
    }

    @Override
    public void execute(Map<String, String> params, WebDriver driver, Consumer<AbstractActionResult> callback) {
        for (Step comp: steps
             ) {
            System.out.println("PARAMETERS" + comp.getParameters());
            System.out.println("NAME " + comp.getId());
            System.out.println("IS ACTION " + comp.getParameters());
            System.out.println("\n");
        }
        steps.forEach(step -> step.getComponent().execute(
                fitInputParameters(params, step.getParameters()),
                driver,
                callback));
    }

    public List<AbstractActionResult> executeForResult(Map<String, String> params, WebDriver driver, Consumer<AbstractActionResult> callback) {
        final List<AbstractActionResult> results = new LinkedList<>();
        execute(
                params,
                driver,
                callback.andThen(results::add));
        return results;
    }
}
