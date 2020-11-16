package ua.project.protester.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.OpAnd;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import ua.project.protester.db.MockDB;
import ua.project.protester.model.User;

import java.util.Optional;

@Repository
public class UserRepository {
    private MockDB mockDB;

    @Autowired
    public UserRepository(MockDB mockDB) {
        this.mockDB = mockDB;
    }

    public Optional<User> findUserByEmail(String email){
        return Optional.ofNullable(mockDB.findUserByEmail(email));
    }

    public Optional<User> findUserById(Long id){
        return Optional.ofNullable(mockDB.findUserById(id));
    }

    public ResponseEntity<String>createUser(User user){
        return mockDB.addUser(user);
    }
}
