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
