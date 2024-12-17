package org.green.hckh.service.common;


import org.green.hckh.dto.common.UserDto;

public interface UserService {

    int findCntById(String userId);

    int save(UserDto user);
}
