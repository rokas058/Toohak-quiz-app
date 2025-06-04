package com.sourcery.km.repository;

import com.sourcery.km.dto.quizPlayer.PlayerCountDTO;
import com.sourcery.km.dto.quizSession.JoinSessionRequestDTO;
import com.sourcery.km.entity.QuizPlayer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Repository
public interface QuizPlayerRepository {

    @Insert("""
            INSERT INTO quiz_players (id, quiz_session_id, nickname, score, joined_at) VALUES
            (#{id}, #{quizSessionId}, #{nickname}, #{score}, #{joinedAt})
            """)
    void insertNewPlayer(QuizPlayer player);

    @Select("""
            SELECT * FROM quiz_players
            WHERE id = #{id}
            """)
    Optional<QuizPlayer> getPlayerById(UUID id);

    @Select("""
            SELECT * FROM quiz_players
            WHERE quiz_session_id = #{quizSessionId}
            """)
    List<QuizPlayer> getSessionPlayers(UUID quizSessionId);

    @Select("""
            SELECT nickname FROM quiz_players
            WHERE quiz_session_id = #{quizSessionId}
            """)
    List<String> getSessionPlayerNicknames(UUID quizSessionId);


    @Update("""
            UPDATE quiz_players
            SET score = #{score}
            WHERE id = #{id}
            """)
    void updatePlayerScore(QuizPlayer player);

    @Select("""
            SELECT COUNT(*) FROM quiz_players
            WHERE quiz_session_id = #{quizSessionId}
            """)
    PlayerCountDTO getSessionPlayerCount(UUID quizSessionId);

    @Select("""
            SELECT COUNT(*) FROM quiz_players qp
            WHERE qp.quiz_session_id = #{quizSessionId}
            AND EXISTS (
            	SELECT 1
            	FROM player_answers pa
            	WHERE pa.quiz_player_id = qp.id AND EXISTS (
            		SELECT 1 FROM quiz_session_progress qsp
            		WHERE pa.question_id = qsp.current_question_id
            		AND qsp.session_id = #{quizSessionId}
            	)
            )
            """)
    PlayerCountDTO getSessionPlayerAnsweredCount(UUID quizSessionId);

    @Select("""
    SELECT COUNT(*) > 0
    FROM quiz_players
    WHERE quiz_session_id = #{quizSessionId}
    AND nickname = #{nickname}
        """)
    boolean existsByQuizSessionIdAndNickname(JoinSessionRequestDTO request);
}
