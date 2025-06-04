package com.sourcery.km.controller;

import com.sourcery.km.dto.UserInfoDTO;
import com.sourcery.km.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserInfoDTO getUser() {
        return userService.getUserInfo();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser() {
        boolean isCreated = userService.insertUser();
        return isCreated
                ? ResponseEntity.status(HttpStatus.CREATED).build()
                : ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
