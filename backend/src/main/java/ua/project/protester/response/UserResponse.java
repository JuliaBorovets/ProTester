package ua.project.protester.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.project.protester.model.UserDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResponse extends UserDto {

    private Long id;

    private String name;

    private String surname;

    private String role;

    private boolean isActive;

}
