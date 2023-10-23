import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  rem,
  Modal,
  Text,
} from "@mantine/core";

import { Form, useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import ClientAPI from "../../../API/clientAPI/client.api";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(700),
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    minHeight: rem(500),
    maxWidth: rem(450),
    paddingTop: rem(800),
    marginLeft: rem(600),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

// login component
const ClientLogingPage = () => {
  const { classes } = useStyles();
  const [regOpened, setRegOpened] = useState(false);

  //declare reg form
  const regForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",

    },
  });

  // Function to open the registration modal
  const openRegistrationModal = () => {
    setRegOpened(true);
  };


  //register function
  const clientReg = async (values: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }) => {
    showNotification({
      id: "Add Client",
      loading: true,
      title: "Adding Your record",
      message: "Please wait while we add Your record..",
      autoClose: false,
    });
    ClientAPI.clientReg(values)
      .then((Response) => {
        updateNotification({
          id: "Add Client",
          color: "teal",
          title: "Adding Your record",
          message: "Please wait while we add Your record..",
          icon: <IconCheck />,
          autoClose: 2500,
        });

        regForm.reset();
        setRegOpened(false);

      })
      .catch((error) => {
        updateNotification({
          id: "Add Client",
          color: "red",
          title: "Something went wrong!",
          message: "There is a problem when adding Your Details",
          icon: <IconX />,
          autoClose: 2500,
        });
      });

  };

  // Checking login data
  const login = async (values: { email: string; password: string }) => {
    ClientAPI.login(values)
      .then((response: any) => {

        // save user details in the local storage
        const test = localStorage.setItem("user-client-session", JSON.stringify(response.data));

        console.log(test);
        // navigate to the worker dashboard
        window.location.href = '/client/dashboard';
      })
      .catch((error) => {
        showNotification({
          title: 'User credentials are wrong',
          message: "check your user credentials again",
          color: "red",
          autoClose: 1500,
          icon: <IconX size={16} />
        })
      });
  };



  const loginForm = useForm({
    validateInputOnChange: true,

    initialValues: {
      email: "",
      password: "",
    },

    // validate data realtime
    validate: {
      email: (value) => {
        if (!value) {
          return 'This field is required';
        }
        if (!/^\S+@\S+$/.test(value)) {
          return 'Invalid  Email';
        }
        return null;
      },
    },
  });

  return (
    <>
      {/* client register modal */}
      <Modal
        opened={regOpened}
        onClose={() => setRegOpened(false)}
        size={"50%"}
      >
        <form
          onSubmit={regForm.onSubmit((values) => clientReg(values))}
        >
          <Text fw={700} style={{ textAlign: "center" }}>Enter Your Details</Text>

          <TextInput
            placeholder="Enter Full Name"
            label="Full Name"
            {...regForm.getInputProps("name")}
            radius="lg"
            withAsterisk
            required
          />
          <TextInput
            placeholder="Enter Working Email"
            label="Email"
            {...regForm.getInputProps("email")}
            radius="lg"
            withAsterisk
            required
          />
          <TextInput
            placeholder="Enter Phone number"
            label="Phone Number"
            {...regForm.getInputProps("phone")}
            radius="lg"
            withAsterisk
            required
          />
          <TextInput
            placeholder="Enter Address"
            label="Address"
            {...regForm.getInputProps("address")}
            radius="lg"
            withAsterisk
            required
          />
          <TextInput
            placeholder="Enter Password"
            label="Password"
            {...regForm.getInputProps("password")}
            radius="lg"
            withAsterisk
            required
          />

          <Button color="blue" radius="lg" type="submit"
            style={{ marginLeft: "290px", marginTop: '10px' }}
          >
            Register
          </Button>
        </form>
      </Modal>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back!
          </Title>

          {/* form */}
          <form
            onSubmit={loginForm.onSubmit(
              (values: { email: string; password: string }) => {
                login(values);
              }
            )}
          >
            {/* email */}
            <TextInput
              label="Enter Your Email Address"
              placeholder="Your email"
              size="md"
              {...loginForm.getInputProps("email")}
            />
            {/* password */}
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...loginForm.getInputProps("password")}
            />

            {/* login button */}
            <Button fullWidth mt="xl" size="md" type="submit">
              Login
            </Button>
          </form>
          {/* Link to registration page */}
          <p>
            If you don't have an account,{" "}
            <a href="#" onClick={openRegistrationModal}>
              register here
            </a>
            .
          </p>
        </Paper>
      </div>
    </>
  );
};

export default ClientLogingPage;
