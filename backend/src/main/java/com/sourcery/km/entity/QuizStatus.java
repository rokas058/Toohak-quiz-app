package com.sourcery.km.entity;

/**
 * When updating this enum do not forget to add the respective enum to the database
 */
public enum QuizStatus {
    PENDING, // Waiting for players to join
    ACTIVE, // QuizSession is in progress
    INACTIVE // The QuizSession has ended
}
