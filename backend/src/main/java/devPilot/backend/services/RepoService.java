package devPilot.backend.services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import devPilot.backend.repository.RepositoryRepository;
import devPilot.backend.services.github.GithubApiClient; 
@Service
@RequiredArgsConstructor 
public class RepoService {
    
    private final RepositoryRepository repositoryRepository;
    private final UserService userService;
    private final GithubApiClient githubApiClient;

    private static Long toLong(Object value){
        if(value instanceof Number number){
            return number.longValue();
        }
        return Long.parseLong(String.valueOf(value));
    }
}
