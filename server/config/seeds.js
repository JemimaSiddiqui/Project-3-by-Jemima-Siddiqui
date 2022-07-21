const db = require('./connection');
const { Tutor, User } = require('../models');

db.once('open', async () => {
    await Tutor.deleteMany();

    const tutor = await Tutor.insertMany([
        {
            tutorAuthor: 'James',
            tutorFirst: 'James',
            tutorLast: 'Far',
            tutorEmail: 'james99@gmail.com',
            tutorAbout: 'Test Analyst working in Cloud',
            tutorLoc: 'Sydney, 2000',
            tutorCert: 'WWCC, AWS Cloud Practitioner',
            tutorPic: 'https://www.biography.com/musician/drake',
            tutorPh: '0424976625'
        },
        {
            tutorAuthor: 'Hannah',
            tutorFirst: 'Hannah',
            tutorLast: 'Low',
            tutorEmail: 'hannahlow@gmail.com',
            tutorAbout: 'Passionate about software development and football',
            tutorLoc: 'Green Point, 2251',
            tutorCert: 'Full Stack Developer',
            tutorPic: 'https://www.biography.com/musician/drake',
            tutorPh: '0452077227'
        },
        {
            tutorAuthor: 'Bethany',
            tutorFirst: 'Bethany',
            tutorLast: 'Carter',
            tutorEmail: 'bethanycarter@hotmail.com',
            tutorAbout: 'Engineering Student with HD WAM',
            tutorLoc: 'Kingsford, 2032',
            tutorCert: 'None',
            tutorPic: 'https://www.biography.com/musician/drake',
            tutorPh: '555-1234'
        },
       
    ]);

    console.log('tutor seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@tutoring-hub.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'James',
        lastName: 'Far',
        email: 'james99@gmail.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Hannah',
        lastName: 'Low',
        email: 'hannahlow@gmail.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Bethany',
        lastName: 'Carter',
        email: 'bethanycarter@hotmail.com',
        password: 'password1234',
    });

    console.log('users seeded')

    process.exit();
});