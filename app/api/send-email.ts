// import nodemailer from "nodemailer"

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" })
//   }

//   const { "entry.548481978": name, "entry.12387323": email, "entry.164714104": message, "entry.1055894757": phone } = req.body

//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "your-email@gmail.com", // Replace with your email
//       pass: "your-email-password", // Replace with your email password or app password
//     },
//   })

//   const mailOptions = {
//     from: email,
//     to: "your-email@gmail.com", // Replace with your email
//     subject: `New Contact Form Submission from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
//   }

//   try {
//     await transporter.sendMail(mailOptions)
//     res.status(200).json({ message: "Email sent successfully" })
//   } catch (error) {
//     res.status(500).json({ message: "Failed to send email", error })
//   }
// }
