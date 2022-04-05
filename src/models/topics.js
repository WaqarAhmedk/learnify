let time = new Date(2022, 3, 1, 9, 55).toString();



export let topics = [


    {
        courseid: 1,
        topicid: 1,
        topicname: "Topic 1",
        helpingmaterial: {
            helpingmaterialp: true,
            done:true,

        },
        Assignment: {
            assignp: true,
            duedate:  time ,
            done:true,
        },
        quiz: {
            quizp: false,
            duedate: "sdsdsdsds",
            done:true,
        },
        onlineclass: {
            onlineclassp: true,
            time:  time ,
            done:false,
        },

        recordedsession: {
            recordedsessionp: true,
            done:true,

        }
    },
    {
        courseid: 1,
        topicid: 2,
        topicname: "Topic 2",
        helpingmaterial: {
            helpingmaterialp: true,
            done:true,

        },
        Assignment: {
            assignp: false,
            done:false,

        },
        quiz: {
            quizp: true,
            duedate:  time ,
            done:true,
        },
        onlineclass: {
            onlineclassp: true,
            time:  time ,
            done:true,
        },

        recordedsession: {
            recordedsessionp: true,
            done:true,

        }
    },
    {
        courseid: 1,
        topicid: 3,
        topicname: "Topic 3",
        helpingmaterial: {
            helpingmaterialp: false,
            done:false,

        },
        Assignment: {
            assignp: false,
            done:false,

        },
        quiz: {
            quizp: true,
            duedate:  time ,
            done:true,
        },
        onlineclass: {
            onlineclassp: true,
            time:  time ,
            done:false,
        },

        recordedsession: {
            recordedsessionp: false,

            done:false,
        }
    },
    {
        courseid: 1,
        topicid: 4,
        topicname: "Topic 4",
        helpingmaterial: {
            helpingmaterialp: false,
            done:false,

        },
        Assignment: {
            assignp: false,
            done:false,

        },
        quiz: {
            quizp: true,
            duedate:  time ,
            done:true,
        },
        onlineclass: {
            onlineclassp: true,
            time:  time ,
            done:false,
        },

        recordedsession: {
            recordedsessionp: false,
            done:false,

        }
    },    {
        courseid: 1,
        topicid: 5,
        topicname: "Topic 5",
        helpingmaterial: {
            helpingmaterialp: true,
            done:true,

        },
        Assignment: {
            assignp: false,
            done:false,

        },
        quiz: {
            quizp: true,
            duedate:  time ,
            done:true,
        },
        onlineclass: {
            onlineclassp: true,
            time:  time ,
            done:true,
        },

        recordedsession: {
            recordedsessionp: true,
            time:time,
            done:true,

        }
    }
];