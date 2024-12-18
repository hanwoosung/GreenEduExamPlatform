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

import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import {useLoginHandler} from "../../assets/js/common/loginHandler.js";

const Login = () => {

    const {
        loginData,
        errors,
        handleChange,
        handleSubmit
    } = useLoginHandler();

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
                    <LockOpenSharpIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>

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
                                value={loginData.userId}
                                onChange={handleChange}
                                error={Boolean(errors.userId)}
                                helperText={errors.userId}
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
                                value={loginData.userPassword}
                                onChange={handleChange}
                                error={Boolean(errors.userPassword)}
                                helperText={errors.userPassword}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        로그인
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="regist" variant="body2">
                                계정이 없으신가요? 회원가입
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
