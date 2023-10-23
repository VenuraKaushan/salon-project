import {
    Box, Button, Modal, TextInput, Text, ActionIcon
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
import { useRef } from 'react';

const ManageAppointment = () => {
    const [appointmentOpended, setAppointmentOpended] = useState(false);
    const timeInputRef = useRef<HTMLInputElement | null>(null);


    //declare add appointment form
    const appointmentForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            time: new Date(),
            date: "",
            serviceType: "",

        },
    });

    // Function to open the registration modal
    const openAppointmentModal = () => {
        setAppointmentOpended(true);
    };

    //add appointment as a guest
    const addAppointment = (values: {
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        time: Date,
        date: string,
        serviceType: string,
    }) => {
        showNotification({
            id: "Add appointment",
            loading: true,
            title: "Adding Your record",
            message: "Please wait while we add Your record..",
            autoClose: false,
        });
        AppointmentAPI.addAppointment(values)
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

    return (
        <Box>
            {/* client register modal */}
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
                    <TimeInput
                        label="Click icon to show browser picker"
                        ref={timeInputRef}
                        rightSection={
                            <ActionIcon onClick={() => timeInputRef.current?.showPicker()}>
                                <IconClock size="1rem" stroke={1.5} />
                            </ActionIcon>
                        }
                        {...appointmentForm.getInputProps("time")}

                    />

                    <DateInput
                        defaultValue={new Date()}
                        placeholder="Adding date"
                        label="Adding date"
                        valueFormat="YYYY MMM DD"
                        withAsterisk
                        {...appointmentForm.getInputProps("date")}
                        radius="xl"
                        icon={<IconCalendar size={16} />}


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
            <Button
                color="yellow"
                radius="xl"
                mx="auto"
                uppercase
                onClick={openAppointmentModal}
            >
                Add Appointment as a guest
            </Button>
        </Box>


    )
};
export default ManageAppointment;
