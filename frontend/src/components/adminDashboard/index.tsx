import { useState } from 'react';
import { Group, Code, createStyles, rem, getStylesRef, Navbar } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconGauge,
  IconCalendarFilled,
  IconUsers,
  IconBuildingStore,
  IconLock,
  IconSquareRoundedCheck
} from '@tabler/icons-react';

const adminDashboardNav = createStyles((theme) => ({

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.dark[4],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.colors.black : theme.colors.white,
    },

    '[data-active]': {
      backgroundColor: theme.colors.blueLight,
      color: theme.colors.blueLightColor,

      '.linkIcon': {
        color: theme.colors.blueLightColor,
      },
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },


  linkIcon: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.dark[2],
    marginRight: theme.spacing.sm,
    width: `${rem(25)}`,
    height: `${rem(25)}`,
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const links = [
  { label: 'Dashboard', icon: IconGauge, link: 'admin/catalog' },
  { link: '/admin/appointments',label: 'New Appointments',  icon: IconCalendarFilled},
  { link: '/admin/assigned', label: 'Assigned Appointments', icon: IconDatabaseImport },
  { link: '/admin/completed', label: 'Completed Appointments', icon: IconSquareRoundedCheck},
  // { link: '/admin/clients', label: 'Clients', icon: IconUsers, },
  { link: '/admin/catalog', label: 'Inventory', icon: IconBuildingStore },
  { link: '/admin/stockpage', label: 'Cash Management', icon: IconBuildingStore },
  { link: 'admin/catalog', label: 'Security', icon: IconLock },
  { link: 'admin/catalog', label: 'Other Settings', icon: IconSettings },
];


const AdminDashboardNav = ({link_id} : any) => {

  const {classes, cx}= adminDashboardNav();
  const [active, setActive] = useState(links[link_id].link);

  const items = links.map((link,index) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: active=== link.link,
      })}
      href={link.link}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        window.location.href = link.link;
        setActive(link.label);
      }}
    >
      <link.icon className={classes.linkIcon} stroke={1.5} />
      <span>{link.label}</span>
    </a>
  ));

  return (
    <div  style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar width={{ sm: 250 }} p="md" style={{ flex: 1 }}>
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
          </Group>
          {items}
        </Navbar.Section>

        <Navbar.Section className={classes.footer} >
          <a
          
            href="/admin/logout"
            className={classes.link}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span >Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
    </div>
    <div>
    </div>
  </div>
  )
}

export default AdminDashboardNav;