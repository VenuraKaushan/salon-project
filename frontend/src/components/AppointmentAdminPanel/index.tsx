import { Badge, Button, Center, Group, Modal, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { IconSearch, IconTicketOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import {
    IconX,
    IconCheck,
    IconCalendar,
    IconClock,
} from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import AdminAPI from '../../API/adminAPI/admin.api';

export const Appointments = () => {
    const [appointmentOpended, setAppointmentOpended] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [dateModalOpened, setDateModalOpened] = useState(false);
    const [appointmentTime, setAppointmentTime] = useState([]); // Initialize with an empty array
    const [selectedDate, setSelectedDate] = useState(""); // Add selectedDate state
    const [timeSlotOpened, setTimeSlotOpened] = useState(false);


    // specific ticket details
    const [appointmentInfo, setAppointmentInfo] = useState({
        id: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        time: "",
        date: "",
        serviceType: "",
        status: "",
    });

    //declare add appointment form
    const appointmentForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            time: selectedTimeSlot,
            serviceType: "",

        },
    });

    //declare add date form
    const dateForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            date: "",

        },
    });

    //use react query and fetch FAQ data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery(
        ["appointmentData"],
        () => {
            return AdminAPI.getAllAppointmentsByAdmin().then((res) => res.data);
        },
        { initialData: [] }
    );

    useEffect(() => {
        appointmentForm.setFieldValue("time", selectedTimeSlot);
    }, [selectedTimeSlot]);

    // Function to open the appointment modal
    const openAppointmentModal = () => {
        setAppointmentOpended(true);
        setTimeSlotOpened(false);

        console.log(selectedTimeSlot)
    };

    // Function to open the modal
    const openDateModal = () => {
        setDateModalOpened(true);
    };

    //add appointment as admin
    const addAppointment = (values: {
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        time: String,
        serviceType: string,
    }) => {
        console.log(values.time)
        showNotification({
            id: "Add client details",
            loading: true,
            title: "Adding Your record",
            message: "Please wait while we add Your record..",
            autoClose: false,
        });
        AdminAPI.addAppintmentAsAdmin({
            ...values,
            date: selectedDate,
        })
            .then((Response) => {
                updateNotification({
                    id: "Add client details",
                    color: "teal",
                    title: "Adding Your record",
                    message: "Please wait while we add Your record..",
                    icon: <IconCheck />,
                    autoClose: 2500,
                });

                appointmentForm.reset();
                setAppointmentOpended(false);

            })
            .catch((error) => {
                updateNotification({
                    id: "Add appointment",
                    color: "red",
                    title: "Something went wrong!",
                    message: "There is a problem when adding Client appointment",
                    icon: <IconX />,
                    autoClose: 2500,
                });
            });
    }

    const checkDate = (values: {
        date: string,
    }) => {
        if (!values.date) {
            // Show an error notification or provide user feedback that a date should be selected.
            showNotification({
                id: "Missing Date",
                color: "red",
                title: "Missing Date",
                message: "Please select a date before checking available time slots.",
                icon: <IconX />,
                autoClose: 2500,
            });
            return;
        }

        showNotification({
            id: "Check appointment date",
            loading: true,
            title: "Checking Date",
            message: "Please wait while we Check the date..",
            autoClose: false,
        });
        AdminAPI.checkDate(values)
            .then((Response) => {
                updateNotification({
                    id: "Check appointment date",
                    color: "teal",
                    title: "Here free time slots are available",
                    message: "Time slot retrieved successfully..",
                    icon: <IconCheck />,
                    autoClose: 2500,
                });

                dateForm.reset();
                setDateModalOpened(false);
                setAppointmentTime(Response.data.free);

                // Store the selected date in the state
                setSelectedDate(values.date);

                // Open the timeSlotOpened modal only if a date has been selected
                setTimeSlotOpened(true);


            })
            .catch((error) => {
                updateNotification({
                    id: "Check appointment date",
                    color: "red",
                    title: "Something went wrong!",
                    message: "There is a problem when Checking the date for appointment",
                    icon: <IconX />,
                    autoClose: 2500,
                });
            });
    }

    // generate appointment table body
    const rows =
        data.length > 0 ? (
            data.map((appointment: any) => (
                <tr
                    key={appointment._id}
                    onClick={() => {
                        setAppointmentInfo({
                            id: appointment.id,
                            clientName: appointment.clientName,
                            clientEmail: appointment.clientEmail,
                            clientPhone: appointment.clientPhone,
                            time: appointment.time,
                            date: new Date(appointment.date).toLocaleDateString("en-CA"),
                            serviceType: appointment.serviceType,
                            status: appointment.status,
                        });

                        // open ticket modal
                        // setTicketOpened(true);
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
                            You haven't Any appointment yet!
                        </Text>
                    </>
                </td>
            </tr>
        );

    return (
        <div>

            {/* admin add appointment modal */}
            <Modal
                opened={appointmentOpended}
                onClose={() => setAppointmentOpended(false)}
                size={"50%"}
            >
                <form
                    onSubmit={appointmentForm.onSubmit((values) => addAppointment(values))}
                >
                    <Text fw={700} style={{ textAlign: "center" }}>Enter Customer's details</Text>

                    <TextInput
                        placeholder="Enter Full Name"
                        label="Full Name"
                        {...appointmentForm.getInputProps("clientName")}
                        radius="lg"
                        withAsterisk
                        required
                    />
                    <TextInput
                        placeholder="Enter Working Email"
                        label="Email"
                        {...appointmentForm.getInputProps("clientEmail")}
                        radius="lg"

                    />
                    <TextInput
                        placeholder="Enter Phone number"
                        label="Phone Number"
                        {...appointmentForm.getInputProps("clientPhone")}
                        radius="lg"
                        withAsterisk
                        required
                    />

                    <TextInput
                        placeholder="Enter Service type"
                        label="Service type"
                        {...appointmentForm.getInputProps("serviceType")}
                        radius="lg"
                    />

                    <Button color="blue" radius="lg" type="submit"
                        style={{ marginLeft: "250px", marginTop: '10px' }}
                    >
                        Add appointment
                    </Button>
                </form>
            </Modal>

            {/* date picker modal */}
            <Modal
                opened={dateModalOpened}
                onClose={() => setDateModalOpened(false)}
                title="Appointment Date"
                size="50%"

            >
                <form
                    onSubmit={dateForm.onSubmit((values) => checkDate(values))}
                >

                    <DateInput
                        placeholder="Adding date"
                        label="Select date You want to book"
                        valueFormat="YYYY MMM DD"
                        withAsterisk
                        minDate={new Date()} // Set the minimum date to today
                        radius="xl"
                        icon={<IconCalendar size={16} />}
                        {...dateForm.getInputProps("date")}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button color="blue" radius="lg" type="submit"
                        style={{ marginLeft: "280px", marginTop: '10px' }}
                    >
                        Check
                    </Button>
                </form>
            </Modal>

            {/* free time slot modal */}
            <Modal
                opened={timeSlotOpened}
                onClose={() => setTimeSlotOpened(false)}
                title="Available Time Slots"
                size="50%"
            >
                <Text fw={600} style={{ textAlign: "left" }}>To add an appointment click top of the time you want</Text>
                <ScrollArea h={450}>
                    <Table striped highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>Time Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointmentTime.length > 0 ? (
                                appointmentTime.map((timeSlot: any) => (
                                    <tr
                                        key={timeSlot}
                                        onClick={() => {
                                            setSelectedTimeSlot(timeSlot); // Set the selected time slot
                                            openAppointmentModal(); // Open the appointment modal
                                        }}
                                    >
                                        <td>{timeSlot}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={1}>
                                        <Text align="center" weight={"bold"} size={20} pb={70}>
                                            No Time slots available!
                                        </Text>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </Table>

                </ScrollArea>
            </Modal>
            <Text fw={700} fz={30} style={{ textAlign: "center" }}>Appointments Management</Text>

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
                <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                    onClick={openDateModal}

                >Add Appointment</Button>

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
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Group>

        </div >
    )
}