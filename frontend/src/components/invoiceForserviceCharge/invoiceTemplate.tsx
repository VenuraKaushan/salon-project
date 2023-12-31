import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Box, Group, Text, Button, Table, Image } from "@mantine/core";

const InvoiceTemplate = (props: any) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [data, setData] = useState(props.data);

  console.log(data);

  // format number to SL rupee
  let rupee = new Intl.NumberFormat("ta-LK", {
    style: "currency",
    currency: "LKR",
  });

  const rows = data.items?.map((item: any) => (
    <tr id={item._id}>
      <td>{item.brand}</td>
      <td>{item.warranty}</td>
      <td>{rupee.format(item.price)}</td>
      <td>{item.quantity}</td>
      <td>{rupee.format(item.totalPrice)}</td>
    </tr>
  ));
  console.log(data);
  return (
    <>
      <Box ref={componentRef} p={30} mb={30}>
        <Group position="left">
          {/* <Image src={logo} width={280} height={80} /> */}
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
          {data.clientName}
        </Text>
        <br />
        <Text size="sm" align="left" mb={-20}>
          {data.clientPhone}
        </Text>
        <br />
        <Text size="sm" align="left" mb={-20}>
          {data.clientEmail}
        </Text>
        <br />
        <Text size="sm" align="left">
          {new Date(data.issuedDate).toLocaleDateString("en-GB").split("T")[0]}
        </Text>
        <br />

        <Table horizontalSpacing={50} verticalSpacing="md" mt={10}>
          <thead>
            <tr>
              {/* <th>Brand</th>
              <th>Warranty</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total price</th> */}
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <td colSpan={4}>
                {" "}
                <Text align="center" weight={500}>
                  Appointment time and date
                </Text>
              </td>
              <td>
                <Text weight={500}>{data.date} at {data.time}</Text>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                {" "}
                <Text align="center" weight={500}>
                  Service type
                </Text>
              </td>
              <td>
                <Text weight={500}>{data.serviceType}</Text>
              </td>
            </tr>
            {data.serviceCharge !== 0 ? (
              <tr>
                <td colSpan={4}>
                  <Text align="center" weight={500}>
                    Service Charge
                  </Text>
                </td>
                <td style={{ borderBottom: "1px double black" }}>
                  <Text color="gray">{rupee.format(data.serviceCharge)}</Text>
                </td>
              </tr>
            ) : null}
            <tr>
              <td colSpan={4}>
                {" "}
                <Text align="center" weight={500}>
                  TOTAL
                </Text>
              </td>
              <td>
                <Text weight={500}>{rupee.format(data.serviceCharge)}</Text>
              </td>
            </tr>
          </tbody>
        </Table>
        <Text mt={40} size={"lg"} weight={600} align="center">Thank You!</Text>
      </Box>
      <Group grow>
        <Button onClick={handlePrint}>Print</Button></Group>
    </>
  );
};

export default InvoiceTemplate;
