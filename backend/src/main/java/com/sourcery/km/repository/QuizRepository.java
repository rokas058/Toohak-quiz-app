package com.sourcery.km.repository;

import com.sourcery.km.dto.quiz.QuizCardDTO;
import com.sourcery.km.dto.quiz.QuizFlatRow;
import com.sourcery.km.entity.Question;
import com.sourcery.km.entity.Quiz;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Repository
public interface QuizRepository {
    @Insert("INSERT INTO quizzes(id, created_by, title, description, cover_image_id)" +
            " VALUES(#{id}, #{createdBy}, #{title}, #{description}, #{coverImageId})")
    void insertQuiz(Quiz quiz);

    @Select("""
            SELECT q.id AS quizId, q.title AS quizTitle,
            q.description AS quizDescription,
            q.created_by AS quizCreatedBy,
            q.cover_image_id AS quizImageId,
            q.created_at AS quizCreatedAt,
            q.updated_at AS quizUpdatedAt,
            qu.id AS questionId, qu.title AS questionTitle,
            qu.image AS questionImageId,
            o.id AS optionId, o.title AS optionTitle,
            o.ordering AS optionOrdering,
            o.is_correct AS optionIsCorrect
            FROM quizzes q
            LEFT JOIN questions qu
            ON qu.quiz_id = q.id
            LEFT JOIN question_options o
            ON o.question_id = qu.id
            WHERE q.id = #{id}
            """)
    List<QuizFlatRow> findQuizById(UUID id);

    @Select("SELECT * FROM quizzes WHERE id = #{id}")
    @Results(value = {
        @Result(property = "id", column = "id"),
        @Result(property = "questions", javaType = List.class,
                column = "id", many = @Many(select = "getQuestionsByQuizId"))})
    Optional<Quiz> findById(@Param("id") UUID id);

    //Shown like "no usages", but it's used in findById method.
    @Select("SELECT * FROM questions WHERE quiz_id = #{id}")
    List<Question> getQuestionsByQuizId(UUID id);

    @Update("""
            UPDATE quizzes SET title = #{title}, description = #{description}, 
            cover_image_id=#{coverImageId}, updated_at = NOW() 
            WHERE id = #{id}
            """)
    void update(Quiz quiz);

    @Select("""
            SELECT 
                q.id, 
                q.created_by, 
                q.title, 
                q.description, 
                q.cover_image_id,
                q.created_at, 
                q.updated_at, 
                COUNT(ques.id) AS question_amount
            FROM quizzes q
            LEFT JOIN questions ques ON ques.quiz_id = q.id
            WHERE q.created_by = #{userId}
            GROUP BY 
                q.id, q.created_by, q.title, q.description, q.cover_image_id, q.created_at, q.updated_at
            ORDER BY q.created_at DESC
            """)
    List<QuizCardDTO> getQuizCardsByUserId(@Param("userId") UUID userId);

    @Delete("DELETE from quizzes where id = #{id}")
    void deleteQuiz(@Param("id") UUID id);
}
