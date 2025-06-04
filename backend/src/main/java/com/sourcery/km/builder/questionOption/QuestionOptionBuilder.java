package com.sourcery.km.builder.questionOption;

import com.sourcery.km.dto.question.CreateQuestionDTO;
import com.sourcery.km.dto.questionOption.CreateQuestionOptionDTO;
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
public class QuestionOptionBuilder {

    @Autowired
    ModelMapper modelMapper;

    @PostConstruct
    private void postConstruct() {
        configureMappings();
    }

    private void configureMappings() {
        PropertyMap<CreateQuestionOptionDTO, QuestionOption> createQuestionMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        };
        modelMapper.addMappings(createQuestionMap);
    }
}
