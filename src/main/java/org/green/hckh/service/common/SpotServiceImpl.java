package org.green.hckh.service.common;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.SpotDto;
import org.green.hckh.repository.dao.common.SpotDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpotServiceImpl implements SpotService {

    private final SpotDao spotDao;

    @Override
    public List<SpotDto> findAll() {
        return spotDao.findAll();
    }
}
