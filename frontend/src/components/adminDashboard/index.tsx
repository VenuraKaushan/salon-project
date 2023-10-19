import react from 'react';
import { Group ,Code, ScrollArea, rem, createStyles} from '@mantine/core';
import {LinksGroup} from '../adminDashboard/linkGroup'
import {UserButton} from '../adminDashboard/userButton'
import {
    IconNotes,
    IconCalendarFilled,
    IconGauge,
    IconUsers,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
    IconBuildingStore
  } from '@tabler/icons-react';

  const adminDashboardNav = createStyles((theme) => ({

    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
        height: `${rem(800)}`,
        width: `${rem(300)}`, 
        padding: theme.spacing.md,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]}`,
      },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
      },
    
      links: {
        flex: 1,
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
      },
    
      linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      },
    
      footer: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
      },
    
  }));

  const mockdata = [
    { label: 'Dashboard', icon: IconGauge, link: '/' }, // Dashboard page
  
    {
      label: 'Appointments',
      icon: IconCalendarFilled,
      initiallyOpened: true,
      links: [
        { label: 'Scheduler', link: '/scheduler' }, // Link to the scheduler page
        { label: 'Appointments', link: '/appointments' }, // Link to appointments page
        { label: 'Cancels', link: '/cancels' }, // Link to appointment cancellations page
        { label: 'Today', link: '/today-appointments' }, // Link to today's appointments page
      ],
    },
  
    {
      label: 'Clients',
      icon: IconUsers,
      links: [
        { label: 'New Clients', link: '/' }, 
        { label: 'Existing Clients', link: '/' },
      ],
    },
  
    {
      label: 'Inventory',
      icon: IconBuildingStore,
      links: [
        { label: 'Product Catalog', link: '/' },
        { label: 'Stock Levels', link: '/' }, 
        { label: 'Reorder Alerts', link: '/' },
      ],
    },
  
    { label: 'Point of Sale', icon: IconFileAnalytics, link: '/point-of-sale' }, 
  
    { label: 'Employees', icon: IconAdjustments, link: '/employees' },
  
    {
      label: 'Security',
      icon: IconLock,
      links: [
        { label: 'Change Password', link: '/change-password' },
        { label: 'Recovery Codes', link: '/recovery-codes' },
      ],
    },
  ];

const AdminDashboardNav = () => {
    const name = localStorage.getItem("name");
    const {classes, cx} = adminDashboardNav();
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <h3>Admin Dashboard</h3>
          <Group>
              <Code fw={700}>User : </Code> 
              <Code fw={900}>{name}</Code>
          </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  )
}

export default AdminDashboardNav;