import { Container, Link, Typography } from "@mui/material";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-shape left-square"></div>
        <div className="footer-shape left-shape"></div>
        <Container maxWidth="sm" style={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            style={{
              paddingTop: "7px",
              fontStyle: "italic",
              color: "#FFFFE1",
            }}
          >
            Desarrollado por{" "}
            <Link
              href="https://www.linkedin.com/in/lucas-vergara-78a8891b5/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFEEAF",
                textDecoration: "none",
              }}
            >
              Lucas Vergara
            </Link>
          </Typography>
        </Container>

        <div className="footer-shape right-shape"></div>
        <div className="footer-shape right-square"></div>
      </div>
      <img src="Etex_Logo.png" alt="Etex Logo" className="etex-logo" />
    </footer>
  );
}

export default Footer;
