package ua.project.protester.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.project.protester.exception.MailSendException;
import ua.project.protester.model.User;
import ua.project.protester.repository.UserRepository;
import ua.project.protester.request.UserCreationRequestDto;
import ua.project.protester.request.UserModificationDto;
import ua.project.protester.response.UserResponse;
import ua.project.protester.utils.UserMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public int createUser(UserCreationRequestDto userRequest) throws MailSendException {
        User user = userMapper.toUserFromUserRequest(userRequest);
        user.setRole(roleService.findRoleByName(user.getRole().getName()));
        user.setActive(true);
        mailService.sendRegistrationCredentials(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    public void updateUser(UserModificationDto userDto) {
        User user = userMapper.toUserFromUserModificationDto(userDto);
        user.setRole(roleService.findRoleByName(user.getRole().getName()));
        user.getRole().getUsers().add(user);
        userRepository.update(user);
    }

    @Transactional
    public void deleteUser(User user) {
       user.getRole().getUsers().remove(user);
       userRepository.delete(user);
    }

    @Transactional
    public User findUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            Long roleId = user.getRole().getId();
            user.setRole(roleService.findRoleById(roleId));
            return user;
        }
        return null;
    }

    @Transactional
    public User findUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email).orElse(null);
        if (user != null) {
            Long roleId = user.getRole().getId();
            user.setRole(roleService.findRoleById(roleId));
            return user;
        }
        return null;
    }

    @Transactional
    public User findUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username).orElse(null);
        if (user != null) {
            Long roleId = user.getRole().getId();
            user.setRole(roleService.findRoleById(roleId));
            return user;
        }
        return null;
    }

    @Transactional
    public User findUserByFullname(String fullName) {
        User user = userRepository.findUserByFullName(fullName).orElse(null);
        if (user != null) {
            Long roleId = user.getRole().getId();
            user.setRole(roleService.findRoleById(roleId));
            return user;
        }
        return null;
    }


    @Transactional
    public List<User> findAll() {
        List<User>users = userRepository.findAll();
        users.forEach(user -> user.setRole(roleService.findRoleById(user.getRole().getId())));
        return users;
    }

    public UserResponse getUser(Long id) {
        return  userMapper.toUserRest(findUserById(id));
    }

    public List<UserResponse> getAllUsers() {
        return findAll().stream().map(userMapper::toUserRest).collect(Collectors.toList());
    }

    public UserResponse findUserByName(String username) {
        return userMapper.toUserRest(findUserByUsername(username));
    }

    public UserResponse findUserByFullName(String fullName) {
        return userMapper.toUserRest(findUserByFullname(fullName));
    }

}
