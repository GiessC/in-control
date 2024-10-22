package com.github.giessc.inctrl.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.github.giessc.inctrl.model.common.api.response.Response;
import com.github.giessc.inctrl.model.common.api.response.ResponseData;
import com.github.giessc.inctrl.model.common.api.response.ResponseLinks;

@RestController
@EnableWebMvc
public class ExampleController {
    @GetMapping("/example")
    public Response<Map<String, String>> ping() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");

        ResponseData<Map<String, String>> responseData = ResponseData.<Map<String, String>>builder()
                .type("example")
                .id(UUID.randomUUID())
                .attributes(pong)
                .links(ResponseLinks.builder().self("/example").build())
                .build();

        Response<Map<String, String>> response = Response.<Map<String, String>>builder()
                .data(List.of(responseData))
                .links(ResponseLinks.builder().self("/example").build())
                .build();

        if (response == null || !(response instanceof Response)) {
            throw new RuntimeException("Response is null");
        }

        return response;
    }
}
