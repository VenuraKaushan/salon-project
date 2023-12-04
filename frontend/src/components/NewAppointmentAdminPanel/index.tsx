import {
    Badge,
    Button,
    Center,
    Group,
    Modal,
    ScrollArea,
    Table,
    Text,
    TextInput,
    ActionIcon,
    Box
} from '@mantine/core';
import { IconSearch, IconTicketOff } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useMemo, useRef, RefObject } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import {
    IconX,
    IconCheck,
    IconCalendar,
    IconClock,
} from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { DateInput, TimeInput } from '@mantine/dates';
import AdminAPI from '../../API/adminAPI/admin.api';
import { format } from 'date-fns';


export const Appointments = () => {
    const [appointmentOpendedFromDate, setAppointmentOpendedFromDate] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [dateModalOpened, setDateModalOpened] = useState(false);
    const [appointmentTime, setAppointmentTime] = useState([]); // Initialize with an empty array
    const [selectedDate, setSelectedDate] = useState(""); // Add selectedDate state
    const [timeSlotOpened, setTimeSlotOpened] = useState(false);
    const [assignWorkerModalOpen, setAssignWorkerModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [appointmentOpendedFromTime, setAppointmentOpendedFromTime] = useState(false);
    const [timeModalOpened, setTimeModalOpened] = useState(false);
    const [freeDates, setFreeDates] = useState([]);
    const [selectedTimeForCheck, setSelectedTimeForCheck] = useState("");
    const [dateSlotOpened, setDateSlotOpened] = useState(false);
    const [selectedDateSlotForAppointment, setSelectedDateSlotForAppointment] = useState("");


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
    });

    //declare add appointment form from date
    const appointmentFormFromDate = useForm({
        validateInputOnChange: true,
        initialValues: {
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            time: selectedTimeSlot,
            serviceType: "",

        },
    });

    //declare add appointment form from time
    const appointmentFormFromTime = useForm({
        validateInputOnChange: true,
        initialValues: {
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            date : selectedDateSlotForAppointment,
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

    //declare assign worker form
    const assignWorkerForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            workerName: "",
        }
    })

    //declare add time form
    const timeForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            time: "",

        },
    });

    //use react query and fetch appointment data
    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useQuery(
        ["appointmentData"],
        () => {
            return AdminAPI.getAllNewAppointmentsByAdmin().then((res) => res.data);
        },
        { initialData: [] }
    );

    useEffect(() => {
        appointmentFormFromDate.setFieldValue("time", selectedTimeSlot);
        appointmentFormFromTime.setFieldValue("date",selectedDateSlotForAppointment);
    }, [selectedTimeSlot,selectedDateSlotForAppointment]);

    // Function to open the appointment modal from date
    const openAppointmentModalFromDate = () => {
        setAppointmentOpendedFromDate(true);
        setTimeSlotOpened(false);

        console.log(selectedTimeSlot)
    };

    // Function to open the appointment modal from time
    const openAppointmentModalFromTime = () => {
        setAppointmentOpendedFromTime(true)
        setDateSlotOpened(false);

    }

    // Function to open the date modal
    const openDateModal = () => {
        setDateModalOpened(true);
    };

    // function to open time modal
    const openTimeModal = () => {
        setTimeModalOpened(true);
    }


    // Filter appointments based on search term
    const filteredAppointments = useMemo(() => {
        return data.filter((appointment: any) => {
            const searchString = `${appointment.clientName} ${appointment.clientEmail} ${appointment.clientPhone} ${appointment.time} ${new Date(appointment.date).toLocaleDateString("en-CA")} ${appointment.serviceType} ${appointment.status} ${appointment.id}`.toLowerCase();

            // Check if any part of the searchString includes the searchTerm
            return searchString.includes(searchTerm.toLowerCase());
        });
    }, [data, searchTerm]);


    //add appointment as admin via date
    const addAppintmentAsAdminViaDate = (values: {
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
        AdminAPI.addAppintmentAsAdminViaDate({
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

                appointmentFormFromDate.reset();
                setAppointmentOpendedFromDate(false);

                refetch();

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

    //check date function
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

    //add appointment as admin via time
    const addAppintmentAsAdminViaTime = (values: {
        clientName: string,
        clientEmail: string,
        clientPhone: string,
        date: string,
        serviceType: string,
    }) => {
        console.log(values.date)
        showNotification({
            id: "Add client details",
            loading: true,
            title: "Adding Your record",
            message: "Please wait while we add Your record..",
            autoClose: false,
        });
        AdminAPI.addAppintmentAsAdminViaTime({
            ...values,
            time: selectedTimeForCheck,
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

                appointmentFormFromTime.reset();
                setAppointmentOpendedFromTime(false);

                refetch();

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
    //check time function
    const checkTime = (values: {
        time: string,
    }) => {
        console.log(values.time);
        if (!values.time) {
            // Show an error notification or provide user feedback that a time should be selected.
            showNotification({
                id: "Missing Time",
                color: "red",
                title: "Missing Time",
                message: "Please select a Time before checking available Dates.",
                icon: <IconX />,
                autoClose: 2500,
            });
            return;
        }

        showNotification({
            id: "Check appointment time",
            loading: true,
            title: "Checking time",
            message: "Please wait while we Check the time..",
            autoClose: false,
        });
        AdminAPI.checkTime(values)
            .then((Response) => {
                updateNotification({
                    id: "Check appointment time",
                    color: "teal",
                    title: "Here free dates available in thet time slot",
                    message: "Dates retrieved successfully..",
                    icon: <IconCheck />,
                    autoClose: 2500,
                });

                timeForm.reset();
                setTimeModalOpened(false);
                setFreeDates(Response.data.freeDates);
                setSelectedTimeForCheck(values.time)
                setDateSlotOpened(true)

            })
            .catch((error) => {
                updateNotification({
                    id: "Check appointment time",
                    color: "red",
                    title: "Something went wrong!",
                    message: "There is a problem when Checking the time for appointment",
                    icon: <IconX />,
                    autoClose: 2500,
                });
            });
    }

    //assign worker
    const assignWorker = (values: {
        _id: string,
        workerName: string,
    }) => {
        AdminAPI.assignWorker(values)
            .then((response) => {
                showNotification({
                    id: "Add worker",
                    title: "Adding Your record",
                    message: "Worker was submitted!",
                    autoClose: 1500,
                });

                //reset assignworker form
                assignWorkerForm.reset();
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
                        });


                        setAssignWorkerModalOpen(true);
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

            {/* appointment details modal */}
            <Modal
                opened={assignWorkerModalOpen}
                onClose={() => setAssignWorkerModalOpen(false)}
                size={"50%"}
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
                        required
                        {...assignWorkerForm.getInputProps("workerName")}
                    />

                    {assignWorkerForm.values.workerName === '' && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            Worker Name cannot be empty
                        </div>
                    )}

                    <Center>
                        <Button
                            color="red"
                            uppercase
                            m={10}
                            onClick={() => {
                                if (!assignWorkerForm.values.workerName) {
                                    // Display an error message within the modal
                                } else {
                                    setAssignWorkerModalOpen(false);
                                    assignWorker({
                                        _id: appointmentInfo._id,
                                        workerName: assignWorkerForm.values.workerName,
                                    });
                                }
                            }}
                        >

                            Assign worker
                        </Button>
                    </Center>
                </Modal.Body>
            </Modal>

            {/* admin add appointment modal FromDate*/}
            <Modal
                opened={appointmentOpendedFromDate}
                onClose={() => setAppointmentOpendedFromDate(false)}
                size={"50%"}
            >
                <form
                    onSubmit={appointmentFormFromDate.onSubmit((values) => addAppintmentAsAdminViaDate(values))}
                >
                    <Text fw={700} style={{ textAlign: "center" }}>Enter Customer's details</Text>

                    <TextInput
                        placeholder="Enter Full Name"
                        label="Full Name"
                        {...appointmentFormFromDate.getInputProps("clientName")}
                        radius="lg"
                        withAsterisk
                        required
                    />
                    <TextInput
                        placeholder="Enter Working Email"
                        label="Email"
                        {...appointmentFormFromDate.getInputProps("clientEmail")}
                        radius="lg"

                    />
                    <TextInput
                        placeholder="Enter Phone number"
                        label="Phone Number"
                        {...appointmentFormFromDate.getInputProps("clientPhone")}
                        radius="lg"
                        withAsterisk
                        required
                    />

                    <TextInput
                        placeholder="Enter Service type"
                        label="Service type"
                        {...appointmentFormFromDate.getInputProps("serviceType")}
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
                    <Center>
                        <Button color="blue" radius="lg" type="submit"

                        >
                            Check
                        </Button>
                    </Center>
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
                                            console.log(selectedTimeSlot)
                                            openAppointmentModalFromDate(); // Open the appointment modal
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


            {/* admin add appointment modal FromTime*/}
            <Modal
                opened={appointmentOpendedFromTime}
                onClose={() => setAppointmentOpendedFromTime(false)}
                size={"50%"}
            >
                <form
                    onSubmit={appointmentFormFromTime.onSubmit((values) => addAppintmentAsAdminViaTime(values))}
                >
                    <Text fw={700} style={{ textAlign: "center" }}>Enter Customer's details</Text>

                    <TextInput
                        placeholder="Enter Full Name"
                        label="Full Name"
                        {...appointmentFormFromTime.getInputProps("clientName")}
                        radius="lg"
                        withAsterisk
                        required
                    />
                    <TextInput
                        placeholder="Enter Working Email"
                        label="Email"
                        {...appointmentFormFromTime.getInputProps("clientEmail")}
                        radius="lg"

                    />
                    <TextInput
                        placeholder="Enter Phone number"
                        label="Phone Number"
                        {...appointmentFormFromTime.getInputProps("clientPhone")}
                        radius="lg"
                        withAsterisk
                        required
                    />

                    <TextInput
                        placeholder="Enter Service type"
                        label="Service type"
                        {...appointmentFormFromTime.getInputProps("serviceType")}
                        radius="lg"
                    />

                    <Button color="blue" radius="lg" type="submit"
                        style={{ marginLeft: "250px", marginTop: '10px' }}
                    >
                        Add appointment
                    </Button>
                </form>
            </Modal>
            {/* time picker modal */}
            <Modal
                opened={timeModalOpened}
                onClose={() => setTimeModalOpened(false)}
                title="Appointment Time"
                size="50%"

            >
                <form
                    onSubmit={timeForm.onSubmit((values) => checkTime(values))}
                >

                    <TimeInput
                        icon={<IconClock size="1rem" stroke={1.5} />}
                        maw={400} mx="auto"
                        {...timeForm.getInputProps("time")}
                    />
                    <Center>
                        <Button mt={15} color="blue" radius="lg" type="submit"

                        >
                            Check
                        </Button>
                    </Center>
                </form>
            </Modal>

            {/* free date slot modal */}
            <Modal
                opened={dateSlotOpened}
                onClose={() => setDateSlotOpened(false)}
                title="Available date Slots"
                size="50%"
            >
                <Text fw={600} style={{ textAlign: "left" }}>To add an appointment click top of the date you want</Text>
                <ScrollArea h={450}>
                    <Table striped highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>date Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {freeDates.length > 0 ? (
                                freeDates.map((date: any) => (
                                    <tr
                                        key={date}
                                        onClick={() => {
                                            setSelectedDateSlotForAppointment(date); // Set the selected date
                                            console.log(selectedDateSlotForAppointment)
                                            openAppointmentModalFromTime(); // Open the appointment modal
                                        }}
                                    >
                                        <td>{date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={1}>
                                        <Text align="center" weight={"bold"} size={20} pb={70}>
                                            No Dates available!
                                        </Text>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </Table>

                </ScrollArea>
            </Modal>
            <Text fw={700} fz={30} style={{ textAlign: "center" }}>New Appointments</Text>
            {/* search bar */}
            <Group spacing={"md"}>
                <TextInput
                    icon={<IconSearch size={15} />}
                    placeholder="Search..."
                    size="xs"
                    style={{
                        width: '750px', // Increase length
                        padding: '10px', // Add margin to the bottom
                    }}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.currentTarget.value)}
                />
                <Box>
                    <Button mr={10} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                        onClick={openDateModal}

                    >
                        Add Appointment from date
                    </Button>
                    <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                        onClick={openTimeModal}

                    >
                        Add Appointment from Time
                    </Button>
                </Box>

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