import React from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Grid,
    Link,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useRegistHandler} from "../../assets/js/common/registHandler";

const Regist = () => {

    const {
        reigstData,
        errors,
        alignment,
        handleToggle,
        handleChange,
        handleDuplicate,
        handleSubmit
    } = useRegistHandler();

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    회원가입
                </Typography>
                <ToggleButtonGroup
                    fullWidth
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleToggle}
                    aria-label="userRoleCode"
                    sx={{mt: 3, mb: 2}}
                >
                    <ToggleButton value="ROLE_STUDENT">학생</ToggleButton>
                    <ToggleButton value="ROLE_TEACHER">선생님</ToggleButton>
                </ToggleButtonGroup>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userId"
                                label="아이디"
                                name="userId"
                                autoComplete="userId"
                                value={reigstData.userId}
                                onChange={handleChange}
                                error={Boolean(errors.userId)}
                                helperText={errors.userId}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleDuplicate}
                                disabled={Boolean(reigstData.idChk)}
                                sx={{mt: 3, mb: 2}}
                            >
                                중복체크
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="name"
                                label="이름"
                                id="userName"
                                autoComplete="name"
                                value={reigstData.name}
                                onChange={handleChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="userPassword"
                                label="비밀번호"
                                type="password"
                                id="userPassword"
                                autoComplete="userPassword"
                                value={reigstData.userPassword}
                                onChange={handleChange}
                                error={Boolean(errors.userPassword)}
                                helperText={errors.userPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="비밀번호 확인"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={reigstData.confirmPassword}
                                onChange={handleChange}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="userBirth"
                                label="생년월일"
                                type="date"
                                id="userBirth"
                                autoComplete="userBirth"
                                value={reigstData.userBirth}
                                onChange={handleChange}
                                error={Boolean(errors.userBirth)}
                                helperText={errors.userBirth}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        회원가입
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                이미 계정이 있으신가요? 로그인
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Regist;
