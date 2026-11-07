const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, ...x });

export default [
  E("What is Node.js?", ["node", "node.js", "nodejs", "what is node"],
    "Node.js is a JavaScript runtime built on Chrome's V8 engine that lets us run JavaScript on the server. It's non-blocking and event-driven, so it handles many requests efficiently.",
    "Server pe JavaScript chalane ka runtime."),

  E("Explain the event loop in Node.js.", ["node event loop", "event loop in node"],
    "Node runs JavaScript on one thread. Slow work like file or network I/O is handed to the system or libuv. When it's done, the callback is queued, and the event loop runs it when the call stack is free.",
    "Node slow kaam background ko deta hai aur aage badh jaata hai. Kaam khatam hone pe callback chalata hai."),

  E("Explain the internal architecture of Node.js.", ["node architecture", "internal architecture", "libuv", "v8"],
    "Node has the V8 engine to run JavaScript, libuv for the event loop and thread pool, and C++ bindings that connect JavaScript to the operating system. Our code runs on one thread, while libuv handles I/O in the background.",
    "V8 (JS chalata hai) + libuv (event loop + thread pool)."),

  E("What are the phases of the Node.js event loop?", ["event loop phases", "phases of event loop"],
    "Timers for setTimeout and setInterval, pending callbacks, poll for I/O, check for setImmediate, and close callbacks. Between each phase, process.nextTick and promise microtasks run.",
    "Timers → Poll (I/O) → Check (setImmediate) → Close."),

  E("Explain the execution order of Promise, async/await, setTimeout, setImmediate and process.nextTick.", ["execution order", "nexttick setimmediate settimeout order", "process.nexttick"],
    "First synchronous code runs, then process.nextTick, then promise and async/await callbacks, then setTimeout, then setImmediate.",
    "Sync → nextTick → Promise → setTimeout → setImmediate.",
    { code: `setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
console.log("sync");`, out: "sync\nnextTick\npromise\ntimeout\nimmediate", norun: true, ex: "Main module mein timeout aur immediate ka order kabhi kabhi badal sakta hai, baaki fixed hai." }),

  E("What is npm? List its uses.", ["npm", "node package manager"],
    "npm is Node's package manager. We use it to install libraries, manage versions in package.json, and run scripts like npm start and npm run build.",
    "Packages install karne aur scripts chalane ka tool."),

  E("What is the purpose of package.json?", ["package.json"],
    "package.json stores the project name, version, scripts and the list of dependencies with their versions.",
    "Project ki ID card: naam, scripts, dependencies."),

  E("What is the HTTP module? Create a server using it.", ["http module", "create server", "http server"],
    "The http module is built into Node and lets us create a web server without Express.",
    "Node ka built-in module server banane ke liye.",
    { code: `const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello" }));
});
server.listen(3000, () => console.log("Server running on 3000"));`, norun: true }),

  E("How do you create a secure HTTPS server with Express?", ["https server", "secure server", "https express"],
    "We use the https module with an SSL certificate and key, and pass the Express app to it. In production, HTTPS is usually handled by Nginx or the hosting platform.",
    "SSL certificate + https module + Express app.",
    { code: `const https = require("https");
const fs = require("fs");
const app = require("express")();
https.createServer({
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
}, app).listen(443);`, norun: true }),

  E("How do you update npm packages?", ["update packages", "npm update", "npm outdated"],
    "npm outdated shows which packages are old, npm update updates within the allowed version range, and npm install package@latest updates to the newest version.",
    "outdated se dekho, update se update karo."),

  E("List some global objects in Node.js.", ["global objects", "globals in node"],
    "global, process, console, Buffer, __dirname, __filename, require, module, setTimeout and setInterval.",
    "Bina import kiye milne wali cheezein."),

  E("What are Streams?", ["streams", "stream"],
    "Streams process data in small chunks instead of loading everything into memory. There are readable, writable, duplex and transform streams. They're used for large files and video.",
    "Data ko tukdon mein padhna/likhna."),

  E("What is a Buffer?", ["buffer", "buffers"],
    "A Buffer is a chunk of raw binary data in memory. Streams send data as buffers.",
    "Raw binary data ka chhota tukda."),

  E("What are microtasks and macrotasks in Node.js?", ["microtasks node", "macrotasks node"],
    "Microtasks are process.nextTick and promise callbacks. Macrotasks are setTimeout, setInterval, setImmediate and I/O callbacks. Microtasks always run before the next macrotask.",
    "nextTick + Promise pehle, phir timers."),

  E("Explain piping data between streams.", ["pipe", "piping", "stream pipe"],
    "pipe connects a readable stream to a writable stream, so data flows automatically chunk by chunk, and it handles backpressure.",
    "Ek stream ka output seedha doosre mein.",
    { code: `const fs = require("fs");
fs.createReadStream("input.txt").pipe(fs.createWriteStream("output.txt"));`, norun: true }),

  E("What are the features of Express.js?", ["express", "express.js", "features of express"],
    "Express is a minimal Node framework. It gives routing, middleware support, easy request and response handling, and works with any database.",
    "Node pe API banane ka simple framework."),

  E("What is middleware in Express?", ["middleware", "express middleware"],
    "Middleware is a function with req, res and next that runs before the route handler. It's used for logging, authentication, parsing the body and error handling.",
    "Request aur response ke beech ka checkpoint.",
    { code: `const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
app.use(logger);`, norun: true }),

  E("What happens when we call next() inside middleware?", ["next()", "next function", "next in middleware"],
    "next() passes control to the next middleware or route. If we don't call next() and don't send a response, the request hangs. If we call next(error), Express skips to the error handler.",
    "next() = aage jao. next(err) = seedha error handler."),

  E("How can we skip middleware and jump to another one?", ["skip middleware", "next route"],
    "In a route-level middleware stack, next('route') skips the remaining middleware for that route and moves to the next matching route. We can also add a condition and call next() early to skip logic.",
    "next('route') se baaki middleware skip."),

  E("How do you create optional route parameters in Express?", ["optional path", "optional params", "optional route parameter"],
    "In Express 4 we add a ? after the parameter, like /users/:id?. In Express 5 the syntax is /users{/:id}.",
    "Express 4 mein :id? lagao.",
    { code: `app.get("/users/:id?", (req, res) => {
  if (req.params.id) return res.send("One user");
  res.send("All users");
});`, norun: true }),

  E("Explain error handling in Express.js.", ["error handling express", "express error handling", "error middleware"],
    "We pass errors to next(err), and one error-handling middleware with four parameters (err, req, res, next) at the end sends a proper error response. For async routes, we wrap them to catch rejected promises.",
    "Saare errors ek central error middleware mein.",
    { code: `app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});`, norun: true }),

  E("What is JWT? Explain its structure.", ["jwt", "json web token", "jwt structure"],
    "JWT is a token used for authentication. It has three parts: header with the algorithm, payload with user data like id and role, and signature to verify it wasn't changed. The server signs it and checks it on each request.",
    "Header.Payload.Signature. Login ke baad milta hai.",
    { code: `const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
const data = jwt.verify(token, process.env.JWT_SECRET);`, norun: true }),

  E("Can we modify the signature of a JWT?", ["modify jwt signature", "jwt signature", "tamper jwt"],
    "No. If someone changes the payload or signature, verification fails because they don't have the secret key. That's what keeps JWT safe. But the payload can be read by anyone, so no sensitive data in it.",
    "Badla toh verify fail. Secret ke bina naya signature nahi ban sakta."),

  E("How do you implement role-based access control in Express?", ["role based access", "rbac", "permission based access", "authorization middleware"],
    "After verifying the JWT, a middleware checks if the user's role is in the allowed roles. If not, it returns 403. For permission-based control, we check a list of permissions instead of roles.",
    "Role allowed hai toh aage, warna 403.",
    { code: `const allow = (...roles) => (req, res, next) =>
  roles.includes(req.user.role) ? next() : res.status(403).json({ message: "Forbidden" });

app.delete("/users/:id", auth, allow("admin"), deleteUser);`, norun: true }),

  E("What are the best practices for REST APIs?", ["rest api best practices", "rest best practices", "rest api"],
    "Use nouns in URLs like /users, correct HTTP methods and status codes, versioning like /api/v1, pagination, validation, consistent error responses, and authentication.",
    "Sahi URL, sahi method, sahi status code."),

  E("What is input validation and sanitization in Express?", ["input validation", "sanitization", "express validator", "joi"],
    "Validation checks if the data is correct, like a valid email. Sanitization cleans the data, like trimming spaces or removing HTML. We use libraries like Joi, Zod or express-validator.",
    "Validation = sahi hai ya nahi. Sanitization = saaf karo."),

  E("What is rate limiting in Express?", ["rate limiting", "rate limit", "express-rate-limit"],
    "Rate limiting restricts how many requests a user can make in a time window, like 100 per 15 minutes. It protects against brute force and overload, and returns status 429.",
    "Ek user kitni requests bhej sakta hai, uski limit.",
    { code: `const rateLimit = require("express-rate-limit");
app.use("/api/login", rateLimit({ windowMs: 60 * 1000, max: 5 }));`, norun: true }),

  E("Explain logging and monitoring in a Node.js app.", ["logging", "monitoring", "winston"],
    "For logging, we use Winston or Pino to write structured logs with levels like info and error. For monitoring, we use tools like PM2, CloudWatch or Datadog to track CPU, memory, errors and response time.",
    "Logs = kya hua. Monitoring = app ki health."),

  E("How can we achieve state management in a Node.js app?", ["state management node", "session", "node state"],
    "Keep the server stateless, and store shared state in a database or Redis. For login, use JWT or sessions stored in Redis, so any server can handle any request.",
    "State server memory mein nahi, Redis/DB mein."),

  E("How do you scale Node.js with the Cluster module?", ["cluster", "cluster module", "pm2 cluster"],
    "The Cluster module creates one worker process per CPU core, all sharing the same port. This uses all cores. PM2 can do this with pm2 start app.js -i max.",
    "Har CPU core pe ek Node process.",
    { code: `const cluster = require("cluster");
const os = require("os");
if (cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork());
} else {
  require("./server");
}`, norun: true }),

  E("What is a Worker Thread?", ["worker thread", "worker threads", "cpu intensive"],
    "Worker threads run JavaScript in parallel threads inside the same process. We use them for CPU-heavy tasks like image processing or big calculations, so the main event loop isn't blocked.",
    "Heavy calculation alag thread mein, main thread free."),

  E("How can you optimize database queries?", ["optimize queries", "query optimization", "optimize database"],
    "Add indexes on filtered and sorted fields, select only needed fields, use pagination, avoid N+1 queries, use lean() in Mongoose, and check slow queries with explain.",
    "Index + kam fields + pagination."),

  E("What is Redis? Explain its use cases.", ["redis"],
    "Redis is a fast in-memory key-value store. It's used for caching, sessions, rate limiting, queues and pub/sub.",
    "Memory mein data, bahut fast. Cache ke liye."),

  E("How can we improve the performance of a Node.js app?", ["node performance", "improve node performance", "optimize node"],
    "Use async code, caching with Redis, database indexes, clustering, compression, pagination, and move heavy tasks to queues or worker threads.",
    "Async + cache + index + cluster."),

  E("What is profiling in Node.js?", ["profiling", "node profiling"],
    "Profiling means measuring where the app spends CPU time and memory, to find slow code. We use node --inspect with Chrome DevTools, or tools like clinic.js.",
    "Slow code dhoondhne ke liye measurement."),

  E("What is database connection pooling?", ["connection pooling", "connection pool", "pool"],
    "Connection pooling keeps a set of open database connections and reuses them, instead of opening a new connection for every request. It makes queries faster.",
    "DB connections ko reuse karna."),

  E("Write middleware for role-based access control (RBAC).", ["rbac middleware", "role middleware"],
    "The auth middleware verifies the token and sets req.user. The role middleware checks if req.user.role is allowed.",
    "Pehle auth, phir role check.",
    { code: `const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Access denied" });
  next();
};

app.get("/admin/report", auth, allowRoles("admin", "manager"), getReport);`, norun: true, ex: "auth token check karta hai (401), allowRoles role check karta hai (403)." }),

  E("How does OAuth 2.0 work for third-party login (e.g. Google)?", ["oauth", "oauth 2.0", "google login", "passport"],
    "The user is redirected to Google to log in. Google sends back a code, our server exchanges it for an access token, gets the user profile, creates or finds the user, and issues our own JWT. In Node, we use Passport.js.",
    "Google se login, code → token → profile → apna JWT.",
    { code: `passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOneAndUpdate(
    { googleId: profile.id },
    { name: profile.displayName },
    { upsert: true, new: true }
  );
  done(null, user);
}));`, norun: true }),

  E("Implement a refresh token mechanism for JWT.", ["refresh token", "access token", "refresh token mechanism"],
    "The access token is short-lived, like 15 minutes. The refresh token is long-lived and stored in an HttpOnly cookie. When the access token expires, the client calls /refresh to get a new one.",
    "Chhota access token + lamba refresh token.",
    { code: `app.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, process.env.REFRESH_SECRET);
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
});`, norun: true }),

  E("What is the role of indexes in performance?", ["index", "indexes", "indexing"],
    "An index lets the database find data without scanning every record, like a book index. It makes reads much faster, but too many indexes slow down writes.",
    "Kitaab ka index, seedha page pe jao."),

  E("What is the aggregation pipeline in MongoDB?", ["aggregation", "aggregation pipeline", "aggregate"],
    "Aggregation processes data in stages. $match filters, $group groups and calculates, $sort sorts, $project selects fields, and $lookup joins another collection.",
    "Data ko step by step process karna, jaise factory belt.",
    { code: `db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);`, norun: true, ex: "Paid orders filter, user-wise total, phir highest pehle." }),

  E("What are transactions? How do we use them in MongoDB?", ["transaction", "transactions", "mongodb transaction"],
    "A transaction runs multiple operations as one unit, either all succeed or all fail. In MongoDB, we start a session, run operations with that session, and commit or abort. It needs a replica set.",
    "Sab ho ya kuch na ho.",
    { code: `const session = await mongoose.startSession();
try {
  session.startTransaction();
  await Account.updateOne({ _id: from }, { $inc: { balance: -100 } }, { session });
  await Account.updateOne({ _id: to }, { $inc: { balance: 100 } }, { session });
  await session.commitTransaction();
} catch (e) {
  await session.abortTransaction();
} finally {
  session.endSession();
}`, norun: true }),

  E("How do transactions help with rollback on failure?", ["rollback", "transaction rollback"],
    "If any operation fails, we abort the transaction and all changes made inside it are undone, so data stays consistent. For example, money is never deducted without being added to the other account.",
    "Beech mein fail hua toh sab wapas."),

  E("How do you identify slow queries?", ["slow queries", "slow query", "explain"],
    "In MongoDB, we use explain() to see if a query scans the whole collection, and the database profiler to log slow queries. In MySQL, the slow query log and EXPLAIN.",
    "explain() se dekho index use ho raha hai ya nahi."),

  E("What are Replica Sets in MongoDB?", ["replica set", "replication"],
    "A replica set is a group of MongoDB servers with the same data. One is primary for writes, others are secondaries. If the primary fails, a secondary becomes primary automatically.",
    "Data ki copies, ek gaya toh doosra sambhalega."),

  E("What is Sharding in MongoDB?", ["sharding", "shard", "shard key"],
    "Sharding splits a large collection across multiple servers using a shard key. It helps scale when data is too big for one server.",
    "Bada data alag servers mein baant do."),

  E("How do you configure failover and disaster recovery in MongoDB?", ["failover", "disaster recovery", "backup"],
    "Use a replica set across different zones for automatic failover, take regular backups or use point-in-time recovery, and test restoring. MongoDB Atlas provides this built in.",
    "Replica set + regular backup + restore test."),

  E("What is a load balancer and how is it used with Node.js?", ["load balancer", "load balancing", "nginx"],
    "A load balancer spreads incoming requests across multiple Node servers so no single server is overloaded. We use Nginx or AWS Load Balancer in front, or PM2 cluster on one machine.",
    "Requests ko servers mein baantna."),

  E("How do you avoid schema design pitfalls in MongoDB?", ["schema pitfalls", "schema design", "mongodb schema"],
    "Design based on how data is read. Embed small related data, reference large or growing data, avoid unbounded arrays, add indexes for common queries, and use schema validation in Mongoose.",
    "Jaise padhte ho waise design karo."),

  E("What measures do you take to write efficient queries?", ["efficient queries"],
    "Filter early, use indexes, return only needed fields with projection, paginate, avoid regex without an index, and avoid queries inside loops.",
    "Index + projection + pagination."),

  E("How do you implement health checks in MongoDB / Node?", ["health check", "health checks"],
    "We create a /health endpoint that pings the database and returns status 200 if everything is fine. Load balancers and monitoring tools call it regularly.",
    "/health API jo DB ping karke OK bataye.",
    { code: `app.get("/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ status: "db down" });
  }
});`, norun: true }),

  E("What are the SOLID principles?", ["solid", "solid principles"],
    "S: single responsibility, one module does one job. O: open for extension, closed for modification. L: Liskov substitution, child classes can replace parents. I: interface segregation, small specific interfaces. D: dependency inversion, depend on abstractions.",
    "Clean, maintainable code ke 5 rules."),

  E("What is Kafka? Explain its use cases.", ["kafka"],
    "Kafka is a distributed event streaming platform. Producers send messages to topics and consumers read them. It's used for real-time data pipelines, logs, notifications and communication between microservices.",
    "Bahut saare events ko reliable tareeke se bhejne ka system."),

  E("How can we minimize middleware overhead?", ["middleware overhead"],
    "Apply middleware only to the routes that need it, keep it lightweight, avoid heavy work or database calls in global middleware, and order it so cheap checks run first.",
    "Middleware sirf zaroori routes pe."),

  E("What is CORS?", ["cors"],
    "CORS is a browser rule that blocks requests to a different domain unless the server allows it. We fix it on the server using the cors package with allowed origins.",
    "Doosre domain se request ke liye server ki permission.",
    { code: `app.use(cors({ origin: "https://myapp.com", credentials: true }));`, norun: true }),

  E("What are HTTP status codes you use?", ["status codes", "http status codes"],
    "200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Too Many Requests, 500 Server Error.",
    "2xx success, 4xx client galti, 5xx server galti."),

  E("What is bcrypt?", ["bcrypt", "password hashing"],
    "bcrypt hashes passwords with a salt, so we never store plain passwords. On login, we compare the entered password with the hash.",
    "Password ko hash karke store karna.",
    { code: `const hash = await bcrypt.hash(password, 10);
const isMatch = await bcrypt.compare(password, hash);`, norun: true }),

  E("Create a simple CRUD API with Express and MongoDB.", ["crud", "crud api"],
    "I'll create a model and five routes: get all, get one, create, update and delete, with proper status codes.",
    "Model + 5 routes.",
    { code: `const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));

app.get("/users", async (req, res) => res.json(await User.find()));
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
});
app.post("/users", async (req, res) => res.status(201).json(await User.create(req.body)));
app.put("/users/:id", async (req, res) =>
  res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});`, norun: true }),

  E("How do you implement pagination in an API?", ["pagination", "paginate", "skip limit"],
    "Read page and limit from the query, use skip and limit, and return the data with the total count.",
    "page, limit → skip, limit.",
    { code: `app.get("/users", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const [data, total] = await Promise.all([
    User.find().skip((page - 1) * limit).limit(limit),
    User.countDocuments(),
  ]);
  res.json({ data, total, page });
});`, norun: true }),

  E("What is populate in Mongoose?", ["populate", "mongoose populate"],
    "populate replaces a referenced id with the actual document from another collection, like a join.",
    "id ki jagah poora document.",
    { code: `const posts = await Post.find().populate("author", "name email");`, norun: true }),

  E("What is the difference between SQL joins INNER and LEFT?", ["join", "inner join", "left join", "joins"],
    "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table, and NULL where there's no match on the right.",
    "INNER = dono mein match. LEFT = left ke sab.", { type: "diff", pair: ["inner", "left"] }),

  E("Write a query to find the second highest salary.", ["second highest salary", "2nd highest salary"],
    "Sort salaries in descending order, skip the first, and take one. Use DISTINCT in SQL to handle duplicates.",
    "Sort desc, ek skip, ek lo.",
    { code: `-- SQL
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

// MongoDB
db.employees.find().sort({ salary: -1 }).skip(1).limit(1);`, norun: true, lang: "sql" }),
];
