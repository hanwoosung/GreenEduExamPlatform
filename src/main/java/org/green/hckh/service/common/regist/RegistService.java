package org.green.hckh.service.common.regist;


import org.green.hckh.dto.common.UserDto;

public interface RegistService {

    int findCntById(String userId);

    int save(UserDto user);
}
