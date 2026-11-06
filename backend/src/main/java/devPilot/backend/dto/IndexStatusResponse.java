package devPilot.backend.dto;

import java.time.Instant;
import java.util.UUID;

import devPilot.backend.entity.IndexStatus;

public record IndexStatusResponse(
    UUID repositoryId,
    IndexStatus indexStatus,
    Instant indexedAt,
    int chunkCount,
    int filesTotal,
    Integer filesProcessed,
    String errorMessage
) {
    
} 
