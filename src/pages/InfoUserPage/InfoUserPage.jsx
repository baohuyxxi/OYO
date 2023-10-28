import { Link } from "react-router-dom";
import AppBar from "~/components/AppBar/AppBar";
import React, { useState } from "react";
import "./InfoUserPage.scss";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Route, Routes } from "react-router-dom";
import EditInfo from "./EditAccount/EditAccount";
import PasswordSecurity from "./passwordSecurity/passwordSecurity";
import Footer from "~/components/Footer/Footer";
import Paper from "@mui/material/Paper";
import { AuthContext } from "~/contexts/AuthContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import CardInfo from "./CardInfo/CardInfo";
import Divider from "@mui/material/Divider";

import { t } from "i18next";

const InfoUserPage = () => {
  const { userCurrent, setUserCurrent, setAccessToken, setRefreshToken } =
    useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState("profile");

  // Hàm này được gọi khi một mục được chọn
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  // const user = useSelector((state: RootState) => state.user);
  return !userCurrent ? (
    (document.location = "/")
  ) : (
    <div className="info-user__page">
      <AppBar />
      <div className="content-account">
        <div className="row">
          <CardInfo />

          <div className="col l-9">
            <div className="col">
              <h1 className="custom-heading">{t("common.setting")} </h1>

              <Link
                to="/account"
                className={`link-user ${
                  selectedItem === "profile" ? "selected-link" : ""
                }`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => handleItemClick("profile")}
              >
                {t("navbar.profile")}
              </Link>
              <Link
                to="/account/password&Security"
                className={`link-user ${
                  selectedItem === "password&Security" ? "selected-link" : ""
                }`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => handleItemClick("password&Security")}
              >
                {t("navbar.passwordAndSecurity")}
              </Link>
              <Link
                to="/account/payment"
                className={`link-user ${
                  selectedItem === "billing" ? "selected-link" : ""
                }`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => handleItemClick("billing")}
              >
                {" "}
                {t("navbar.billingInformation")}
              </Link>

              <Paper className="card-content">
                <Routes>
                  <Route path="/" element={<EditInfo />} />
                  <Route
                    path="/password&Security"
                    element={<PasswordSecurity />}
                  />
                </Routes>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoUserPage;
