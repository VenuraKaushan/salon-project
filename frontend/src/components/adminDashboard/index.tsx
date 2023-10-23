import { useState } from 'react';
import { Group, Code, createStyles, rem, getStylesRef } from '@mantine/core';
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
  IconLock
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantine/ds';
// import classes from './NavbarSimple.module.css';

const adminDashboardNav = createStyles((theme) => ({

  navbar: {
    height: `${rem(700)}`,
    width: `${rem(300)}`,
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]}`,
  },

  navbarMain: {
    flex: 1,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
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
  { link: 'admin/catalog',label: 'Appointments',  icon: IconCalendarFilled},
  { link: 'admin/catalog', label: 'Clients', icon: IconUsers, },
  { link: '/admin/catalog', label: 'Inventory', icon: IconBuildingStore },
  { link: 'admin/catalog', label: 'Databases', icon: IconDatabaseImport },
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
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} style={{ justifyContent:'space-between' }} >
          {/* <MantineLogo size={28} /> */}
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {items}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}

export default AdminDashboardNav;