package com.sourcery.km.builder.quiz_player;

import com.sourcery.km.dto.quizPlayer.QuizPlayerDTO;
import com.sourcery.km.dto.quizPlayer.QuizPlayerWsDTO;
import com.sourcery.km.dto.quizSession.JoinSessionRequestDTO;
import com.sourcery.km.entity.QuizPlayer;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuizPlayerBuilder {

    private static final int INITIAL_SCORE = 0;

    @Autowired
    ModelMapper modelMapper;

    public static QuizPlayer createQuizPlayer(JoinSessionRequestDTO joinSessionRequestDTO) {
        return QuizPlayer.builder()
                .quizSessionId(joinSessionRequestDTO.getQuizSessionId())
                .nickname(joinSessionRequestDTO.getNickname())
                .score(INITIAL_SCORE)
                .joinedAt(Instant.now())
                .build();
    }

    @PostConstruct
    private void postConstruct() {
        configureDtoToEntity();
        configureEntityToDto();
        configureEntityToDtoWs();
    }

    private void configureDtoToEntity() {
        PropertyMap<QuizPlayerDTO, QuizPlayer> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        };
        modelMapper.addMappings(createMap);
    }

    private void configureEntityToDto() {
        PropertyMap<QuizPlayer, QuizPlayerDTO> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {

            }
        };
        modelMapper.addMappings(createMap);
    }

    private void configureEntityToDtoWs() {
        PropertyMap<QuizPlayer, QuizPlayerWsDTO> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {

            }
        };
        modelMapper.addMappings(createMap);
    }
}
