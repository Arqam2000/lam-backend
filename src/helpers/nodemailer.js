import nodemailer from "nodemailer";

export async function sendEmail(fullName, email, emailType, date) {
    console.log("sendEmail called with:", email, emailType);
    try {
        
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "admin@lamaesthetic.co.uk",
                pass: "Lamaesthetic123@",
            },
        });

        const mailOptions = {
            from: 'admin@lamaesthetic.co.uk', // sender address
            to: `arqamsarwar9@gmail.com, ${email}`, // list of receivers
            subject: emailType === "Appointment" ? "Appointment" : "Contact", // Subject line
            html: `<p style="font-size: 16px;"><span style="font-weight: bold;">${fullName}</span>  booked an appointment at <span style="font-weight: bold;">${date}</span></p>`, // html body
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        // console.log("Mail sent successfully:", mailResponse);

        return mailResponse;

    } catch (error) {
        console.log("Mail error:", error)
        // throw new Error(error.message)
    }
}