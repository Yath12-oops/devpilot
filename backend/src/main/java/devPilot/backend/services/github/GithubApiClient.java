package devPilot.backend.services.github;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class GithubApiClient {
    
    private static final String API_BASE="https://api.github.com";

    private static final ParameterizedTypeReference<List<Map<String,Object>>> LIST_MAP=new ParameterizedTypeReference<>(){};

    private static final ParameterizedTypeReference<Map<String,Object>> MAP=new ParameterizedTypeReference<>(){};

    private final RestClient.Builder restClientBuilder;
    
    public List<Map<String,Object>> listUserRepos(String accessToken){
        List<Map<String,Object>> all=new ArrayList<>();
        int page=1;
        while(page<=10){
            final int currentPage=page;
            List<Map<String,Object>> pageRepos=client(accessToken)
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/user/repos")
                            .queryParam("affiliations", "owner,collaborator,organization_member")
                            .queryParam("sort", "updated")
                            .queryParam("per_page", 100)
                            .queryParam("page", currentPage)
                            .build())
                    .retrieve()
                    .body(LIST_MAP);
                    if(pageRepos==null || pageRepos.isEmpty()){
                        break;
                    }
                    all.addAll(pageRepos);
                    if(pageRepos.size()<100){
                        break;
                    }
                    page++;
        }
        return all;
    }
    private RestClient client(String accessToken){
        return restClientBuilder
                .baseUrl(API_BASE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .defaultHeader(HttpHeaders.ACCEPT, "application/vnd.github+json")
                .defaultHeader("X-GitHub-Api-Version", "2022-11-28")
                .defaultHeader(HttpHeaders.USER_AGENT, "DevPilot")
                .build();
    }
}
