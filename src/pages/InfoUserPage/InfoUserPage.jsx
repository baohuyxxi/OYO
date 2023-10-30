import { Link } from "react-router-dom";
import AppBar from "~/components/AppBar/AppBar";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import EditInfo from "./EditAccount/EditAccount";
import PasswordSecurity from "./passwordSecurity/passwordSecurity";
import Footer from "~/components/Footer/Footer";
import Paper from "@mui/material/Paper";
import { AuthContext } from "~/contexts/AuthContext";
import { useContext } from "react";
import CardInfo from "./CardInfo/CardInfo";
import "./InfoUserPage.scss";
import { t } from "i18next";

export default function InfoUserPage() {
  const { userCurrent } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState("profile");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return !userCurrent ? (

    (document.location = "/")
  ) : (
    <>
      <div className="frame-page">
      <AppBar />
        <div className="content info-user">
          <div className="row"> 
            <CardInfo />
            <div className="col l-9">
              <div className="col">
                <h1 className="heading">{t("common.setting")} </h1>
                <div className="options">
                  <Link
                    to="/account"
                    className={`option ${selectedItem === "profile" ? "selected-option" : ""}`}
                    onClick={() => handleItemClick("profile")}
                  >
                    {t("navbar.profile")}
                  </Link>
                  <Link
                    to="/account/password&Security"
                    className={`option ${selectedItem === "password&Security" ? "selected-option" : ""}`}
                    onClick={() => handleItemClick("password&Security")}
                  >
                    {t("navbar.passwordAndSecurity")}
                  </Link>
                  <Link
                    to="/account/payment"
                    className={`option ${selectedItem === "billing" ? "selected-option" : ""}`}
                    onClick={() => handleItemClick("billing")}
                  >
                    {t("navbar.billingInformation")}
                  </Link>
                </div>
                <div className="paper card-content">
                  <Routes>
                    <Route path="/" element={<EditInfo />} />
                    <Route
                      path="/password&Security"
                      element={<PasswordSecurity />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <Footer />
      </div>
    
    </>
  );
}
