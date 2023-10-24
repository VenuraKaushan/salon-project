import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
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
  Select,
} from '@mantine/core';
import {
  IconSearch,
  IconCheck,
  IconX,
  IconPlus,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import ProductsAPI from '../../API/productsAPI/products.api';
import { useQuery } from '@tanstack/react-query';

const useStyles = createStyles((theme) => ({
  tableHeader: {
    backgroundColor: theme.colors.gray[2],
  },
  th: {
    padding: '0 !important',
  },
  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
  header: {
    position: 'sticky',
    zIndex: 100,
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
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
  name: string;
  price: string;
  description: string;
  category: string;
  code: string;
  quantity: string;
}

const Catalog = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const {
    data = [],
    isError,
    isLoading,
    refetch,
  } = useQuery(
    ['productData'],
    () => {
      return ProductsAPI.getAllItems().then((res) => res.data);
    },
    { initialData: [] }
  );

  const productForm = useForm({
    initialValues: {
      name: '',
      price: '',
      description: '',
      category: '',
      code: '',
      quantity: '',
    },
  });

  const addProduct = async (values: Data) => {
    try {
      const response = await ProductsAPI.addProduct(values);
      showNotification({
        id: 'Add Product',
        title: 'Product record added',
        message: 'Product record has been added successfully',
        color: 'teal',
        icon: <IconCheck />,
        autoClose: 2500,
      });

      productForm.reset();
      close();
      refetch(); // Refresh the data
    } catch (error) {
      updateNotification({
        id: 'Add Product',
        title: 'Failed to add Product record',
        message: 'Failed to add Product record, please try again',
        color: 'red',
        icon: <IconX />,
        autoClose: 2500,
      });
    }
  };

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
  }

  if (isError) {
    showNotification({
      title: 'Something went wrong!',
      message: 'There was an error while fetching data',
      autoClose: 1500,
      color: 'red',
      icon: <IconX />,
    });
  }

  const rows = Array.isArray(data)
    ? data?.map((row: any) => (
        <tr key={row._id}>
          <td>
            <Text size={15}>{row.product_id}</Text>
          </td>
          <td>
            <Text size={15}>{row.code}</Text>
          </td>
          <td>
            <Text size={15}>{row.name}</Text>
          </td>
          <td>
            <Text size={15}>{row.brand}</Text>
          </td>
          <td>
            <Text size={15}>{row.category}</Text>
          </td>

          <td>
            <Text size={15}>{row.price}</Text>
          </td>
          <td>
            <Text size={15}>{row.quantity}</Text>
          </td>
        </tr>
      ))
    : null;

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
  }

  if (isError) {
    showNotification({
      title: "Something went wrong!",
      message: "There was an error while fetching data",
      autoClose: 1500,
      color: "red",
      icon: <IconX />,
    });
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          productForm.reset();
          close();
        }}
        overlayProps={{
          blur: 3,
        }}
        title="Add New Product"
      >
        <form onSubmit={productForm.onSubmit((values) => addProduct(values))}>
          <TextInput
            label="Product Name"
            name="name"
            placeholder="Enter product name"
            required
            {...productForm.getInputProps('name')}
          />

          <TextInput
            name="price"
            label="Price"
            placeholder="Enter price"
            required
            {...productForm.getInputProps('price')}
          />

          <TextInput
            name="description"
            label="Description"
            placeholder="Enter description"
            required
            {...productForm.getInputProps('description')}
          />

          <Select
            name="category"
            label="Category"
            placeholder="Select category"
            required
            data={[
              { value: 'face', label: 'Face' },
              { value: 'hair', label: 'Hair' },
              { value: 'body', label: 'Body' },
            ]}
            {...productForm.getInputProps('category')}
          />

          <TextInput
            label="Code"
            name="code"
            placeholder="Enter Code"
            required
            {...productForm.getInputProps('code')}
          />

          <TextInput
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
            required
            {...productForm.getInputProps('quantity')}
          />

          <Button color="blue" sx={{ marginTop: '10px', width: '100%' }} type="submit">
            Save
          </Button>
        </form>
      </Modal>

      <h1>Inventory Management</h1>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextInput
          placeholder="Search by any field"
          mt={50}
          mb={50}
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          w={800}
        />
        <Button leftIcon={<IconPlus size={20} />} ml={10} onClick={open}>
          Add New Product
        </Button>
      </div>

      <div>
        <ScrollArea
          w={'100mw'}
          h={600}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table
            highlightOnHover
            horizontalSpacing={30}
            verticalSpacing="lg"
            miw={700}
          >
            <thead className={cx(classes.header, classes.tableHeader, { [classes.scrolled]: scrolled })}>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {rows !== null ? (
              rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )
            ) : null}
            </tbody>
            <tbody>
              {/* Render your data here */}
            </tbody>
          </Table>
        </ScrollArea>
      </div>
    </>
  );
};

export default Catalog;
