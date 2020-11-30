package ua.project.protester.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateCompoundRequest {

    private String name;
    private String description;
    private List<StepRepresentation> steps;
}
