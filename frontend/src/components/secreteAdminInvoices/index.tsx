import { Badge, Box, Center, Group, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import InvoiceAPI from '../../API/InvoiceAPI/Invoice.api';
import { IconSearch, IconTicketOff } from '@tabler/icons-react';


export const SecreteAdminInvoices = () => {

    //use react query and fetch invoice data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery(
        ["invoiceData"],
        () => {
            return InvoiceAPI.getAllInvoiceBySecretAdmin().then((res) => res.data);
        },
        { initialData: [] }
    );

    console.log(data)
    //generate invoice table body
    const rows =
        data.length > 0 ? (
            data.map((invoice: any) => (
                <tr
                    key={invoice._id}
                    onClick={() => {
                        // setAppointmentInfo({
                        //     _id: appointment._id,
                        //     aptid: appointment.id,
                        //     clientName: appointment.clientName,
                        //     clientEmail: appointment.clientEmail,
                        //     clientPhone: appointment.clientPhone,
                        //     time: appointment.time,
                        //     date: new Date(appointment.date).toLocaleDateString("en-CA"),
                        //     serviceType: appointment.serviceType,
                        //     status: appointment.status,
                        // });


                        //setAssignWorkerModalOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <td>
                        {invoice.isHide === false ? (
                            <Badge color="teal" variant="light">
                                Not hide
                            </Badge>
                        ) : (
                            <Badge color="orange" variant="light">
                                Hide
                            </Badge>
                        )}
                    </td>

                    <td>{invoice.invoice_id}</td>
                    <td>{invoice.cusName}</td>
                    <td>{invoice.cusEmail}</td>
                    <td>{invoice.cusPhone}</td>
                    <td>{new Date(invoice.issuedDate).toLocaleDateString("en-CA")}</td>
                    <td>{invoice.totalSoldPrice}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={8}>
                    <>
                        <Center mt={60}>
                            <IconTicketOff size={100} color="gray" opacity={0.2} />
                        </Center>
                        <Text align="center" weight={"bold"} size={30} pb={70}>
                            You haven't Any Invoices yet!
                        </Text>
                    </>
                </td>
            </tr>
        );

    return (
        <>
            <Text fw={700} fz={30} style={{ textAlign: "center" }}>All Invoices</Text>
            {/* search bar */}
            <Group spacing={"md"}>
                <TextInput
                    icon={<IconSearch size={15} />}
                    placeholder="Search..."
                    size="xs"
                    style={{
                        width: '750px', // Increase length
                        padding: '10px',
                        marginLeft: '160px' // Add margin to the bottom
                    }}
                    mt={50}
                // value={searchTerm}
                // onChange={(event) => setSearchTerm(event.currentTarget.value)}
                />
                <ScrollArea h={500} w={"100%"}>
                    <Table striped highlightOnHover withBorder withColumnBorders >
                        <thead>
                            <tr>
                                <th>Invoice Status</th>
                                <th>Invoice ID</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Phone </th>
                                <th>Issued Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Group>
        </>
    )
}