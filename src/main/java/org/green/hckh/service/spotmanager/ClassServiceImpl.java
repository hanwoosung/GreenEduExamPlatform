package org.green.hckh.service.spotmanager;

import lombok.RequiredArgsConstructor;
import org.green.hckh.entity.teacher.schedule.ClassEntity;
import org.green.hckh.repository.jpa.ClassRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created on 2024-12-16 by 황승현
 */
@Service
@RequiredArgsConstructor
public class ClassServiceImpl implements ClassService {
    private final ClassRepository classRepository;

    @Override
    public List<ClassEntity> findBySpotNo(int spotNo) {
        return classRepository.findBySpotNo(spotNo).orElse(null);
    }
}
