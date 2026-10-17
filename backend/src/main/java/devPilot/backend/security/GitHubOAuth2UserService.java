package devpilot.backend.security;

import java.util.stream.Collectors;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import devpilot.backend.entity.User;
import devpilot.backend.services.UserService;

@Service
public class GitHubOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserService userService;
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

    public GitHubOAuth2UserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = delegate.loadUser(userRequest);

        String accessToken = userRequest.getAccessToken().getTokenValue();
        String scopes = userRequest.getAccessToken().getScopes().stream()
                .map(Object::toString)
                .collect(Collectors.joining(","));

        User user = userService.upsertFromGithub(oauth2User.getAttributes(), accessToken, scopes);

        return new AppUserPrincipal(user, oauth2User.getAttributes(), oauth2User.getAuthorities());
    }
}
