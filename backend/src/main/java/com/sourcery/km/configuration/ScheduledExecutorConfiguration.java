package com.sourcery.km.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

@Configuration
public class ScheduledExecutorConfiguration {

    private static final int SCHEDULER_EXECUTOR_CORE_POOL_SIZE = 5;

    @Bean(destroyMethod = "shutdown")
    ScheduledExecutorService scheduledExecutorService() {
        return Executors.newScheduledThreadPool(SCHEDULER_EXECUTOR_CORE_POOL_SIZE);
    }
}
