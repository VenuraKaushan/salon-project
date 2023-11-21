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
  Image,
  NumberInput,
  Badge,
} from '@mantine/core';
import {
  IconSearch,
  IconCheck,
  IconX,
  IconPlus,
  IconEdit,
  IconFileBarcode,
  IconMinus,
  IconUpload,
  IconPhoto,
} from '@tabler/icons-react';
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  DropzoneProps,
  FileWithPath,
} from "@mantine/dropzone";
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import ProductsAPI from '../../API/productsAPI/products.api';
import { useQuery } from '@tanstack/react-query';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ProductPDF } from '../PDFRender/productPDF';
import { DateInput } from '@mantine/dates';

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

interface ProductData {
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

interface ProductEditData {
  _id: string;
  product_id: string;
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
  const [opened, setOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  //image upload
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, setLoading] = useState(false);
  
  //get details by id
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  let imageUrl: string;
  const previews = files.map((file, index) => {
    imageUrl = URL.createObjectURL(file);

    return (
      <Group position="center">
        <Image
          src={imageUrl}
          key={index}
          width={"auto"}
          height={150}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      </Group>
    );
  });

  const convertBase64 = () => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files[0]);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
    });
  };

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
      image: '',
    },
  });

  //add product
  const addProduct = async () => {
    try {
      setLoading(true);
  
      if (files.length === 0) {
        showNotification({
          id: 'Add Product',
          title: 'File not uploaded',
          message: 'Please upload an image for the product',
          color: 'red',
          icon: <IconX />,
          autoClose: 2500,
        });
  
        setLoading(false);
        return;
      }
  
      const base64 = await convertBase64();
      const productData = productForm.values;
  
      ProductsAPI.addProduct({
        ...productData,
        image: base64,
      }).then((res) => {
        setLoading(false);
  
        showNotification({
          id: 'Add Product',
          title: 'Product record added',
          message: 'Product record has been added successfully',
          color: 'teal',
          icon: <IconCheck />,
          autoClose: 2500,
        });
  
        URL.revokeObjectURL(imageUrl);
        setFiles([]);
        productForm.reset();
        setOpened(false);
        refetch(); // Refresh the data
      });
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
  
  //update product
  const updateProduct = async (values: ProductEditData) => {
    try {
      showNotification({
        id: 'update-Product',
        loading: true,
        title: 'Updating Product record',
        message: 'Please wait while we update Product record..',
        autoClose: false,
      });

      // Ensure to include the image data when updating the product
      const base64 = await convertBase64();

      ProductsAPI.updateProduct({
        ...values,
        image: base64,
      }).then((response) => {
        updateNotification({
          id: 'update-Product',
          color: 'teal',
          icon: <IconCheck />,
          title: 'Product updated successfully',
          message: 'Product data updated successfully.',
          autoClose: 5000,
        });

        productForm.reset();
        setEditOpened(false);

        // Getting updated items from the database
        refetch();
      });
    } catch (error) {
      updateNotification({
        id: 'update-Product',
        color: 'red',
        title: 'Product updating failed',
        icon: <IconX />,
        message: 'We were unable to update the Product',
        autoClose: 5000,
      });
    }
  };


    // Function to fetch product details by ID
    const getProductDetails = async (productId: string) => {
      try {
        const response = await ProductsAPI.getProductById({ _id: productId });
        setSelectedProduct(response.data);
      } catch (error) {
        // Handle errors or show a notification
        console.log(error);
      }
    };
  
    // Function to reset the selected product when the modal is closed
    const resetSelectedProduct = () => {
      setSelectedProduct(null);
    };

   // Function to handle reducing stock quantity
   const handleUseProduct = (productId: string, currentQuantity: number) => {
    const updatedQuantity = currentQuantity - 1;

    ProductsAPI.updateUseProduct({
      _id: productId,
      product_id: "", 
      quantity: updatedQuantity.toString(), 
    })
      .then((response) => {
        updateNotification({
          id: "update-Product",
          color: "teal",
          icon: <IconCheck />,
          title: "Product updated successfully",
          message: "Product data updated successfully.",
          autoClose: 5000,
        });
        refetch();
      })
      .catch((error) => {
        updateNotification({
          id: "update-Product",
          color: "red",
          title: "Product updating failed",
          icon: <IconX />,
          message: "We were unable to update the Product",
          autoClose: 5000,
        });
      });
  }
  // Function to handle reducing stock quantity
  // const handleUseProduct = (productId: string, currentQuantity: number) => {
  //   // You can add your logic here to reduce the quantity
  //   // For example, you can make an API request to update the quantity
  //   const updatedQuantity = currentQuantity - 1;

  //   // Update the quantity in the database or API
  //   ProductsAPI.updateUseProduct({
  //     _id: productId,
  //     quantity: updatedQuantity, // Assuming quantity is a string in your data
  //   })
  //     .then((response) => {
  //       updateNotification({
  //         id: "update-Product",
  //         color: "teal",
  //         icon: <IconCheck />,
  //         title: "Product updated successfully",
  //         message: "Product data updated successfully.",
  //         autoClose: 5000,
  //       });

  //       // Refresh the data after updating
  //       refetch();
  //     })
  //     .catch((error) => {
  //       updateNotification({
  //         id: "update-Product",
  //         color: "red",
  //         title: "Product updating failed",
  //         icon: <IconX />,
  //         message: "We were unable to update the Product",
  //         autoClose: 5000,
  //       });
  //     });
  // };

  
 // // Add this function to calculate the availability percentage
  // function calculateAvailabilityPercentage(quantity: number) {
  //   // Define a threshold for what is considered "available"
  //   const availableThreshold = 10; 

  //   // Calculate the percentage
  //   const percentage = (quantity / availableThreshold) * 100;

  //   // Ensure the percentage is within the range [0, 100]
  //   return Math.min(100, Math.max(0, percentage));
  // } 

  //searching data
  const filteredData = data.filter((product: Data) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) 

  );

  const daysDifference = (date1: Date, date2: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
    return diffDays;
  };

  const rows = Array.isArray(filteredData)
    ? filteredData?.map((row: any) => (
        <tr key={row._id}>
          <td>
            <Text size={15}>{row.product_id}</Text>
          </td>
          <td>
            <Image height={"5vh"} width={"8vh"} src={row.image}/>
          </td>
          <td>
            <Text size={15}>{row.code}</Text>
          </td>
          <td>
            <Text
              size={15}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => getProductDetails(row._id)}
            >
              {row.name}
            </Text>
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
          {/* <td>
            <Text size={15}>{row.price}</Text>
          </td>
          <td>
            <Text size={15}>{row.price}</Text>
          </td> */}
          <td>
            <Text size={15}>{row.quantity}</Text>
          </td>
          <td>
          {/* Use button to reduce quantity */}
          
              <>
                <Group spacing={"sm"}>
                  {/* edit button */}
                  <Tooltip label="Use Product">
                    <ActionIcon
                      style={{ marginLeft: '10px', backgroundColor: 'red', borderRadius: '50%', padding: '5px' }}
                      onClick={() => handleUseProduct(row._id, Number(row.quantity))}
                    >
                      <IconMinus 
                      style={{ color: 'white'  }}
                      size={30} />
                    </ActionIcon>
                  </Tooltip>

                </Group>
              </>
        </td>
          {/* <td>
            <Text size={15}></Text>
          </td> */}
          <td>
            <Text size={15}>
              {new Date(row.added_date).toLocaleDateString("en-GB").split("T")[0]}
            </Text>
          </td>
          <td>
            {daysDifference(new Date(row.expire_date), new Date()) <= 10 ? (
              <Badge variant="outline" color="red">Expires in {daysDifference(new Date(row.expire_date), new Date())} Days</Badge>
            ) : (
              <Badge variant="outline" color="green">Expires in {daysDifference(new Date(row.expire_date), new Date())} Days</Badge>
            )}
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
                        // Assuming row.added_date is a valid date string or a Date object
                        const formattedAddedDate = new Date(row.added_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        });
                        const formattedExDate = new Date(row.expire_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        });
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
                          added_date: formattedAddedDate,
                          expire_date: formattedExDate,
                          supplier: row.supplier,
                          image: row.image,
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
        <form onSubmit={productForm.onSubmit(addProduct)}>
          <TextInput
            label="Product Name"
            name="name"
            placeholder="Enter product name"
            required
            {...productForm.getInputProps('name')}
            style={{ display:'inline-block' }}
          />

          <TextInput
            name="brand"
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

          <NumberInput
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
            required
            {...productForm.getInputProps('quantity')}
          />

          <DateInput
            name="added_date"
            label="added_date"
            placeholder="Enter added_date"
            required
            {...productForm.getInputProps('added_date')}
          />

          <DateInput
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

              <Dropzone
              accept={IMAGE_MIME_TYPE}
              onDrop={(files) => setFiles(files)}
              onReject={(files) => {
                showNotification({
                  title: "File upload Error",
                  message: "try to reupload another file",
                  autoClose: 1500,
                  icon: <IconX />,
                  color: "red",
                });
              }}
              maxSize={3 * 1024 ** 2}
              maxFiles={1}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(220), pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size="3.2rem"
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size="3.2rem"
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>
  
                <div>
                  <Text size="xl" align="center">
                    Drag image here or click to select files
                  </Text>
                </div>
              </Group>
            </Dropzone>

          <Button color="blue" sx={{ marginTop: '10px', width: '100%' }} type="submit" >
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
        title="Update Product Details"
        size="30%"
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
            name="brand"
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
        
        <TextInput
            name="added_date"
            label="added_date"
            placeholder="Enter added_date"
            disabled
            {...productEditForm.getInputProps('added_date')}
          />

          <TextInput
            name="expire_date"
            label="expire_date"
            placeholder="Enter expire_date"
            disabled
            {...productEditForm.getInputProps('expire_date')}
          />

          <TextInput
            name="supplier"
            label="supplier"
            placeholder="Enter supplier"
            required
            {...productEditForm.getInputProps('supplier')}
          />
           <label htmlFor="image">Image</label>
          <Image src={productEditForm.values.image} height="15vh" width="15vh" />
           <label htmlFor="image">Change Image</label>   
          <Dropzone
              accept={IMAGE_MIME_TYPE}
              onDrop={(files) => setFiles(files)}
              onReject={(files) => {
                showNotification({
                  title: "File upload Error",
                  message: "try to reupload another file",
                  autoClose: 1500,
                  icon: <IconX />,
                  color: "red",
                });
              }}
              maxSize={3 * 1024 ** 2}
              maxFiles={1}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(220), pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size="3.2rem"
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size="3.2rem"
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>
  
                <div>
                  <Text size="xl" align="center">
                    Drag image here or click to select files
                  </Text>
                </div>
              </Group>
            </Dropzone>

          


          <Button color="blue" sx={{ marginTop: '10px', width: '100%' }} type="submit">
            Save
          </Button>
        </form>
      </Modal>

       {/* Details modal */}
       <Modal
        opened={Boolean(selectedProduct)}
        onClose={resetSelectedProduct}
        overlayProps={{
          blur: 3,
        }}
        title="Product Details"
      >
        {selectedProduct && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Text size="xl" weight={500}>
                  Product Name:
                </Text>
                <Text size="sm" weight={500}>
                  Brand:
                </Text>
                <Text size="sm" weight={500}>
                  Price:
                </Text>
                <Text size="sm" weight={500}>
                  Category:
                </Text>
              </div>
              <div>
                <Text size="xl" weight={500}>
                  {selectedProduct.name}
                </Text>
                <Text size="sm" weight={500}>
                  {selectedProduct.brand}
                </Text>
                <Text size="sm" weight={500}>
                  {selectedProduct.price}
                </Text>
                <Text size="sm" weight={500}>
                  {selectedProduct.category}
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Text size="xl" weight={500}>
                  Product Code:
                </Text>
                <Text size="sm" weight={500}>
                  Quantity:
                </Text>
                <Text size="sm" weight={500}>
                  Added Date:
                </Text>
                <Text size="sm" weight={500}>
                  Expire Date:
                </Text>
              </div>
              <div>
                <Text size="xl" weight={500}>
                  {selectedProduct.code}
                </Text>
                <Text size="sm" weight={500}>
                  {selectedProduct.quantity}
                </Text>
                <Text size="sm" weight={500}>
                {new Date(selectedProduct.added_date).toLocaleDateString("en-GB")}
                </Text>
                <Text size="sm" weight={500}>
                {new Date(selectedProduct.expire_date).toLocaleDateString("en-GB")}
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Text size="xl" weight={500}>
                  Supplier:
                </Text>
                <Text size="sm" weight={500}>
                  Description:
                </Text>
              </div>
              <div>
                <Text size="xl" weight={500}>
                  {selectedProduct.supplier}
                </Text>
                <Text size="sm" weight={500}>
                  {selectedProduct.description}
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              
              <Image src={selectedProduct.image} height="15vh" width="15vh" />
            </div>
          </div>
        )}
      </Modal>

      

      <h1>Inventory Management</h1>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextInput
          placeholder="Search by any field"
          mt={50}
          mb={50}
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          w={800}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            striped highlightOnHover withBorder withColumnBorders
          >
            <thead className={cx(classes.header, classes.tableHeader, { [classes.scrolled]: scrolled })}>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Code</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Unit Price(rs.)</th>
                {/* <th>Acutal Price(rs.)</th>
                <th>Selling Price(rs.)</th> */}
                <th>Quantity</th>
                <th>Use</th>
                {/* <th>Sold</th> */}
                <th>Added Date</th>
                <th>Expire Date</th>
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