const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieparser = require('cookie-parser');

const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    method:["POST","GET","DELETE","PUT"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieparser());
app.use(bodyParser.json());
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized:false,
    cookie:{
        secure: false,
        maxAge: 1000*60*6024
    }
}))

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nani@1804',
    database:"addcourses"
});

const db2 = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nani@1804',
    database:"signup"
});

const db3 = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Nani@1804',
    database:"instructor"
});

app.post('/signup',(req, res)=>{
    const sql = "insert into login (`name`,`email`,`password`) values (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db2.query(sql,[values], (err, data) =>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login',(req,res)=>{
    const sql = 'SELECT * FROM login WHERE `email` = ? and `password` = ?';
    db2.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json(err)
        }
        if(data.length>0){
            req.session.name = data[0].name;
            console.log(req.session.name)
            return res.json({Login: true})
        }else{
            return res.json({Login: false})
        }
    })
});

app.get('/getusername',(req,res)=>{
    if(req.session.name){
        return res.json({valid: true, name:req.session.name})
    }else{
        return res.json({valid: false})
    }
});

app.get('/logout',(req,res)=>{
    res.clearCookie('auth');
    return res.json({Status: 'success'})
});


app.get('/',(req, res)=>{
    // const sqlInsert = "insert into course (courseid, coursename, courseimage, coursedescription, courseduration) values ('0405','PHP FullStack Development','','Course coverd dotnet','4 months')";
    // db.query(sqlInsert, (err, result)=>{
    //     console.log("error", err);
    //     console.log("result", result);
    //     res.send("Inserted Successfully");
    // });
});

app.get("/api/get",(req, res)=>{
    const sqlGet = "select * from course";
    db.query(sqlGet,(error, result)=>{
        res.send(result);
    });
});

app.post("/api/post", (req, res) =>{
    const {courseid, coursename, courseimage, coursedescription, courseduration} = req.body;
    const sqlInsert = "insert into course (courseid, coursename, courseimage, coursedescription, courseduration) values (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [courseid, coursename, courseimage, coursedescription, courseduration], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send("insert Successfully")
    });
});

app.delete("/api/remove/:id", (req, res) =>{
    const { id } = req.params;
    const sqlRemove = "delete from course where id = ?";
    db.query(sqlRemove, id, (error, result) =>{
        if(error){
            console.log(error);
        }
    });
});

//for updation
app.get("/api/get/:id",(req, res)=>{
    const { id } = req.params;
    const sqlGet = "select * from course where id = ?";
    db.query(sqlGet,id, (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.put("/api/update/:id",(req, res)=>{
    const { id } = req.params;
    const { courseid, coursename, courseimage, coursedescription, courseduration } = req.body;
    const sqlUpdate = "update course set courseid = ?,coursename = ?,courseimage = ?,coursedescription = ?,courseduration = ? where id=?";
    db.query(sqlUpdate,[ courseid, coursename, courseimage, coursedescription, courseduration, id], (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

//addmodule
app.post("/api/modulepost", (req, res) =>{
    const {courseid, moduleid ,modulename, moduleimage, moduledescription, moduleduration} = req.body;
    const sqlModuleInsert = "insert into module (courseid, moduleid ,modulename, moduleimage, moduledescription, moduleduration) values ( ?, ?, ?, ?, ?, ?)";
    db.query(sqlModuleInsert, [courseid, moduleid ,modulename, moduleimage, moduledescription, moduleduration], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send("insert Successfully")
    });
});

app.get('/getmodule/:courseid',(req, res)=>{
    const courseid = req.params.courseid;
    const sqlModuleGet = "select *from module  where courseid in(select courseid from course where courseid=?)";
    db.query(sqlModuleGet,[courseid],(err,data)=>{
        if(err){
            console.log(err);
        }
            res.send(data)
    })
})

//for moduleupdation
app.get("/api/moduleget/:id",(req, res)=>{
    const { id } = req.params;
    const sqlGet = "select * from module where id = ?";
    db.query(sqlGet,id, (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.put("/api/moduleupdate/:id",(req, res)=>{
    const { id } = req.params;
    const { moduleid, modulename, moduleimage, moduledescription, moduleduration } = req.body;
    const sqlModuleUpdate = "update module set moduleid = ?,modulename = ?,moduleimage = ?,moduledescription = ?,moduleduration = ? where id=?";
    db.query(sqlModuleUpdate,[ moduleid, modulename, moduleimage, moduledescription, moduleduration, id], (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(data);
    });
});

app.delete("/api/moduleRemove/:id", (req, res) =>{
    const { id } = req.params;
    const sqlRemove = "delete from module where id = ?";
    db.query(sqlRemove, id, (error, result) =>{
        if(error){
            console.log(error);
        }
    });
});

//for addassesment
app.post("/api/questions", (req,res)=>{
    const { module, question, optiona, optionb, optionc, optiond, answer} = req.body;
    const mcqQuery = 'insert into mcqquestion (moduleid, questions, optiona, optionb, optionc, optiond, answer) values (?,?,?,?,?,?,?)';
    db.query(mcqQuery,[module, question, optiona, optionb, optionc, optiond, answer], (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send("Insert Successfully")
    })
});

app.get("/api/getmcq/:moduleid",(req,res)=>{
    const moduleid = req.params.moduleid;
    const getQuery = 'select * from mcqquestion where moduleid = ?';
    db.query(getQuery ,[moduleid],(error,data)=>{
        if(error){
            console.log(err)
        }
        res.send(data);
    })
});

app.put("/updatescore/:name/:newscore",(req,res)=>{
    const id = req.params.name
    const values = req.params.newscore
    const q = "UPDATE login SET  `score`=? WHERE name =?";
    console.log(values)
       db2.query(q,[values,id],(err,data)=>{
           if(err){
               console.log(err)
           }
           console.log('successfull')
       })
   })

   app.get('/getusername',(req,res)=>{
    if(req.session.name){
        return res.json({valid: true,name:req.session.name})
    }else{
        return res.json({valid: false})
    }

});

//for lessonmcq
app.post("/api/lessonquestions", (req,res)=>{
    const { lesson, question, optiona, optionb, optionc, optiond, answer} = req.body;
    const mcqLessonQuery = 'insert into lessonmcq (lessonid, questions, optiona, optionb, optionc, optiond, answer) values (?,?,?,?,?,?,?)';
    db.query(mcqLessonQuery,[lesson, question, optiona, optionb, optionc, optiond, answer], (error,result)=>{
        if(error){
            console.log(error);
        }
        res.send("Insert Successfully")
    })
});

app.get("/api/getlessonmcq/:lessonid",(req,res)=>{
    const lessonid = req.params.lessonid;
    const getLessonQuery = 'select * from lessonmcq where lessonid = ?';
    db.query(getLessonQuery ,[lessonid],(error,data)=>{
        if(error){
            console.log(err)
        }
        res.send(data);
    })
});

// app.put("/updatescore/:name/:newscore",(req,res)=>{
//     const id = req.params.name
//     const values = req.params.newscore
//     const q = "UPDATE login SET  `score`=? WHERE name =?";
//     console.log(values)
//        db2.query(q,[values,id],(err,data)=>{
//            if(err){
//                console.log(err)
//            }
//            console.log('successfull')
//        })
//    })

//    app.get('/getusername',(req,res)=>{
//     if(req.session.name){
//         return res.json({valid: true,name:req.session.name})
//     }else{
//         return res.json({valid: false})
//     }

// })


//for subtopics
app.post("/api/subtopicpost", (req, res) =>{
    const {moduleid, subtopicid, subtopicname, subtopicdocument, subtopicimage, subtopicvideo, subtopicduration, subtopicdescription} = req.body;
    const sqlSuptopicInsert = "insert into subtopics (moduleid, subtopicid, subtopicname, subtopicdocument, subtopicimage, subtopicvideo, subtopicduration, subtopicdescription) values ( ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlSuptopicInsert, [moduleid, subtopicid, subtopicname, subtopicdocument, subtopicimage, subtopicvideo, subtopicduration, subtopicdescription], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send("insert Successfully")
    });
});

app.get('/getsuptopics/:moduleid',(req, res)=>{
    const moduleid = req.params.moduleid;
    const sqlSupTopicGet = "select *from subtopics  where moduleid in(select moduleid from module where moduleid=?)";
    db.query(sqlSupTopicGet,[moduleid],(err,data)=>{
        if(err){
            console.log(err);
        }
            res.send(data)
    })
})

app.get("/api/subtopicget/:id",(req, res)=>{
    const { id } = req.params;
    const sqlGet = "select * from subtopics where id = ?";
    db.query(sqlGet, id, (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.put("/api/subtopicupdate/:id",(req, res)=>{
    const { id } = req.params;
    const { subtopicid, subtopicname, subtopicdocument, subtopicimage, subtopicvideo, subtopicduration, subtopicdescription } = req.body;
    const sqlSubTopicUpdate = "update subtopics set subtopicid = ?,subtopicname = ?,subtopicdocument = ?,subtopicimage = ?,subtopicvideo = ?,subtopicduration = ?,subtopicdescription = ? where id=?";
    db.query(sqlSubTopicUpdate,[ subtopicid, subtopicname, subtopicdocument, subtopicimage, subtopicvideo, subtopicduration, subtopicdescription, id], (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.delete("/api/subtopiremove/:id", (req, res) =>{
    const { id } = req.params;
    const sqlSubTopicRemove = "delete from subtopics where id = ?";
    db.query(sqlSubTopicRemove, id, (error, result) =>{
        if(error){
            console.log(error);
        }
    });
});

//for lesson
app.post("/api/lessonpost", (req, res) =>{
    const { subtopicid, lessonid, lessonname, lessondocument, lessonimage, lessonvideo, lessonduration, lessondescription} = req.body;
    const sqlLessonInsert = "insert into lessons (subtopicid, lessonid, lessonname, lessondocument, lessonimage, lessonvideo, lessonduration, lessondescription) values ( ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlLessonInsert, [subtopicid, lessonid, lessonname, lessondocument, lessonimage, lessonvideo, lessonduration, lessondescription], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send("insert Successfully")
    });
});

app.get('/getlesson/:subtopicid',(req, res)=>{
    const subtopicid = req.params.subtopicid;
    const sqlLseeonGet = "select *from lessons  where subtopicid in(select subtopicid from subtopics where subtopicid=?)";
    db.query(sqlLseeonGet,[subtopicid],(err,data)=>{
        if(err){
            console.log(err);
        }
            res.send(data)
    })
})

app.get("/api/lessonget/:id",(req, res)=>{
    const { id } = req.params;
    const sqlGetLesson = "select * from lessons where id = ?";
    db.query(sqlGetLesson, id, (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.put("/api/lessonupdate/:id",(req, res)=>{
    const { id } = req.params;
    const { lessonid, lessonname, lessondocument, lessonimage, lessonvideo, lessonduration, lessondescription } = req.body;
    const sqlLessonUpdate = "update lessons set lessonid = ?,lessonname = ?,lessondocument = ?,lessonimage = ?,lessonvideo = ?,lessonduration = ?,lessondescription = ? where id=?";
    db.query(sqlLessonUpdate,[ lessonid, lessonname, lessondocument, lessonimage, lessonvideo, lessonduration, lessondescription, id], (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.delete("/api/subtopiremove/:id", (req, res) =>{
    const { id } = req.params;
    const sqlLessonRemove = "delete from lessons where id = ?";
    db.query(sqlLessonRemove, id, (error, result) =>{
        if(error){
            console.log(error);
        }
    });
});

//for add practice questions
app.post("/api/questionpost", (req, res) =>{
    const {subtopicid, questionid, questions, level, testcase } = req.body;
    const sqlQuestionInsert = "insert into question (subtopicid, questionid, questions, level, testcase) values ( ?, ?, ?, ?, ? )";
    db.query(sqlQuestionInsert, [ subtopicid, questionid, questions, level, testcase], (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send("insert Successfully")
    });
});

app.get('/getquestion/:subtopicid',(req, res)=>{
    const subtopicid = req.params.subtopicid;
    const sqlQuestionGet = "select *from question  where subtopicid in(select subtopicid from subtopics where subtopicid=?)";
    db.query(sqlQuestionGet,[subtopicid],(err,data)=>{
        if(err){
            console.log(err);
        }
            res.send(data)
    })
});

app.get("/api/questionsget/:id",(req, res)=>{
    const { id } = req.params;
    const sqlQuestionsGet = "select * from question where id = ?";
    db.query(sqlQuestionsGet, id, (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.put("/api/questionupdate/:id",(req, res)=>{
    const { id } = req.params;
    const { questionid, questions, level, testcase } = req.body;
    const sqlQuestionUpdate = "update question set questionid = ?,questions = ?,level = ?,testcase = ? where id=?";
    db.query(sqlQuestionUpdate,[ questionid, questions, level, testcase, id], (error, result)=>{
    if(error){
        console.log(error);
    }
        res.send(result);
    });
});

app.delete("/api/questionremove/:id", (req, res) =>{
    const { id } = req.params;
    const sqlQuestionRemove = "delete from question where id = ?";
    db.query(sqlQuestionRemove, id, (error, result) =>{
        if(error){
            console.log(error);
        }
    });
});

app.get('/getquestions/:subtopicid',(req,res)=>{
    const subtopicid = req.params.topicid;
    
    const q = "select *from questions where subtopicid=?";
    db.query(q,[subtopicid],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get('/geteasyquestions/:subtopicid/:level',(req,res)=>{
    const subtopicid = req.params.subtopicid;
    const level = req.params.level;
    
    const qs = "select * from question where subtopicid=? and level=? ";
    db.query(qs,[subtopicid,level],(err,data)=>{
        if(err){
            console.log(err)
        }
        return res.json(data)
    })
});

// app.get('/getquestions/:subtopicid',(req,res)=>{
//     const subtopicid = req.params.subtopicid;
    
//     const q = "select *from question where subtopicid=?";
//     db.query(q,[subtopicid],(err,data)=>{
//         if(err){
//             return res.json(err)
//         }
//         return res.json(data)
//     })
// })

//student fetch data
app.get("/api/studentget/:courseid",(req, res)=>{
    const {courseid} = req.params;
    const sqlGet = "select * from module where courseid =?";
    db.query(sqlGet, courseid,(error, result)=>{
        res.send(result);
    });
});

app.get("/api/studentget",(req, res)=>{
    
    const sqlGet = "select * from course";
    db.query(sqlGet,(error, result)=>{
        res.send(result);
    });
});

app.get("/api/getstudent/:moduleid",(req, res)=>{
    const {moduleid} = req.params;
    const sqlStudentGet = "select * from subtopics where moduleid =?";
    db.query(sqlStudentGet, moduleid,(error, data)=>{
        res.send(data);
    });
});

app.get("/api/gettap/:subtopicname",(req,res)=>{
    const {subtopicname} = req.params.subtopicname;
    const sqlTap = "select subtopicdocument, subtopicimage, subtopicvideo from subtopicname=?";
    db.query(sqlTap, subtopicname,(error,data)=>{
        res.send(data);
    })
})

app.get("/api/getstudentlesson/:subtopicid",(req,res)=>{
    const {subtopicid} = req.params;
    const sqlTapLesson = "select * from lessons where subtopicid=?";
    db.query(sqlTapLesson, subtopicid,(error,data)=>{
        if(error){
            console.log(error)
        }
        return res.send(data);
    })
})

//instrcutor add
app.post('/api/instructor',(req, res)=>{
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.martialstatus,
        req.body.gender,
        req.body.allocatebatch,
        req.body.active,
        req.body.contactnumber,
        req.body.email,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.pincode
    ]
    const sqlFaculty = "insert into faculty (`firstname`,`lastname`,`dateofbirth`,`martialstatus`,`gender`,`allocatebatch`,`active`,`contactnumber`,`email`,`address`,`city`,`state`,`pincode`) values (?)";
    db3.query(sqlFaculty,[values], (err, data) =>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("listening...");
})