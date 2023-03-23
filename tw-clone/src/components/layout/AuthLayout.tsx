import { Box, Container } from "@mui/material";
import twitterIcon from "../../assets/images/twitterIcon.jpg";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useEffect } from "react";
import authUtils from "../../utils/authUtils";

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

export const AuthLayout = () => {
  const navigate = useNavigate();

  // ページ遷移ごとに発火する
  useEffect(() => {
    // JWTを持っているかの確認
    const checkAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={twitterIcon}
            alt=""
            style={{
              width: 100,
              height: 100,
              marginBottom: 3,
              borderRadius: "50%",
            }}
          />
          Twitterクローン開発
        </Box>
        <Outlet />
      </Container>
    </>
  );
};
