import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  rem,
  Group,
} from "@mantine/core";
import LoginPage from "../Login";
import { RefObject, useRef, useEffect } from "react";
import { getHotkeyHandler } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import ClientLogin from "../../components/clientLogin";
import { useNavigate } from 'react-router-dom'; 


const useStyles = createStyles((theme: any) => ({
  root: {
    height: "100vh",
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    width: 800,
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    width: 1000,
    display: "flex",
    alignItems: "center",
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,
    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    fontSize: rem(60),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    textAlign: "justify",
    maxWidth: rem(1000),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

const LandingPage = () => {
  const { classes } = useStyles();

  //ref the login
  const login: RefObject<HTMLInputElement> = useRef(null);

  //handle scroll
  const handleScroll = (elmRef: any) => {
    window.scrollTo({ top: elmRef.current.offsetTop, behavior: "smooth" })
  }
  const navigate = useNavigate(); // Initialize the useNavigate hook


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for Ctrl + L key combination
      if (event.ctrlKey && event.key === 'l') {
        // Navigate to the ClientLogin page
        navigate('/login/hiddenAdmin');
        notifications.show({ title: 'Hello Welcome!!', message: "Hidden Portal opended" });

      }
    };

    // Add event listener for key press
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]); // Include navigate in the dependency array


  return (
    <>
      {/* display: "flex", justifyContent: "center", alignItems: "center", */}
      <div className={classes.root} style={{ minHeight: "100vh" }}>
        <Group position="center">
          <Title
            className={classes.title}
            style={{ letterSpacing: "15px", marginTop: "25vh" }}
          >
            Salon system
          </Title>
        </Group>
        <Group position="center">
          <Text className={classes.description} mt={30}>
            A beauty salon is a specialized establishment that offers a
            range of beauty and grooming services to enhance and maintain a
            person's physical appearance and well-being. These salons provide a
            wide array of services designed to help individuals look and feel their
            best. Here's a description of what a beauty salon typically offers:
            A beauty salon is a specialized establishment that offers a range of
            beauty and grooming services to enhance and maintain a person's physical
            appearance and well-being. These salons provide a wide array of services
            designed to help individuals look and feel their best. Here's a description o
            f what a beauty salon typically offers:
          </Text>
        </Group>
        <Group position="center">
          <Button
            variant="gradient"
            gradient={{ from: "pink", to: "yellow" }}
            size="xl"
            className={classes.control}
            mt={40}
            onClick={() => handleScroll(login)}
          >
            Get started
          </Button>
        </Group>
      </div>

      {/* // connect Login Page */}

      <LoginPage ref={login} />
    </>
  );
};

export default LandingPage;
