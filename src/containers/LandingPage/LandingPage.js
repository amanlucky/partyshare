import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import Featured from "../../components/Featured";
import "../../styles/landing.css";
import Popular from "../../components/Popular";
import Earn from "../../components/Earn";
import Steps from "../../components/Steps";
import Trusted from "../../components/Trusted";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";
const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <Featured />
      <Popular />
      <Earn />
      <Steps />
      <Trusted />
      <FAQ />
      <Footer />
    </>
  );
};

export default LandingPage;