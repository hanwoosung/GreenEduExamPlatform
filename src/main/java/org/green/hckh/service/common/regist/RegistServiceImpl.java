package org.green.hckh.service.common.regist;

import lombok.RequiredArgsConstructor;
import org.green.hckh.repository.dao.common.RegistDao;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistServiceImpl implements RegistService {

    private final RegistDao registDao;

    @Override
    public int findCntById(String userId) {
        return registDao.findCntById(userId);
    }


}
