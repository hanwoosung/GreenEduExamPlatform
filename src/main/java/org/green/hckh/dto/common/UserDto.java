package org.green.hckh.dto.common;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;

@Data
@NoArgsConstructor
public class UserDto implements UserDetails {

    private String userId; // 사용자 ID (학생, 선생님, 관리자)
    private String userPassword; // 사용자 비밀번호
    private String userName; // 사용자 이름
    private LocalDate userBirth; // 사용자 생년월일
    private String userRoleCode; // 사용자 역할 (STUDENT: 학생, TEACHER: 선생님, SPOT_ADMIN : 지점 관리자, ADMIN: 관리자)
    private String deleteYn; // 삭제 여부, 기본값은 "N"

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return userRoleCode;
            }
        });

        return collection;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userId;
    }
}
