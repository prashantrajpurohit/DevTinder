//this will only handle GET call to /test
app.get("/test", (req, res) => res.send("get test"));
app.post("/test", (req, res) => res.send("POSTED TEST"));
//this method will match all the http method api call to /test

//regular expression
//THIS MEANS B IS OPTIONAL
app.get("/ab?c", (req, res) => res.send("ABC"));
//THIS MEANS WE CAN ADD ANY NUMBER OF B
app.get("/ab+c", (req, res) => res.send("ABBBBBC"));
//THIS MMEANS STARTS WITH AB AND ENDS WITH CD IN BW WE CAM ADD ANYTHING
app.get("/ab\*cd", (req, res) => res.send("ABDSJDHKSJDHSJDCD"));

app.get("/query", (req, res) => {
console.log(req.query);
res.send(`user id=${req.query.user_id}
    name=${req.query.name}
    `);
});
app.get("/query/:id/:name", (req, res) => {
res.send(`user name  is ${req.params.name} with id of ${req.params.id}`);
});

//if you are sending res and after that using next it will throw error becoz js engine execute line line thats why and one route can not send multiple response
// app.use(
// "/user",
// (req, res, next) => {
// //this will also throw error as we are sending res from here also
// res.send("Outer");
// next();
// },
// (req, res) => {
// res.send("Inner");
// }
// );

app.use("/", (req, res, next) => {
next();
});

app.get(
"/user",
(req, res, next) => {
// res.send("USERS");
next();
},
(req, res) => {
res.send("HELLO");
}
);

diff btw app.use and app.all

//THIS IS MIDDLE WARE we are using use because we wan to chck all get put patch post delete api that they have token or not
app.use("/admin", adminAuth);
//
app.get("/user", userAuth, (req, res) => res.send("HELLO FROM USER"));
app.get("/admin/allData", (req, res) => {
try {
throw new Error("dfghjkuutr");
res.send("ADMIN ALL DATA");
} catch (err) {
res.status(500).send("Something went wrong");
}
});
app.get("/admin/deleteUser", (Req, res) => {
res.send("DELTED USER");
});

// if we want to this type of error handling we ahve to keep this code at the bottom

// app.use("/", (err, req, res, next) => {
// if (err) {
// res.status(500).send("SOMETHING WENT WRONG BABBBEE");
// }
// });
