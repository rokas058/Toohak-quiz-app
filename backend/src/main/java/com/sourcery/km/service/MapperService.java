package com.sourcery.km.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MapperService {
    private final ModelMapper modelMapper;

    public <T, K> List<K> mapList(List<T> list, Class<K> targetClass) {
        return list.stream().map(item -> modelMapper.map(item, targetClass)).toList();
    }

    public <S, T> T map(S source, Class<T> targetClass) {
        return modelMapper.map(source, targetClass);
    }
}
