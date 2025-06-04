package com.sourcery.km.configuration.properties;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "sourcery.azure.storage.blob")
public class AzureProperties {
    @NotBlank(message = "Blob Storage container name must be configured")
    private String containerName;

    @NotBlank(message = "Blob Storage connection string must be configured")
    private String connectionString;
}
