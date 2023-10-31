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
  Tooltip,
  ActionIcon,
  Progress, 
  Box,
  FileInput,
} from '@mantine/core';
import {
  IconSearch,
  IconCheck,
  IconX,
  IconPlus,
  IconEdit,
  IconFileBarcode,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import ProductsAPI from '../../API/productsAPI/products.api';
import { useQuery } from '@tanstack/react-query';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ProductPDF } from '../PDFRender/productPDF';

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
  brand: string;
  price: string;
  description: string;
  category: string;
  code: string;
  quantity: string;
  added_date: string;
  expire_date: string;
  supplier: string;
  image: string;
}

const Catalog = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  // const [opened, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);

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

  //define form for adding   
  const productForm = useForm({
    initialValues: {
      name: '',
      brand: '',
      price: '',
      description: '',
      category: '',
      code: '',
      quantity: '',
      added_date:'',
      expire_date:'',
      supplier:'',
      image: '',
    },
  });

  //define form for editing
  const productEditForm = useForm({
    initialValues: {
      _id: '',
      product_id: '',
      name: '',
      brand: '',
      price: '',
      description: '',
      category: '',
      code: '',
      quantity: '',
      added_date:'',
      expire_date:'',
      supplier:'',
    },
  });

  //add product
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
      setOpened(false);
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

  //edit product details
  const updateProduct = async (values: {
        _id: string;
        product_id: string;
        name: string;
        brand: string;
        price: string;
        description: string;
        category: string;
        code: string;
        quantity: string;
        added_date:string;
        expire_date:string;
        supplier:string;
  }) => {
    showNotification({
      id: "update-Product",
      loading: true,
      title: "Updating Product record",
      message: "Please wait while we update Product record..",
      autoClose: false,
    });
    ProductsAPI.updateProduct(values)
      .then((response) => {
        updateNotification({
          id: "update-Product",
          color: "teal",
          icon: <IconCheck />,
          title: "Product updated successfully",
          message: "Product data updated successfully.",
          //icon: <IconCheck />,
          autoClose: 5000,
        });
        productForm.reset();
        setEditOpened(false);

        //getting updated items from database
        refetch();
      })
      .catch((error) => {
        updateNotification({
          id: "update-Product",
          color: "red",
          title: "Product updating failed",
          icon: <IconX />,
          message: "We were unable to update the Product",
          // icon: <IconAlertTriangle />,
          autoClose: 5000,
        });
      });
  };

  // Add this function to calculate the availability percentage
  function calculateAvailabilityPercentage(quantity: number) {
    // Define a threshold for what is considered "available"
    const availableThreshold = 10; 

    // Calculate the percentage
    const percentage = (quantity / availableThreshold) * 100;

    // Ensure the percentage is within the range [0, 100]
    return Math.min(100, Math.max(0, percentage));
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
            <Text size={15}>{row.price}</Text>
          </td>
          <td>
            <Text size={15}>{row.price}</Text>
          </td>
          <td>
            <Text size={15}>{row.quantity}</Text>
          </td>
          <td>
            <Text size={15}>{row.quantity}</Text>
          </td>
          <td>
            <Text size={15}>{row.added_date}</Text>
          </td>
          <td>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <div style={{ flex: 1 }}>
              <Text size={15}>{row.quantity}</Text>
            </div> */}
            <div style={{ flex: 2 }}>
              <Progress
                value={calculateAvailabilityPercentage(Number(row.quantity))}
                color={
                  calculateAvailabilityPercentage(Number(row.quantity)) >= 10
                    ? 'green'
                    : 'red'
                }
              />
            </div>
          </div>
        </td>
          <td>
            {
              <>
                <Group spacing={"sm"}>
                  {/* edit button */}
                  <Tooltip label="Edit Product">
                    <ActionIcon
                      color="teal"
                      onClick={() => {
                        productEditForm.setValues({
                          _id: row._id,
                          product_id: row.product_id,
                          name: row.name,
                          brand: row.brand,
                          price: row.price,
                          description: row.description,
                          category: row.category,
                          code: row.code,
                          quantity: row.quantity,
                        });
                        setEditOpened(true);
                      }}
                    >
                      <IconEdit size={30} />
                    </ActionIcon>
                  </Tooltip>

                </Group>
              </>
            }
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
    <Box
    sx={{justifyContent: "space-between" }}
      pos="relative"
      >
      {/* Add new product modal */}
      <Modal
        opened={opened}
        onClose={() => {
          productForm.reset();
          setOpened(false);
        }}
        overlayProps={{
          blur: 3,
        }}
        title="Add New Product"

        centered
      >
        <form onSubmit={productForm.onSubmit((values) => addProduct(values))}>
          <TextInput
            label="Product Name"
            name="name"
            placeholder="Enter product name"
            required
            {...productForm.getInputProps('name')}
            style={{ display:'inline-block' }}
          />

          <TextInput
            name="barnd"
            label="Brand Name"
            placeholder="Enter brand name"
            required
            {...productForm.getInputProps('brand')}
            style={{ display:'inline-block', marginLeft:'10px', width:'50%' }}
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

            <TextInput
            name="added_date"
            label="added_date"
            placeholder="Enter added_date"
            required
            {...productForm.getInputProps('added_date')}
          />

<TextInput
            name="expire_date"
            label="expire_date"
            placeholder="Enter expire_date"
            required
            {...productForm.getInputProps('expire_date')}
          />

<TextInput
            name="supplier"
            label="supplier"
            placeholder="Enter supplier"
            required
            {...productForm.getInputProps('supplier')}
          />

          <FileInput 
          label="Upload Image" 
          placeholder="Upload files"
          accept="image/*" 
          required
          {...productForm.getInputProps('image')}
          />

          <Button color="blue" sx={{ marginTop: '10px', width: '100%' }} type="submit">
            Save
          </Button>
        </form>
      </Modal>

      {/* Edit product modal */}
      <Modal
        opened={editOpened}
        onClose={() => {
          productEditForm.reset();
          setEditOpened(false);
        }}
        overlayProps={{
          blur: 3,
        }}
        title="Add New Product"
      >
        <form onSubmit={productEditForm.onSubmit((values) => updateProduct(values))}>
        <TextInput
            label="Product Id"
            name="product_id"
            disabled
            {...productEditForm.getInputProps('product_id')}
          />
          <TextInput
            label="Product Name"
            name="name"
            placeholder="Enter product name"
            required
            {...productEditForm.getInputProps('name')}
          />

          <TextInput
            name="barnd"
            label="Brand Name"
            placeholder="Enter brand name"
            required
            {...productEditForm.getInputProps('brand')}
          />

          <TextInput
            name="price"
            label="Price"
            placeholder="Enter price"
            required
            {...productEditForm.getInputProps('price')}
          />

          <TextInput
            name="description"
            label="Description"
            placeholder="Enter description"
            required
            {...productEditForm.getInputProps('description')}
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
            {...productEditForm.getInputProps('category')}
          />

          <TextInput
            label="Code"
            name="code"
            placeholder="Enter Code"
            required
            {...productEditForm.getInputProps('code')}
          />

          <TextInput
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
            required
            {...productEditForm.getInputProps('quantity')}
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
        <Button leftIcon={<IconPlus size={20} />} ml={10} onClick={()=>setOpened(true)}>
          Add New Product
        </Button>
        <PDFDownloadLink
              document={<ProductPDF data={data} />}
              fileName={`Product Report ${new Date().toLocaleDateString()}`}
            >
              <Button
                variant="outline"
                ml={10}
                leftIcon={<IconFileBarcode size={20} />}
              >
                Generate Report
              </Button>
        </PDFDownloadLink>
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
            sx={{ tableLayout: "fixed" }}
          >
            <thead className={cx(classes.header, classes.tableHeader, { [classes.scrolled]: scrolled })}>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Total Price(rs.)</th>
                <th>Acutal Price(rs.)</th>
                <th>Selling Price(rs.)</th>
                <th>Quantity</th>
                <th>Sold</th>
                <th>Added Date</th>
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
    </Box>
  );
};

export default Catalog;
