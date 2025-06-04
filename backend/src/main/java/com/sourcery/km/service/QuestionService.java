package com.sourcery.km.service;

import com.sourcery.km.builder.file.FileBuilder;
import com.sourcery.km.dto.question.CreateQuestionDTO;
import com.sourcery.km.dto.question.QuestionDTO;
import com.sourcery.km.entity.File;
import com.sourcery.km.entity.Question;
import com.sourcery.km.entity.QuestionOption;
import com.sourcery.km.entity.Quiz;
import com.sourcery.km.exception.EntityNotFoundException;
import com.sourcery.km.exception.ForbiddenException;
import com.sourcery.km.repository.FileRepository;
import com.sourcery.km.repository.QuestionOptionRepository;
import com.sourcery.km.repository.QuestionRepository;
import com.sourcery.km.service.helper.QuestionHelper;
import com.sourcery.km.service.helper.QuestionOptionHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuizService quizService;

    private final QuestionRepository questionRepository;

    private final QuestionOptionRepository questionOptionRepository;

    private final QuestionOptionHelper questionOptionHelper;

    private final QuestionHelper questionHelper;

    private final MapperService mapperService;

    private final FileRepository fileRepository;

    private final FileService fileService;


    @Transactional
    public QuestionDTO insertQuestion(CreateQuestionDTO questionDTO, UUID quizId) {
        Quiz quiz = quizService.getQuiz(quizId);
        quizService.isQuizCreator(quiz);

        Question question = mapperService.map(questionDTO, Question.class);

        quiz.setQuestions(List.of(question));
        questionRepository.insertQuestion(question);
        questionHelper.setQuestionImage(question);
        questionOptionHelper.insertQuestionOptions(quiz);
        return getQuestionById(question.getId());
    }

    // this has to be able to update the title and the questions
    @Transactional
    public QuestionDTO updateExistingQuestion(UUID quizId, UUID questionId, QuestionDTO questionDto) {
        Quiz quiz = quizService.getQuiz(quizId);
        quizService.isQuizCreator(quiz);

        Question question = mapperService.map(questionDto, Question.class);
        question.setId(questionId);

        List<QuestionOption> questionOptions = question.getQuestionOptions();

        questionRepository.updateExistingQuestion(question);

        if (!questionOptions.isEmpty()) {
            List<QuestionOption> correctOptions = questionOptions.stream()
                    .filter(QuestionOption::getIsCorrect)
                    .toList();

            if (!correctOptions.isEmpty()) {
                questionOptionRepository.updateAllToIncorrect(questionId);
            }
            questionOptions.forEach(questionOptionRepository::updateQuestionOption);
        }
        return getQuestionById(questionId);
    }

    @Transactional
    public void deleteQuestion(UUID questionId) {
        Question question = getQuestion(questionId);
        UUID quizId = question.getQuizId();
        Quiz quiz = quizService.getQuiz(quizId);
        quizService.isQuizCreator(quiz);


        questionOptionHelper.deleteQuestionsOptionsByQuestionId(questionId);
        questionRepository.deleteQuestion(questionId);
        fileService.delete(question.getImage());
    }

    public Question getQuestion(UUID questionId) {

        return questionRepository.getQuestion(questionId)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Question with id: %s does not exist", questionId)));
    }

    public QuestionDTO getQuestionById(UUID questionId) {
        Question question = getQuestion(questionId);

        return mapperService.map(question, QuestionDTO.class);
    }

    public List<QuestionDTO> getQuestionsByQuizId(UUID quizId) {
        List<Question> questions = questionRepository.getQuestionsByQuizId(quizId);
        return mapperService.mapList(questions, QuestionDTO.class);
    }

    public QuestionOption getCorrectQuestionOption(UUID questionId) {
        List<QuestionOption> questionOptions = questionRepository.getQuestionOptionsByQuestionId(questionId);

        return questionOptions.stream()
                .filter(QuestionOption::getIsCorrect)
                .findFirst()
                .orElseThrow(() ->
                        new ForbiddenException("Question " + questionId + " does not have a correct answer")
                );
    }
}
