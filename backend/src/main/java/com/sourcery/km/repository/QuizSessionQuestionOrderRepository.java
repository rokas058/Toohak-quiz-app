package com.sourcery.km.repository;

import com.sourcery.km.entity.QuizSessionQuestionOrder;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Mapper
@Repository
public interface QuizSessionQuestionOrderRepository {
    @Insert("""
            INSERT INTO quiz_session_question_order (session_id, question_id, question_order, is_completed)
            VALUES (#{sessionId}, #{questionId}, #{questionOrder}, #{isCompleted})
            """)
    void insert(QuizSessionQuestionOrder order);

    @Insert({
        "<script>",
        "INSERT INTO quiz_session_question_order (session_id, question_id, question_order, is_completed) VALUES ",
        "<foreach collection='orders' item='order' separator=','>",
        "(#{order.sessionId}, #{order.questionId}, #{order.questionOrder}, #{order.isCompleted})",
        "</foreach>",
        "</script>"
    })
    void batchInsert(@Param("orders") List<QuizSessionQuestionOrder> orders);

    @Update("""
            UPDATE quiz_session_question_order
            SET is_completed = TRUE
            WHERE session_id = #{sessionId} AND question_id = #{questionId}
            """)
    void markQuestionCompleted(@Param("sessionId") UUID sessionId, @Param("questionId") UUID questionId);

    @Select("""
            SELECT * FROM quiz_session_question_order
            WHERE session_id = #{sessionId}
            ORDER BY question_order
            """)
    List<QuizSessionQuestionOrder> findAllBySessionId(UUID sessionId);

    @Select("""
            SELECT * FROM quiz_session_question_order
            WHERE session_id = #{sessionId} AND is_completed = FALSE
            ORDER BY question_order
            LIMIT 1
            """)
    QuizSessionQuestionOrder findNextQuestion(UUID sessionId);

    @Select("""
            SELECT EXISTS (
                SELECT 1 FROM quiz_session_question_order qsqo
                WHERE qsqo.session_id = #{sessionId}
                AND qsqo.question_id = #{questionId}
                AND qsqo.is_completed = true
            )
            """)
    boolean findIsQuestionComplete(UUID sessionId, UUID questionId);
}
