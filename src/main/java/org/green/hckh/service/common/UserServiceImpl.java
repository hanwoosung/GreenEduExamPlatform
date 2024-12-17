package org.green.hckh.service.common;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.UserDto;
import org.green.hckh.repository.dao.common.UserDao;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserDao userDto;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public int findCntById(String userId) {
        return userDto.findCntById(userId);
    }

    @Override
    public int save(UserDto user) {

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setUserPassword(encodedPassword);
        user.setDeleteYn("N");

        return userDto.save(user);
    }

    @Override
    public UserDto loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDto userData = userDto.findById(username);

        return userData == null ? new UserDto() : userData;
    }
}
