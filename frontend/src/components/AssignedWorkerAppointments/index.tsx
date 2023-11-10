import { useQuery } from "@tanstack/react-query";
import AdminAPI from "../../API/adminAPI/admin.api";
import { useState } from "react";
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


export const AssignedWorkerAppointments = () => {

    const [changeStatusOpended, setChangeStatusOpended] = useState(false);



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

    //use react query and fetch FAQ data
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

    //add service charge function
    const addServiceCharge=(values:{
        _id: string,
        amount: string,
    })=>{
        AdminAPI.addServiceChargeAndChangeStatus(values)
            .then((res)=>{
                showNotification({
                    id: "Add service charges",
                    title: "Adding charges record",
                    message: "Amount was submitted!",
                    autoClose: 1500,
                });


                addServiceChargeForm.reset();
                refetch();
            })
            .catch((err)=>{
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

    // generate appointment table body
    const rows =
        data.length > 0 ? (
            data.map((appointment: any) => (
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
                <td colSpan={8}>
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



    return (
        <div>
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
                                    addServiceCharge({
                                        _id: appointmentInfo._id,
                                        amount: addServiceChargeForm.values.amount,
                                    });
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
                <TextInput
                    icon={<IconSearch size={15} />}
                    placeholder="Search..."
                    size="xs"
                    style={{
                        width: '900px', // Increase length
                        padding: '10px', // Add margin to the bottom
                    }}

                />
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