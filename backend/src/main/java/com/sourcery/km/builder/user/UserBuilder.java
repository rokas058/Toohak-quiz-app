package com.sourcery.km.builder.user;

import com.sourcery.km.dto.UserInfoDTO;
import com.sourcery.km.entity.User;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserBuilder {

    @Autowired
    ModelMapper modelMapper;

    @PostConstruct
    private void postConstruct() {
        configureUserMappings();
        configureUserInfoDTOMappings();
    }

    private void configureUserInfoDTOMappings() {
        PropertyMap<UserInfoDTO, User> createQuestionMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setAuth0Id(source.getSub());
                map().setUsername(source.getName());
                skip(destination.getId());
            }
        };
        modelMapper.addMappings(createQuestionMap);
    }

    private void configureUserMappings() {
        PropertyMap<User, UserInfoDTO> createQuestionMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setSub(source.getAuth0Id());
                map().setName(source.getUsername());
            }
        };
        modelMapper.addMappings(createQuestionMap);
    }
}
