package com.github.giessc.inctrl.model.common.api.response;

import java.util.UUID;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseData<TData> {
    @lombok.NonNull
    @NonNull
    String type;
    @lombok.NonNull
    @NonNull
    UUID id;
    @lombok.NonNull
    @NonNull
    TData attributes;
    @Nullable
    Object relationships;
    @Nullable
    ResponseSelfLink links;
}
