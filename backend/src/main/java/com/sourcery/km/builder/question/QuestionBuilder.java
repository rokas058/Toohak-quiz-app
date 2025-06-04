package com.sourcery.km.builder.question;

import com.sourcery.km.builder.questionOption.QuestionOptionBuilder;
import com.sourcery.km.dto.question.CreateQuestionDTO;
import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.dto.questionOption.QuestionOptionDTO;
import com.sourcery.km.entity.Question;
import com.sourcery.km.entity.QuestionOption;
import com.sourcery.km.service.MapperService;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class QuestionBuilder {

    @Autowired
    ModelMapper modelMapper;

    @PostConstruct
    private void postConstruct() {
        configureMappings();
    }

    private void configureMappings() {
        PropertyMap<CreateQuestionDTO, Question> createQuestionMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        };

        modelMapper.addMappings(createQuestionMap);

        PropertyMap<Question, QuestionDTO> questionImageMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map(source.getImage(), destination.getImageId());
            }
        };

        modelMapper.addMappings(questionImageMap);
    }
}
