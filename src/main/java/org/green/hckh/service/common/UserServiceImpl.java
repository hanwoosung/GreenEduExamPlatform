package org.green.hckh.service.common;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.UserDto;
import org.green.hckh.repository.dao.common.UserDao;
import org.green.hckh.repository.dao.student.CrsRgstDao;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserDao userDao;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CrsRgstDao crsRgstDao;

    @Override
    public int findCntById(String userId) {
        return userDao.findCntById(userId);
    }

    @Override
    public int save(UserDto user) {
        user.setUserPassword(passwordEncode(user.getPassword()));
        user.setDeleteYn(user.getUserRoleCode().equals("ROLE_TEACHER") ? "Y" : "N");

        crsRgstDao.insertClass(user.getUserId(), 1);

        return userDao.save(user);
    }

    @Override
    public int update(UserDto user) {

        user.setUserPassword(passwordEncode(user.getPassword()));

        return userDao.update(user);
    }

    @Override
    public UserDto loadUserByUsername(String username) throws UsernameNotFoundException {

        UserDto userData = userDao.findById(username);

        return userData == null ? new UserDto() : userData;
    }

    private String passwordEncode(String password) {
        return bCryptPasswordEncoder.encode(password);
    }
}
