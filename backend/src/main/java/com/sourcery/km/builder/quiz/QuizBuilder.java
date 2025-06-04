package com.sourcery.km.builder.quiz;

import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.dto.questionOption.CreateQuestionOptionDTO;
import com.sourcery.km.dto.quiz.CreateQuizDTO;
import com.sourcery.km.dto.quiz.QuizDTO;
import com.sourcery.km.entity.Question;
import com.sourcery.km.entity.QuestionOption;
import com.sourcery.km.entity.Quiz;
import com.sourcery.km.service.MapperService;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class QuizBuilder {

    @Autowired
    private ModelMapper modelMapper;

    @PostConstruct
    private void postConstruct() {
        configureMappings();
    }

    private void configureMappings() {
        PropertyMap<CreateQuizDTO, Quiz> createQuestionMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        };
        modelMapper.addMappings(createQuestionMap);
    }
}
