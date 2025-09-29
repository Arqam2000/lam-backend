import { sendEmail } from "../helpers/nodemailer.js"
import { pool } from "../../dbConfig.js"

const readableDate = (recievedate) => {
    // const isoDate = new Date(recievedate).toISOString();

    // Convert to Date object
    // const date = new Date(recievedate);

    // Options for readable format

    const [datePart, timePart] = recievedate.split("T");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");

    // Create a Date in *local time* without shifting
    const date = new Date(year, month - 1, day, hour, minute);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true, // 12-hour format
        timeZone: "UTC" // or your local time zone
    };

    const readableDate = date.toLocaleString("en-US", options);

    return readableDate;
}

const bookAppointment = async (req, res) => {
    try {
        const { name, email, phone, date } = req.body

        if (!name || !email || !phone || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        await pool.query("INSERT INTO Bappoint (name, email, phone, bdate) values (?, ?, ?, ?)", [name, email, phone, date])

        const emailType = "Appointment"

        // console.log('date:', date);

        // console.log("date", date.split("T")[0])
        // console.log("date", date.split("T")[1])

        // const formattedDate = readableDate(date)

        // console.log("formattedDate", formattedDate)

        const resp = await sendEmail(name, email, emailType, date)

        // console.log("res from appointment", resp)

        return res.status(200).json({
            success: true,
            message: "Appointment booked successfuly"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Booking failed",
            error
        })
    }
}

const getAppointments = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT name, email, phone, bdate FROM Bappoint ORDER BY bdate DESC")

        console.log(rows[rows.length - 1].bdate.toLocaleString())
        console.log(rows[rows.length - 1].bdate)

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfuly",
            appointments: rows
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Cannot fetch appointments",
            error
        })
    }
}

export {
    bookAppointment,
    getAppointments
}