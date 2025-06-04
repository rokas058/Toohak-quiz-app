package com.sourcery.km.repository;

import com.sourcery.km.entity.QuestionOption;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Repository
public interface QuestionOptionRepository {

    @Insert({
        "<script>",
        "INSERT INTO question_options (id, question_id, title, ordering, is_correct) VALUES ",
        "<foreach collection='questionsOptions' item='questionOption' separator=','>",
        "(#{questionOption.id}, #{questionOption.questionId}, #{questionOption.title},",
        " #{questionOption.ordering}, #{questionOption.isCorrect})",
        "</foreach>",
        "</script>"
    })
    void insertQuestionOptions(@Param("questionsOptions") List<QuestionOption> questionsOptions);

    @Delete("""
        DELETE FROM question_options
        WHERE question_id IN (
            SELECT id FROM questions WHERE quiz_id = #{quizId}
        )
        """)
    void deleteQuestionOptionsByQuizId(@Param("quizId") UUID quizId);

    @Delete("""
            DELETE FROM question_options
            WHERE question_id = #{questionId}
            """)
    void deleteQuestionOptionsByQuestionId(@Param("questionId") UUID questionId);

    @Update("""
        UPDATE question_options
        SET title = #{questionOption.title},
            ordering = #{questionOption.ordering},
            is_correct = #{questionOption.isCorrect}
        WHERE id = #{questionOption.id}
        """)
    void updateQuestionOption(@Param("questionOption") QuestionOption questionOption);

    @Select("""
            SELECT * FROM question_options
            WHERE id = #{id}
            """)
    Optional<QuestionOption> getQuestionOptionById(UUID id);

    @Update("""
            UPDATE question_options
            SET is_correct = false
            WHERE question_id = (
                SELECT id FROM questions WHERE id = #{questionId}
            )
            """)
    void updateAllToIncorrect(@Param("questionId") UUID questionId);
}
