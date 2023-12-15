import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Box, Group, Text, Button, Table, Image } from "@mantine/core";
import logo from "../../assets/shopLogo.png";

const InvoiceTemplate = (props: any) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [data, setData] = useState(props.data);

  // format number to SL rupee
  let rupee = new Intl.NumberFormat("ta-LK", {
    style: "currency",
    currency: "LKR",
  });

  const rows = data.items.map((item: any) => (
    <tr id={item._id}>
      <td>{item.brand}</td>
      <td>{rupee.format(item.price)}</td>
      <td>{item.quantity}</td>
      <td>{rupee.format(item.totalPrice)}</td>
    </tr>
  ));
  console.log(data);
  return (
    <>
      <Box ref={componentRef} p={30} mb={30}>
        <Text size={30} weight={500} align="center" mb={50} mt={-40}>
          Invoice
        </Text>

        <Group position="left">
<<<<<<< Updated upstream
          <Image
            src={logo}
            width={200}
            height={200}
            style={{ marginLeft: "40px" }}
          />
=======
          <Image src={logo} width={180} height={180} mb={-80} ml={40}/>
>>>>>>> Stashed changes
        </Group>

        <Text size="md" weight={500} align="right" mb={-20}>
          Shop Name
        </Text>
        <br />
        <Text size="sm" align="right" mb={-20}>
          Malabe,Colombo
        </Text>
        <br />
        <Text size="sm" align="right" mb={-20}>
          shopname@gmail.com
        </Text>
        <br />
        <Text size="sm" align="right">
          011-1234567
        </Text>
        <br />

        <Text size="md" weight={500} align="left" mb={-20}>
          {data.cusName}
        </Text>
        <br />
        <Text size="sm" align="left" mb={-20}>
          {data.cusPhone}
        </Text>
        <br />
        <Text size="sm" align="left" mb={-20}>
          {data.cusAddress}
        </Text>
        <br />
        <Text size="sm" align="left">
          {new Date(data.issuedDate).toLocaleDateString("en-GB").split("T")[0]}
        </Text>
        <br />

        <Table horizontalSpacing={30} verticalSpacing="md" mt={10}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            {data.discount !== 0 ? (
              <tr>
                <td colSpan={3}>
                  <Text align="center" weight={500}>
                    DISCOUNT
                  </Text>
                </td>
                <td>
                  <Text color="gray">{rupee.format(data.discount)}</Text>
                </td>
              </tr>
            ) : null}
            <tr>
              <td colSpan={3}>
                {" "}
                <Text align="center" weight={500}>
                  TOTAL
                </Text>
              </td>
              <td style={{ borderBottom: "1px double black" }}>
                <Text weight={500}>{rupee.format(data.totalSoldPrice)}</Text>
              </td>
            </tr>
          </tbody>
        </Table>
        
        <Text mt={40} size={"lg"} weight={400} align="center" style={{ color: "red" }}>
          All The Vat & Tax Are Includeed In Total Price
        </Text>
        <Text mt={40} size={"lg"} weight={600} align="center">
          Thank You!
        </Text>
      </Box>
      <Group grow>
        <Button onClick={handlePrint}>Print</Button>
      </Group>
    </>
  );
};

export default InvoiceTemplate;
