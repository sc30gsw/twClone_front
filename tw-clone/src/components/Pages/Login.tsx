import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { StyledLink } from "../layout/AuthLayout";

export const Login = () => {
  const navigate = useNavigate();
  const [usernameErrMsg, setUsernameErrMsg] = useState<string>("");
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrMsg("");
    setPasswordErrMsg("");

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username")?.toString().trim() as string;
    const password = formData.get("password")?.toString().trim() as string;

    let err = false;
    if (!username) {
      err = true;
      setUsernameErrMsg("ユーザー名を入力してください");
    }

    if (!password) {
      err = true;
      setPasswordErrMsg("パスワードを入力してください");
    }

    if (err) return;
    setLoading(true);

    // 新規登録API呼び出し
    try {
      const res = await authApi.login({
        username,
        password,
      });

      setLoading(false);

      //  ローカルストレージにトークンを保存
      localStorage.setItem("token", res.data.token);

      console.log("ログインに成功しました");
      navigate("/");
    } catch (err: any) {
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err: any) => {
        switch (err.param) {
          case "username":
            setUsernameErrMsg(err.msg);
            break;

          case "password":
            setPasswordErrMsg(err.msg);
            break;
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="ユーザー名"
          margin="normal"
          name="username"
          required
          helperText={usernameErrMsg}
          error={usernameErrMsg !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          type="password"
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          required
          helperText={passwordErrMsg}
          error={passwordErrMsg !== ""}
          disabled={loading}
        />
        <LoadingButton
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          color="primary"
          variant="outlined"
          loading={loading}
        >
          ログイン
        </LoadingButton>
        <Box sx={{ display: "flex" }}>
          <Typography>アカウントをお持ちでない方は</Typography>
          <StyledLink to="/register">こちら</StyledLink>
        </Box>
      </Box>
    </>
  );
};
