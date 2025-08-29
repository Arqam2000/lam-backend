import { sendEmail } from "../helpers/nodemailer.js"

const bookAppointment = async (req, res) => {
    try {
        const {fName, lName, email, phone, date} = req.body
        const emailType = "Appointment"
        const fullName = fName + " " + lName

        console.log(fullName)

        const resp = await sendEmail(fullName, email, emailType, date)

        console.log("res from appointment", resp)

        return res.json({
            success: true,
            message: "Appointment booked"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Booking failed",
            error
        })
    }
}

export {
    bookAppointment
}