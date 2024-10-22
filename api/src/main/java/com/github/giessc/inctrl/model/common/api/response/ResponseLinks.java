package com.github.giessc.inctrl.model.common.api.response;

import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseLinks extends ResponseSelfLink {
    @Nullable
    String next;
    @Nullable
    String last;
}
