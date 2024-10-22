package com.github.giessc.inctrl.model.common.api.response;

import java.util.List;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Response<TData> {
    @lombok.NonNull
    @NonNull
    ResponseLinks links;
    @Nullable
    List<ResponseData<TData>> data;
    @Nullable
    List<ResponseData<Object>> included;
}
