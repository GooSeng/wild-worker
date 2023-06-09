package com.a304.wildworker.controller.rest;

import com.a304.wildworker.common.Constants;
import java.net.URI;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/login")
    public ResponseEntity<?> login(HttpServletRequest request) {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .replacePath(request.getContextPath()).build().toString();
        String redirectURI = baseUrl + "/oauth2/authorization/kakao";
        String referer = request.getHeader("Referer");
        referer = ServletUriComponentsBuilder.fromHttpUrl(referer).replacePath("").toUriString();
        HttpSession session = request.getSession();
        session.setAttribute(Constants.SESSION_NAME_PREV_PAGE, referer);
        log.info("/auth/login: {}", redirectURI);
        URI uri = URI.create(redirectURI);
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY).location(uri).build();
    }
}
