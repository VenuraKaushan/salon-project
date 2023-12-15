import { useQuery } from "@tanstack/react-query";
import AdminAPI from "../../API/adminAPI/admin.api";
import { useState, useEffect, useMemo } from "react";
import { Badge, Button, Center, Group, Modal, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { IconSearch, IconTicketOff } from '@tabler/icons-react';
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
    IconX,
    IconCheck,
    IconCalendar,
    IconClock,
} from "@tabler/icons-react";
import { CompleteAppointment } from "../completedAppointment";
import InvoiceTemplate from "../invoiceForserviceCharge/invoiceTemplate";
import InvoiceAPI from "../../API/InvoiceAPI/Invoice.api";

export const AssignedWorkerAppointments = () => {

    const [changeStatusOpended, setChangeStatusOpended] = useState(false);
    const [openedInvoiceModal, setOpenedInvoiceModal] = useState(false);
    const [invoiceData, setInvoiceData] = useState({});
    const [charge, setCharge] = useState("")
    // show the loading overlay when adding invoice to the database
    const [invoiceOverlay, setInvoiceOverlay] = useState(false);
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
    });

    //declare add service charge form
    const addServiceChargeForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            amount: "",
        }
    })

    //use react query and fetch appointment data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery(
        ["assignedAppointmentData"],
        () => {
            return AdminAPI.getAllAssignedAppointmentsByAdmin().then((res) => res.data);
        },
        { initialData: [] }
    );

    // Filter PENDING and COMPLETE tickets
    const pendingAppointment = data.filter((appointment: any) => appointment.status === "PENDING");

    // Filter appointments based on search term
    const filteredAppointments = useMemo(() => {
        return pendingAppointment.filter((appointment: any) => {
            const searchString = `${appointment.clientName} ${appointment.clientEmail} ${appointment.clientPhone} ${appointment.time} ${new Date(appointment.date).toLocaleDateString("en-CA")} ${appointment.serviceType} ${appointment.status} ${appointment.id} ${appointment.workr}`.toLowerCase();

            // Check if any part of the searchString includes the searchTerm
            return searchString.includes(searchTerm.toLowerCase());
        });
    }, [pendingAppointment, searchTerm]);

    //add service charge function
    const addServiceCharge = (values: {
        _id: string,
        amount: string,
    }) => {
        AdminAPI.addServiceChargeAndChangeStatus(values)
            .then((res) => {
                showNotification({
                    id: "Add service charges",
                    title: "Adding charges record",
                    message: "Amount was submitted!",
                    autoClose: 1500,
                });


                addServiceChargeForm.reset();
                refetch();
            })
            .catch((err) => {
                updateNotification({
                    id: "Add worker",
                    color: "red",
                    title: "Something went wrong!",
                    message: "There is a problem when adding Worker",
                    icon: <IconX />,
                    autoClose: 2500,
                });
            })

    }

    // save invoice data in the database
    const saveInvoice = (values: any, amount: any) => {
        // set invoice overlay visible
        setInvoiceOverlay(true);

        // create invoice object
        const invoice = {
            clientName: values.clientName,
            clientPhone: values.clientPhone,
            clientEmail: values.clientEmail,
            issuedDate: new Date(),
            time: values.time,
            date: values.date,
            serviceType: values.serviceType,
            workr: values.workr,
            serviceCharge: amount,
        };

        // invoice modal open
        setInvoiceData(invoice);

        // open invoice modal
        setOpenedInvoiceModal(true);

        // call to the API and send back to the backend
        InvoiceAPI.addServiceInvoice(invoice)
            .then((res) => {
                // after successing the invoice saving set to overlay disappear
                setInvoiceOverlay(false);

                // refetch new Data
                refetch();

                // also show the notification
                showNotification({
                    title: "Invoice Saved Successful",
                    message: "Invoice data saved successfully",
                    autoClose: 2500,
                    color: "teal",
                    icon: <IconCheck />,
                });
            })
            .catch((error) => {
                // if error happens,

                // 1. overlay will be disappeared
                setInvoiceOverlay(false);

                // then show the error notification
                showNotification({
                    title: "Saving invoice failed",
                    message: "Something went wrong while saving invoice data",
                    autoClose: 2500,
                    color: "red",
                    icon: <IconX />,
                });
            });
    };

    // saveSecretInvoice data in the database
    const saveSecretInvoice = (values: any, amount: any) => {
        // set invoice overlay visible
        setInvoiceOverlay(true);

        // create invoice object
        const invoice = {
            clientName: values.clientName,
            clientPhone: values.clientPhone,
            clientEmail: values.clientEmail,
            issuedDate: new Date(),
            time: values.time,
            date: values.date,
            serviceType: values.serviceType,
            workr: values.workr,
            serviceCharge: amount,
        };

        // invoice modal open
        setInvoiceData(invoice);

        // open invoice modal
        setOpenedInvoiceModal(true);

        // call to the API and send back to the backend
        InvoiceAPI.saveSecretServiceInvoice(invoice)
            .then((res) => {
                // after successing the invoice saving set to overlay disappear
                setInvoiceOverlay(false);
                setChangeStatusOpended(false)

                // refetch new Data
                refetch();

                // also show the notification
                showNotification({
                    title: "Invoice Saved Successful",
                    message: "Invoice data saved successfully",
                    autoClose: 2500,
                    color: "teal",
                    icon: <IconCheck />,
                });
            })
            .catch((error) => {
                // if error happens,

                // 1. overlay will be disappeared
                setInvoiceOverlay(false);

                // then show the error notification
                showNotification({
                    title: "Saving invoice failed",
                    message: "Something went wrong while saving invoice data",
                    autoClose: 2500,
                    color: "red",
                    icon: <IconX />,
                });
            });
    };
    // generate appointment table body
    const rows =
        filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment: any) => (
                <tr
                    key={appointment._id}
                    onClick={() => {
                        setAppointmentInfo({
                            _id: appointment._id,
                            aptid: appointment.id,
                            clientName: appointment.clientName,
                            clientEmail: appointment.clientEmail,
                            clientPhone: appointment.clientPhone,
                            time: appointment.time,
                            date: new Date(appointment.date).toLocaleDateString("en-CA"),
                            serviceType: appointment.serviceType,
                            status: appointment.status,
                            workr: appointment.workr,
                        });


                        setChangeStatusOpended(true);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <td>
                        {
                            <Badge
                                color={appointment.status === "COMPLETE" ? "teal" : "orange"}
                                variant="light"
                            >
                                {appointment.status}
                            </Badge>
                        }
                    </td>
                    <td>{appointment.id}</td>
                    <td>{appointment.clientName}</td>
                    <td>{appointment.clientEmail}</td>
                    <td>{appointment.clientPhone}</td>
                    <td>{appointment.time}</td>
                    <td>{new Date(appointment.date).toLocaleDateString("en-CA")}</td>
                    <td>{appointment.serviceType}</td>
                    <td>{appointment.workr}</td>
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
                            You haven't Any Assigned Appointment yet!
                        </Text>
                    </>
                </td>
            </tr>
        );

    // useEffect to call saveInvoice after the component has rendered
    useEffect(() => {
        if (appointmentInfo._id && charge) {
            saveInvoice(appointmentInfo, charge);
        }
        const handleKeyDown = (event: any) => {
            if (event.key === 'Enter') {
                // Prevent the default behavior of the Enter key (e.g., form submission)
                event.preventDefault();

                if (appointmentInfo._id && charge) {
                    saveSecretInvoice(appointmentInfo, charge);
                }


            };

            // Add event listener for key press
            window.addEventListener('keydown', handleKeyDown);

            // Cleanup event listener on component unmount
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }



    }, [appointmentInfo, charge]);


    return (
        <div>

            {/* invoice moda */}
            <Modal
                onClose={() => {
                    // refetch the stocks data
                    refetch();
                    setOpenedInvoiceModal(false);
                }}
                opened={openedInvoiceModal}
                size={"50%"}
            >
                <InvoiceTemplate data={invoiceData} />
            </Modal>
            {/* change status and add service charges modal */}
            <Modal
                opened={changeStatusOpended}
                onClose={() => setChangeStatusOpended(false)}
                size={'50%'}

            >
                <Modal.Header>
                    <Text weight={"bold"} size={30}>
                        Appointment Details
                    </Text>
                    <Badge
                        size="lg"
                        color={appointmentInfo.status === "COMPLETE" ? "teal" : "orange"}
                    >
                        {appointmentInfo.status === "COMPLETE" ? "COMPLETE" : "PENDING"}
                    </Badge>
                </Modal.Header>

                <Modal.Body>
                    <TextInput
                        mb={10}
                        label={"Customer Name"}
                        readOnly
                        value={appointmentInfo.clientName}
                    />
                    <TextInput
                        mb={10}
                        label={"Customer Email"}
                        readOnly
                        value={appointmentInfo.clientEmail}
                    />
                    <TextInput
                        mt={20}
                        mb={10}
                        label={"Phone Number"}
                        readOnly
                        value={appointmentInfo.clientPhone}
                    />
                    <TextInput
                        mt={20}
                        mb={10}
                        label={"Booked date and Time"}
                        readOnly
                        value={`${appointmentInfo.date}  ${appointmentInfo.time}`}
                    />

                    <TextInput
                        mt={20}
                        mb={10}
                        label={"Service Name"}
                        readOnly
                        value={appointmentInfo.serviceType}
                    />

                    <TextInput
                        mt={20}
                        mb={10}
                        label={"Assign worker"}
                        readOnly
                        value={appointmentInfo.workr}
                    />

                    <TextInput
                        mt={20}
                        mb={10}
                        label={"Service charge"}
                        placeholder="Rs."
                        required
                        {...addServiceChargeForm.getInputProps("amount")}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // Prevent the default behavior of the Enter key (e.g., form submission)
                                e.preventDefault();
                                // Check if both appointmentInfo._id and charge exist
                                if (appointmentInfo._id && addServiceChargeForm.values.amount) {
                                    // Call saveInvoice with the appropriate parameters
                                    saveSecretInvoice(appointmentInfo, addServiceChargeForm.values.amount);
                                    addServiceCharge({
                                        _id: appointmentInfo._id,
                                        amount: addServiceChargeForm.values.amount,
                                    });
                                }
                            }
                        }}

                    />

                    {addServiceChargeForm.values.amount === '' && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            Amount cannot be empty
                        </div>
                    )}

                    <Center>
                        <Button
                            color="red"
                            uppercase
                            m={10}
                            onClick={() => {
                                if (!addServiceChargeForm.values.amount) {
                                    // Display an error message within the modal
                                } else {
                                    setChangeStatusOpended(false);
                                    setCharge(addServiceChargeForm.values.amount);
                                    addServiceCharge({
                                        _id: appointmentInfo._id,
                                        amount: addServiceChargeForm.values.amount,
                                    });
                                    setOpenedInvoiceModal(true)
                                }
                            }}
                        >

                            Add Amount
                        </Button>
                    </Center>
                </Modal.Body>

            </Modal>
            <Text fw={700} fz={30} style={{ textAlign: "center" }}>Assigned Appointments</Text>

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
                        mt={50}
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.currentTarget.value)}

                    />
                </Center>
                <ScrollArea h={500} w={"100%"}>
                    <Table striped highlightOnHover withBorder withColumnBorders >
                        <thead>
                            <tr>
                                <th>Appointment Status</th>
                                <th>Appointment ID</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Phone </th>
                                <th>Appointment Time</th>
                                <th>Appointment Date</th>
                                <th>Service Type</th>
                                <th>Worker Name</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Group>
        </div>
    )
}