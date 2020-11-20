package ua.project.protester.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.project.protester.annotation.UniqueUsername;
import ua.project.protester.model.Role;
import ua.project.protester.model.UserDto;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserCreationRequestDto extends UserDto {


    @NotNull(message = "provide username")
    @UniqueUsername(message = "username already exists")
    private String name;


    @NotNull (message = "provide a role")
    private Role role;

    private String fullName;

    @NotNull(message = "provide a status")
    private boolean isActive;
}
