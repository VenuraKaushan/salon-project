import { Badge, Center, Group, ScrollArea, Table, Text, TextInput } from "@mantine/core";
import { useState, useMemo } from "react";
import { IconSearch, IconTicketOff } from '@tabler/icons-react';
import { useQuery } from "@tanstack/react-query";
import InvoiceAPI from "../../API/InvoiceAPI/Invoice.api";


export const CompleteAppointment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    // specific appointment details
    const [appointmentInfo, setAppointmentInfo] = useState({
        _id: "",
        aptid: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        time: "",
        date: "",
        serviceType: "",
        status: "",
        workr: "",
        serviceCharge: "",
    });

    //use react query and fetch appointment data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery(
        ["nonHideInvoice"],
        () => {
            return InvoiceAPI.getNonHideInvoice().then((res) => res.data);
        },
        { initialData: [] }
    );

    // Filter invoice based on search term
    const filteredInvoice = useMemo(() => {
        return data.filter((appointment: any) => {
            const searchString = `${appointment.clientName} ${appointment.clientEmail} ${appointment.clientPhone} ${appointment.time} ${new Date(appointment.date).toLocaleDateString("en-CA")} ${appointment.serviceType} ${appointment.status} ${appointment.id} ${appointment.workr} ${appointment.serviceCharge}`.toLowerCase();

            // Check if any part of the searchString includes the searchTerm
            return searchString.includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm]);


    // generate appointment table body
    const rows =
        filteredInvoice.length > 0 ? (
            filteredInvoice.map((invoice: any) => (
                <tr
                // key={appointment._id}
                // onClick={() => {
                //     setAppointmentInfo({
                //         _id: appointment._id,
                //         aptid: appointment.id,
                //         clientName: appointment.clientName,
                //         clientEmail: appointment.clientEmail,
                //         clientPhone: appointment.clientPhone,
                //         time: appointment.time,
                //         date: new Date(appointment.date).toLocaleDateString("en-CA"),
                //         serviceType: appointment.serviceType,
                //         status: appointment.status,
                //         workr: appointment.workr,
                //         serviceCharge: appointment.serviceCharge,
                //     });
                // }}
                // style={{ cursor: "pointer" }}
                >
                    <td>
                        {
                            <Badge
                                color={"COMPLETE" ? "teal" : "orange"}
                                variant="light"
                            >
                                COMPLETED
                            </Badge>
                        }
                    </td>
                    <td>{invoice.cusName}</td>
                    <td>{invoice.cusEmail}</td>
                    <td>{invoice.cusPhone}</td>
                    <td>{invoice.appointmentTime}</td>
                    <td>{new Date(invoice.appointmentDate).toLocaleDateString("en-CA")}</td>
                    <td>{invoice.serviceType}</td>
                    <td>{invoice.workr}</td>
                    <td>{invoice.totalSoldPrice}</td>

                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={10}>
                    <>
                        <Center mt={60}>
                            <IconTicketOff size={100} color="gray" opacity={0.2} />
                        </Center>
                        <Text align="center" weight={"bold"} size={30} pb={70}>
                            You haven't Any Completed appointment yet!
                        </Text>
                    </>
                </td>
            </tr>
        );
    return (
        <div>
            <Text fw={700} fz={30} style={{ textAlign: "center" }}>Completed Appointments</Text>

            <Group spacing={"md"}>
                <Center ml={140}>
                    <TextInput
                        mt={50}
                        icon={<IconSearch size={15} />}
                        placeholder="Search..."
                        size="xs"
                        style={{
                            width: '900px', // Increase length
                            padding: '10px', // Add margin to the bottom
                        }}
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.currentTarget.value)}

                    />
                </Center>

                <ScrollArea h={500} w={"100%"}>
                    <Table striped highlightOnHover withBorder withColumnBorders >
                        <thead>
                            <tr>
                                <th>Appointment Status</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Phone </th>
                                <th>Appointment Time</th>
                                <th>Appointment Date</th>
                                <th>Service Type</th>
                                <th>Worker Name</th>
                                <th>Service Charge</th>

                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Group>


        </div>
    )

}