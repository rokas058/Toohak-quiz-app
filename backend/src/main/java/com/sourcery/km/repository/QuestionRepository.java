package com.sourcery.km.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;


import com.sourcery.km.entity.Question;
import com.sourcery.km.entity.QuestionOption;

import jakarta.validation.Valid;


@Mapper
@Repository
public interface QuestionRepository {

    @Insert({
        "<script>",
        "INSERT INTO questions (id, quiz_id, image, title) VALUES ",
        "<foreach collection='questions' item='question' separator=','>",
        "(#{question.id}, #{question.quizId}, #{question.image}, #{question.title})",
        "</foreach>",
        "</script>"
    })
    void insertQuestions(@Param("questions") List<Question> questions);

    @Insert("""
    INSERT INTO questions (id, quiz_id, image, title)
    VALUES (#{id}, #{quizId}, #{image}, #{title})
        """)
    void insertQuestion(Question question);

    @Select("SELECT * FROM questions WHERE id = #{questionId}")
    @Results(value = {
        @Result(property = "id", column = "id"),
        @Result(property = "questionOptions", javaType = List.class,
                column = "id", many = @Many(select = "getQuestionOptionsByQuestionId"))})
    Optional<Question> getQuestion(UUID questionId);

    @Select("SELECT * FROM questions WHERE quiz_id = #{quizId}")
    @Results(value = {
        @Result(property = "id", column = "id"),
        @Result(property = "questionOptions", javaType = List.class,
            column = "id", many = @Many(select = "getQuestionOptionsByQuestionId"))})
    List<Question> getQuestionsByQuizId (UUID quizId);

    //Shown like "no usages", but it's used in getQuestionsByQuizId method.
    @Select("SELECT * FROM question_options WHERE question_id = #{questionId}")
    List<QuestionOption> getQuestionOptionsByQuestionId (UUID questionId);

    @Delete("DELETE FROM questions WHERE id = #{questionId}")
    void deleteQuestion(UUID questionId);


    @Delete("DELETE FROM questions WHERE quiz_id = #{quizId}")
    void deleteQuestionsByQuizId(UUID quizId);

    @Update("""
        UPDATE questions
        SET title = #{question.title}
        WHERE id = #{question.id}
        """)
    void updateExistingQuestion(@Valid @Param("question") Question question);
}
