package com.github.giessc.inctrl.model.common.api.response;

import org.springframework.lang.Nullable;

import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@NoArgsConstructor
public class ResponseSelfLink {
    @Nullable
    String self;
}
