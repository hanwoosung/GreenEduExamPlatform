import React, {Fragment} from "react";
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
    ToggleButton,
    Autocomplete, CircularProgress
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useUserInfoHandler} from "../../assets/js/common/userInfoHandler";

const Userinfo = () => {

    const {
        userData,
        errors,
        open,
        options,
        loading,
        handleOpen,
        handleClose,
        handleChange,
        handleAutocomplete,
        handleSubmit,
    } = useUserInfoHandler();

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
                <ToggleButtonGroup
                    fullWidth
                    color="primary"
                    value={userData.userRoleCode}
                    exclusive
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
                                disabled={true}
                                id="userId"
                                label="아이디"
                                name="userId"
                                autoComplete="userId"
                                value={userData.userId}
                                onChange={handleChange}
                                error={Boolean(errors.userId)}
                                helperText={errors.userId}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="name"
                                label="이름"
                                id="userName"
                                autoComplete="name"
                                value={userData.name}
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
                                value={userData.userPassword}
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
                                value={userData.confirmPassword}
                                onChange={handleChange}
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                open={open}
                                onOpen={handleOpen}
                                onClose={handleClose}
                                onChange={(event, newValue) => {
                                    console.log(newValue);
                                    handleAutocomplete("spot", newValue);
                                }}
                                value={userData.spot}
                                isOptionEqualToValue={(option, value) => option.spotNo === value.spotNo}
                                getOptionLabel={(option) => option.spotName}
                                options={options}
                                loading={loading}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="지점"
                                        slotProps={{
                                            input: {
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <Fragment>
                                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </Fragment>
                                                ),
                                            },
                                        }}
                                    />
                                )}
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
                                value={userData.userBirth}
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
                        정보수정
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Userinfo;
