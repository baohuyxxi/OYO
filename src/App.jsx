import React, { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import Auth from "./routes/Auth";
import "./App.css";
import ListAccomPage from "./pages/ListAccomPage/ListAccomPage";
function App() {
  // const { t } = useTranslation();
  // useEffect(() => {
  //   const selectedLanguage = localStorage.getItem('selectedLanguage');
  //   if (selectedLanguage) {
  //     i18n.changeLanguage(selectedLanguage);
  //   }
  // }, []);
  return (
    <div>
      <Auth />
    </div>
  );
}

export default App;
