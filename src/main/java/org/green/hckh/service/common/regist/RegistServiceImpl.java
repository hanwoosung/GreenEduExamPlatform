package org.green.hckh.service.common.regist;

import lombok.RequiredArgsConstructor;
import org.green.hckh.dto.common.UserDto;
import org.green.hckh.repository.dao.common.RegistDao;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistServiceImpl implements RegistService, UserDetailsService {

    private final RegistDao registDao;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public int findCntById(String userId) {
        return registDao.findCntById(userId);
    }

    @Override
    public int save(UserDto user) {

        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setUserPassword(encodedPassword);
        user.setDeleteYn("N");

        return registDao.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return registDao.findById(username);
    }
}
