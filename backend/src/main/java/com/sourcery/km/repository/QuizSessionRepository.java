package com.sourcery.km.repository;

import com.sourcery.km.dto.quizSession.QuizSessionWithOwner;
import com.sourcery.km.entity.QuizSession;
import com.sourcery.km.entity.QuizStatus;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Mapper
@Repository
public interface QuizSessionRepository {

    @Insert("""
            INSERT INTO quiz_sessions (id, status, join_id, created_at, quiz_id, is_shuffled) VALUES
            (#{id}, CAST(#{status} AS quiz_status), #{joinId}, #{createdAt}, #{quizId}, #{isShuffled})
            """)
    void insertNewSession(QuizSession session);

    @Select("""
            SELECT qs.*, u.auth0_id FROM quiz_sessions qs
            JOIN quizzes ON qs.quiz_id = quizzes.id
            JOIN app_users u ON quizzes.created_by = u.id
            WHERE join_id = #{joinId}
            """)
    QuizSessionWithOwner findSessionByJoinId(String joinId);

    @Select("""
            SELECT * FROM quiz_sessions
            WHERE id = #{sessionId}
            """)
    Optional<QuizSession> findSessionById(UUID sessionId);

    @Update("""
        UPDATE quiz_sessions
        SET status = CAST(#{status} AS quiz_status)
        WHERE id = #{sessionId}
        """)
    void updateSessionStatus(@Param("sessionId") UUID sessionId, @Param("status") QuizStatus status);

    @Select("""
            SELECT EXISTS (
                SELECT 1 FROM quiz_sessions
                WHERE quiz_id = #{quizId}
                  AND status = 'ACTIVE'
            )
            """)
    boolean existsActiveSessionForQuiz(@Param("quizId") UUID quizId);

}
