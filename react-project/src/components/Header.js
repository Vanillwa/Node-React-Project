import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/themStore";
import { useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

function Header() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.body.classList.add(theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
      sessionStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      sessionStorage.setItem("theme", "dark");
    }
  };

  return (
    <Navbar bg={theme} data-bs-theme={theme === "dark" ? "dark" : "light"}>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          리액트 게시판
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/'>
            메인
          </Nav.Link>
          <Nav.Link as={Link} to='/posts'>
            게시판
          </Nav.Link>
          <Nav.Link as={Link} to='#'>
            로그인
          </Nav.Link>
        </Nav>
        <div>
          <Form>
            <Form.Check className='theme' type='switch' label={theme === "light" ? <MdSunny /> : <FaMoon />} id='custom-switch' onChange={handleThemeChange} checked={theme === "dark"} />
          </Form>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
