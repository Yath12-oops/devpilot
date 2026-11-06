package devPilot.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import devPilot.backend.dto.IndexStatusResponse;
import devPilot.backend.dto.RepositoryResponse;
import devPilot.backend.entity.IndexStatus;
import devPilot.backend.entity.Repository;
import devPilot.backend.entity.User;
import devPilot.backend.exceptions.NotFoundException;
import devPilot.backend.repository.RepositoryRepository;
import devPilot.backend.services.github.GithubApiClient;

@Service
@RequiredArgsConstructor
public class RepoService {

    private final RepositoryRepository repositoryRepository;
    private final UserService userService;
    private final GithubApiClient githubApiClient;

    @Transactional
    public List<RepositoryResponse> syncAndListRepos(UUID userId) {
        User user = userService.requiredById(userId);
        String token = userService.decryptAccessToken(user);
        List<Map<String, Object>> remoteRepos = githubApiClient.listUserRepos(token);
        List<Repository> saved = new ArrayList<>();

        for (Map<String, Object> remote : remoteRepos) {
            Long githubRepoId = toLong(remote.get("id"));
            Repository repo = repositoryRepository.findByUserIdAndGithubRepoId(userId, githubRepoId)
                    .orElseGet(Repository::new);

            if (repo.getId() == null) {
                repo.setUserId(userId);
                repo.setGithubRepoId(githubRepoId);
                repo.setIndexStatus(IndexStatus.PENDING);
            }

            Object owner = remote.get("owner");
            repo.setOwner(owner instanceof Map<?, ?> map && map.get("login") != null
                    ? String.valueOf(map.get("login"))
                    : null);
            repo.setName(String.valueOf(remote.get("name")));
            repo.setFullName(String.valueOf(remote.get("full_name")));
            repo.setPrivate(Boolean.TRUE.equals(remote.get("private")));
            repo.setDefaultBranch(String.valueOf(remote.get("default_branch")));
            repo.setLanguage(remote.get("language") != null ? String.valueOf(remote.get("language")) : null);
            repo.setHtmlUrl(remote.get("html_url") != null ? String.valueOf(remote.get("html_url")) : null);
            repo.setDescription(remote.get("description") != null ? String.valueOf(remote.get("description")) : null);

            saved.add(repositoryRepository.save(repo));
        }

        return saved.stream()
                .sorted((a, b) -> a.getFullName().compareToIgnoreCase(b.getFullName()))
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<RepositoryResponse> listStored(UUID userId){
        return repositoryRepository.findByUserIdOrderByFullNameAsc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional (readOnly = true)
    public Repository requireOwned(UUID repoId,UUID userId){
        return repositoryRepository.findByIdAndUserId(repoId,userId)
                .orElseThrow(()->new NotFoundException("Repository not found"));
    }

    @Transactional(readOnly = true)
    public IndexStatusResponse status(UUID repoId,UUID uswrId){
        Repository repo = requireOwned(repoId,uswrId);
        return new IndexStatusResponse(
            repo.getId(),
            repo.getIndexStatus(),
            repo.getIndexedAt(),
            repo.getChunkCount(),
            repo.getFilesTotal(),
            repo.getFilesProcessed(),
            repo.getErrorMessage());
    }

    public RepositoryResponse toResponse(Repository repo) {
        return new RepositoryResponse(
                repo.getId(),
                repo.getGithubRepoId(),
                repo.getOwner(),
                repo.getName(),
                repo.getFullName(),
                repo.isPrivate(),
                repo.getDefaultBranch(),
                repo.getLanguage(),
                repo.getHtmlUrl(),
                repo.getDescription(),
                repo.getIndexStatus(),
                repo.getIndexedAt(),
                repo.getChunkCount(),
                repo.getFilesTotal(),
                repo.getFilesProcessed(),
                repo.getErrorMessage());
    }

    private static Long toLong(Object value){
        if(value instanceof Number number){
            return number.longValue();
        }
        return Long.parseLong(String.valueOf(value));
    }
}
