package com.sourcery.km.repository;

import com.sourcery.km.entity.PlayerAnswer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Mapper
@Repository
public interface PlayerAnswerRepository {
    @Insert("""
            INSERT INTO player_answers (id, quiz_player_id, question_id, question_option_id, answered_at) VALUES
            (#{id}, #{quizPlayerId}, #{questionId}, #{questionOptionId}, #{answeredAt})
            """)
    void insertPlayerAnswer(PlayerAnswer playerAnswer);

    @Select("""
    SELECT EXISTS (
        SELECT 1
        FROM player_answers
        WHERE quiz_player_id = #{playerId}
        AND question_id = #{questionId}
    )
        """)
    boolean existsByPlayerIdAndQuestionId(UUID playerId, UUID questionId);
}
