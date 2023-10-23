import {useState} from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  rem,
  Button,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import {
  IconSearch,
  IconCheck,
  IconX,
  IconPlus
} from "@tabler/icons-react";


const useStyles = createStyles((theme) => ({

  tableHeader: {
    backgroundColor: theme.colors.gray[2], // Change this color as per your preference
  },

  th: {
    padding: "0 !important",
  },
  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
  header: {
    position: "sticky",
    zIndex: 100,
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
  scrolled: {
    boxShadow: theme.shadows.sm,
  },

}));


const Catalog = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  return (
    <>

      <h1>Inventory Management</h1>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* search bar */}
        <TextInput
          placeholder="Search by any field"
          mt={50}
          mb={50}
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          w={800}
        />
        <Button
          leftIcon={<IconPlus size={20} />}
          ml={10}
        >
          Add New Product
        </Button>
      </div>

      {/* table */}
      <div>
      <ScrollArea
        w={"100mw"}
        h={600}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table
        highlightOnHover
        horizontalSpacing={30}
        verticalSpacing="lg"
        miw={700}>
         <thead className={cx(classes.header, classes.tableHeader, { [classes.scrolled]: scrolled })}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>NIC</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
          </tbody>
        </Table>

        </ScrollArea>

      </div>

      

    </>
  )
}

export default Catalog