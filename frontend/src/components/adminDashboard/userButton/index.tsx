import { UnstyledButton, Group, Avatar, Text, rem, createStyles } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
// import classes from './UserButton.module.css';

const userButton = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.black,
    
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      },
}));

export function UserButton() {
    const {classes, cx} = userButton();

    //retrieving user details from local storage
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
           {email}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}