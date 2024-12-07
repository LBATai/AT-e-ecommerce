import React from "react";

const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Oops! Trang bạn tìm kiếm không tồn tại.</p>
        <a href="/" style={styles.homeButton}>
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#F8F9FA",
  },
  content: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "100px",
    fontWeight: "bold",
    color: "#6C757D",
    margin: "0",
  },
  message: {
    fontSize: "20px",
    color: "#6C757D",
    margin: "10px 0",
  },
  homeButton: {
    textDecoration: "none",
    backgroundColor: "#6C757D",
    color: "#FFFFFF",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    marginTop: "50px",
  },
};

export default PageNotFound;
