package com.sourcery.km.repository;

import com.sourcery.km.entity.QuizSessionProgress;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Mapper
@Repository
public interface QuizSessionProgressRepository {
    @Insert("""
            INSERT INTO quiz_session_progress (session_id, current_question_id,
                                   current_question_started_at, duration_seconds)
            VALUES (#{sessionId}, #{currentQuestionId}, #{currentQuestionStartedAt}, #{durationSeconds})
            """)
    void insert(QuizSessionProgress progress);

    @Update("""
            UPDATE quiz_session_progress
            SET current_question_id = #{currentQuestionId},
                current_question_started_at = #{currentQuestionStartedAt},
                duration_seconds = #{durationSeconds}
            WHERE session_id = #{sessionId}
            """)
    void update(QuizSessionProgress progress);

    @Select("""
            SELECT * FROM quiz_session_progress
            WHERE session_id = #{sessionId}
            """)
    QuizSessionProgress findBySessionId(UUID sessionId);
}
