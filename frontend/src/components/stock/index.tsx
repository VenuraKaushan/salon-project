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
import AdminAPI from '../../API/adminAPI/admin.api';
import { keys } from "@mantine/utils";
import {
  IconSearch,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { showNotification, updateNotification } from "@mantine/notifications";
import BatteryAPI from "../../API/batteryAPI/battery.api";
import { useQuery } from '@tanstack/react-query';
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";

const useStyles = createStyles((theme) => ({

  tableHeader: {
    backgroundColor: theme.colors.gray[2], // Change this color as per your preference
  },

  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
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
      borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface Data {
  _id: string;
  stock_id: string;
  // quantity: string;
  // added_data: string;
  // warnty_priod: String;
  sellingPrice: string;
  // actualPrice: string;
  batry_brand: string;
  Battery_description: string;
}

function filterData(data: Data[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

const StockTable = () => {
  const [search, setSearch] = useState("");
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpened, setEditOpened] = useState(false);


  // use react query and fetch data
  const { data = [], isLoading, isError, refetch } = useQuery(["stockData"], () => {
    return BatteryAPI.getRequestedStocks().then((res) => res.data)
  }, { initialData: [] })

  //declare edit form
  const editForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      _id: "",
      stock_id: "",
      // quantity: "",
      // added_date: new Date(),
      // warnty_priod: "",
      sellingPrice: "",
      // actualPrice: "",
      batry_brand: "",
      Battery_description: "",
    },
  });

  // accept Stock function
  const acceptStock = (stockId: string) => {
    BatteryAPI.acceptStock(stockId)
      .then((res) => {
        showNotification({
          title: `Service was accepted`,
          message: "Service was accepted successfully",
          autoClose: 1500,
          icon: <IconCheck />,
          color: "teal",
        });

        // after successing the accepting, refetch the data from the database
        refetch();
      })
      .catch((err) => {
        showNotification({
          title: `Service was not accepted`,
          message: "Service was not accpeted",
          autoClose: 1500,
          icon: <IconX />,
          color: "red",
        });
      });
  };

  

  // delete Stock function
  const deleteSpecificStock = (stockId: string) => {
    BatteryAPI.rejectBattery(stockId)
      .then((res) => {
        showNotification({
          title: `Service was deleted`,
          message: "Service was deleted successfully",
          autoClose: 1500,
          icon: <IconCheck />,
          color: "teal",
        });

        // after successing the deletion refetch the data from the database
        refetch();

      })
      .catch((err) => {
        showNotification({
          title: `Service was not deleted`,
          message: "Service was not deleted",
          autoClose: 1500,
          icon: <IconX />,
          color: "red",
        });
      });
  };
  //update Item  function
  const updateRequestedStocks = async (values: {
    _id: string;
    stock_id: string;
    // quantity: string;
    // added_date: Date;
    // warnty_priod: String;
    sellingPrice: string;
    // actualPrice: string;
    batry_brand: string;
    Battery_description: string;
  }) => {
    showNotification({
      id: "update-items",
      loading: true,
<<<<<<< Updated upstream
      title: "Updating service record",
=======
      title: "Updating Service record",
>>>>>>> Stashed changes
      message: "Please wait while we update service record..",
      autoClose: false,
    });
    console.log(values);
    BatteryAPI.updateRequestedStocks(values)
      .then((response) => {
        updateNotification({
          id: "update-items",
          color: "teal",
          icon: <IconCheck />,
          title: "Service updated successfully",
          message: "Service data updated successfully.",
          //icon: <IconCheck />,
          autoClose: 5000,
        });
        editForm.reset();
        setEditOpened(false);

        //getting updated items from database
        refetch();
      })
      .catch((error) => {
        updateNotification({
          id: "update-items",
          color: "red",
<<<<<<< Updated upstream
          title: "Service updatimg failed",
=======
          title: "Service updating failed",
>>>>>>> Stashed changes
          icon: <IconX />,
          message: "We were unable to update the service",
          // icon: <IconAlertTriangle />,
          autoClose: 5000,
        });
      });
  };

  // reject confirmation modal
  const openDeleteModal = (stockId: string) =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to reject this service? This action cannot be undone later.
        </Text>
      ),
<<<<<<< Updated upstream
      labels: { confirm: 'Reject service', cancel: "No don't reject it" },
=======
      labels: { confirm: 'Remove service', cancel: "No don't reject it" },
>>>>>>> Stashed changes
      confirmProps: { color: 'red' },
      onCancel: () => modals.close,
      onConfirm: () => deleteSpecificStock(stockId),
    });


  // accept modal
  const openAcceptModal = (stockId: string) => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        Are you sure you want to accept this service? This service will be added to the service.
      </Text>
    ),
    labels: { confirm: 'Accept', cancel: 'Cancel' },
    confirmProps: { color: "teal" },
    onCancel: () => modals.close,
    onConfirm: () => acceptStock(stockId),
  });



  // rows map
  const rows = Array.isArray(data) ? data?.map((row: any) => (
    <tr key={row._id}>
      <td>
        <Text size={15}>{row.stock_id}</Text>
      </td>
      <td>
        <Text size={15}>{row.batteryBrand}</Text>
      </td>
      <td>
        <Text size={15}>{row.batteryDescription}</Text>
      </td>
      

      <td>
        <Text size={15}>{row.sellingPrice}</Text>
      </td>
      
     
      <td>
        {
          <>
            <Group spacing={"sm"}>
              {/* Accept button */}
              <Button type="submit" onClick={() => {
                openAcceptModal(row._id)
              }} sx={{ width: '100px'}}
              >
                Accept
              </Button>

              {/* Reject Button */}
              <Button type="submit" color="red"
                onClick={() => {
                  openDeleteModal(row._id);
                }} sx={{ width: '100px'}}
              >
                Reject
              </Button>

              {/* edit button */}
              <Button type="submit" color="green"
                onClick={() => {
                  editForm.setValues({
                    _id: row._id,
                    stock_id: row.stock_id,
                    Battery_description: row.batteryDescription,
                    batry_brand: row.batteryBrand,
                    // actualPrice: row.actualPrice,
                    sellingPrice: row.sellingPrice,
                    // quantity: row.quantity,
                    // added_date: new Date(row.added_date),
                    // warnty_priod: row.warranty,
                  });
                  setEditOpened(true);
                }} sx={{ width: '100px'}}
              >
                Edit
              </Button>
            </Group>
          </>
        }
      </td>

    </tr>
  )) : null;

  // if data is fetching this overalay will be shows to the user
  if (isLoading) {
    return <LoadingOverlay visible={isLoading} overlayBlur={2} />
  }

  if (isError) {
    showNotification({
<<<<<<< Updated upstream
      title: "Cannot fetching service Data",
=======
      title: "Cannot fetching Service Data",
>>>>>>> Stashed changes
      message: "Check internet connection",
      color: "red",
      icon: <IconX />,
      autoClose: 1500,
    });
  }


  // table
  return (
    <div>
      {/* items edit model */}
      <Modal
        opened={editOpened}
        onClose={() => {
          editForm.reset();
          setEditOpened(false);
        }}
        title="Update Service Record"
<<<<<<< Updated upstream
        style={{ marginLeft: '120px' }} 
=======
        style={{ margin: "130px" }}
>>>>>>> Stashed changes
      >
        <form onSubmit={editForm.onSubmit((values) => updateRequestedStocks(values))}>
          <TextInput
            withAsterisk
            label="Service ID"
            required
            disabled
            {...editForm.getInputProps("stock_id")}
          />
          <TextInput
            label="Service"
            placeholder="Enter Service"
            {...editForm.getInputProps("batry_brand")}
            required
          />
          <TextInput
            label="Service description"
            placeholder="Enter Service Description"
            {...editForm.getInputProps("Battery_description")}
            required
          />
          
          <TextInput
            label="Price"
            placeholder="Enter Price of a battery"
            {...editForm.getInputProps("sellingPrice")}
            required
          />
          
          
          <Button
            color="blue"
            sx={{ marginTop: "10px", width: "100%" }}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Modal>
      {/* search bar */}
      
      <Text fw={700} fz={30} style={{ textAlign: "center" }}>Pending Services</Text>

      <ScrollArea
        w={"100mw"}
        h={600}
        mb={70}
        mt={50}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table
          highlightOnHover
<<<<<<< Updated upstream
          horizontalSpacing={60}
          verticalSpacing={10}
          mt={50}
          miw={700}
          sx={{ tableLayout: "fixed" }} striped
          withBorder
          withColumnBorders
          style={{ marginLeft: '0px' }}
=======
          horizontalSpacing={70}
          verticalSpacing={15}
          miw={700}
          sx={{ tableLayout: "fixed" }} 
          striped 
          withBorder 
          withColumnBorders
>>>>>>> Stashed changes
        >
          <thead
            className={cx(classes.header, classes.tableHeader, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Service No</th>
              <th>Service</th>
              <th>Description</th>
              <th>Price</th> 
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows !== null ? rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            ) : null}
          </tbody>
        </Table>
      </ScrollArea>

    </div>
  );
};

export default StockTable;
