package com.sourcery.km.repository;

import com.sourcery.km.TestContainerConfig;
import com.sourcery.km.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserRepositoryTest extends TestContainerConfig {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testCreateUser() {
        User user = User.builder()
                .auth0Id("testID")
                .email("user@example.com")
                .username("testuser")
                .build();

        userRepository.insertUser(user);
        Optional<User> savedUser = userRepository.getUserById(user.getId());

        assertThat(savedUser).isPresent();
        assertThat(savedUser.get().getEmail()).isEqualTo("user@example.com");
        assertThat(savedUser.get().getUsername()).isEqualTo("testuser");
        assertThat(savedUser.get().getAuth0Id()).isEqualTo("testID");
    }
}
