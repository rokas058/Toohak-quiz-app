package com.sourcery.km.builder.quiz_session;

import com.sourcery.km.dto.quizSession.QuizSessionDTO;
import com.sourcery.km.dto.quizSession.QuizSessionWithOwner;
import com.sourcery.km.entity.QuizSession;
import com.sourcery.km.entity.QuizStatus;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.UUID;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuizSessionBuilder {
    @Autowired
    ModelMapper modelMapper;

    public static QuizSession createQuizSession(UUID quizId, String joinId, boolean isShuffled) {
        return QuizSession.builder()
                .id(UUID.randomUUID())
                .status(QuizStatus.PENDING)
                .joinId(joinId)
                .quizId(quizId)
                .createdAt(Instant.now())
                .isShuffled(isShuffled)
                .build();
    }

    @PostConstruct
    private void postConstruct() {
        configureDtoToEntity();
        configureEntityToDto();
        configureEntityWithOwnerToDto();
    }

    private void configureDtoToEntity() {
        PropertyMap<QuizSessionDTO, QuizSession> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        };
        modelMapper.addMappings(createMap);
    }


    private void configureEntityToDto() {
        PropertyMap<QuizSession, QuizSessionDTO> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setQuizSessionId(source.getId());
                map().setQuizId(source.getQuizId());
            }
        };
        modelMapper.addMappings(createMap);
    }

    private void configureEntityWithOwnerToDto() {
        PropertyMap<QuizSessionWithOwner, QuizSessionDTO> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setQuizSessionId(source.getId());
                map().setCreatedBy(source.getAuth0Id());
            }
        };
        modelMapper.addMappings(createMap);
    }
}
