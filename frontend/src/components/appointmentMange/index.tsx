import {
    Box, Button, Modal, TextInput, Text, ActionIcon, ScrollArea, Table, Badge, Center
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import AppointmentAPI from '../../API/appointmentAPI';
import { useForm } from '@mantine/form';
import {
    IconX,
    IconCheck,
    IconCalendar,
    IconClock,
} from "@tabler/icons-react";
import { useState } from "react";
import { TimeInput, DateInput, DateTimePicker } from '@mantine/dates';
import { useRef, useEffect } from 'react';

const ManageAppointment = () => {
    const [appointmentOpended, setAppointmentOpended] = useState(false);
    const timeInputRef = useRef<HTMLInputElement | null>(null);
    const [dateModalOpened, setDateModalOpened] = useState(false);
    const [appointmentTime, setAppointmentTime] = useState([]); // Initialize with an empty array
    const [timeSlotOpened, setTimeSlotOpened] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [selectedDate, setSelectedDate] = useState(""); // Add selectedDate state


    //declare add date form
    const dateForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            date: "",

        },
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

    // Function to close the modal
    const closeDateModal = () => {
        setDateModalOpened(false);
    };

    //add appointment as a guest
    const addAppointment = (values: {
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        time: String,
        serviceType: string,
    }) => {
        console.log(values.time)
        showNotification({
            id: "Add appointment",
            loading: true,
            title: "Adding Your record",
            message: "Please wait while we add Your record..",
            autoClose: false,
        });
        AppointmentAPI.addAppointment({
            ...values,
            date: selectedDate,
        })
            .then((Response) => {
                updateNotification({
                    id: "Add appointment",
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
                    message: "There is a problem when adding Your appointment",
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
        AppointmentAPI.checkDate(values)
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

    return (
        <Box>
            {/* client appointment modal */}
            <Modal
                opened={appointmentOpended}
                onClose={() => setAppointmentOpended(false)}
                size={"50%"}
            >
                <form
                    onSubmit={appointmentForm.onSubmit((values) => addAppointment(values))}
                >
                    <Text fw={700} style={{ textAlign: "center" }}>Enter Your Details</Text>

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
                        withAsterisk
                        required
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
                        withAsterisk
                        required
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

            <Button
                color="yellow"
                radius="xl"
                mx="auto"
                uppercase
                onClick={openDateModal}
            >
                Add Appointment as a guest
            </Button>
        </Box>


    )
};
export default ManageAppointment;
