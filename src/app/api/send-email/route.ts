import nodemailer from 'nodemailer';

export async function POST(request) {
    const formData = await request.formData();
    const storyData = JSON.parse(formData.get('storyData'));
    const storyTextFile = formData.get('storyTextFile');

    console.log("HERE", storyTextFile)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'spolat0750@gmail.com',
        subject: 'Nieuwe Verhaal Indiening',
        text: `Een nieuw verhaal genaamd '${storyData.storyTitle}' is ingediend door ${storyData.author}\n\nGelieve het te controleren: http://localhost:3000/admin/review`,
        attachments: [],
    };

    if (storyTextFile) {
        const fileBuffer = await storyTextFile.arrayBuffer();
        const fileContent = Buffer.from(fileBuffer);
        mailOptions.attachments.push({
            filename: storyData.storyTitle,
            content: fileContent,
        });
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
        });
    }
}
