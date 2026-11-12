// Augmont / fintech + Sequelize + Angular-resume questions
const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, ...x });

export const sequelize = [
  E("What is Sequelize?", ["sequelize", "orm", "what is orm"],
    "Sequelize is a promise-based ORM for Node.js that works with MySQL, PostgreSQL and others. We define models in JavaScript, and it generates SQL for us. It supports associations, migrations, transactions, validations, hooks and raw queries.",
    "JS code se SQL database chalana.",
    { lang: "ts", norun: true, code: `const Merchant = sequelize.define("Merchant", {
  name: { type: DataTypes.STRING(100), allowNull: false },
  pan: { type: DataTypes.CHAR(10), unique: true, validate: { is: /^[A-Z]{5}[0-9]{4}[A-Z]$/ } },
  kycStatus: { type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"), defaultValue: "PENDING" },
}, { tableName: "merchants", paranoid: true });` }),

  E("What are associations in Sequelize?", ["sequelize associations", "hasmany belongsto", "belongstomany"],
    "Associations define relations: hasOne and belongsTo for one-to-one, hasMany and belongsTo for one-to-many, and belongsToMany with a through table for many-to-many. Then include in queries does the join.",
    "Tables ka rishta batana, phir include se join.",
    { lang: "ts", norun: true, code: `State.hasMany(City, { foreignKey: "stateId" });
City.belongsTo(State, { foreignKey: "stateId" });
Merchant.hasMany(KycDocument, { foreignKey: "merchantId", as: "documents" });

const m = await Merchant.findByPk(id, { include: [{ model: KycDocument, as: "documents" }] });` }),

  E("What are migrations in Sequelize?", ["migrations", "sequelize migration", "sequelize-cli"],
    "Migrations are versioned files that change the database schema step by step, with up and down functions. We run them with sequelize-cli db:migrate, so every environment has the same schema and we can roll back.",
    "Database structure ka version control."),

  E("How do you use transactions in Sequelize?", ["sequelize transaction", "managed transaction"],
    "I use a managed transaction: sequelize.transaction with a callback. Every query inside gets the transaction option. If anything throws, Sequelize rolls back automatically, otherwise it commits.",
    "Callback ke andar sab, error aaya toh rollback.",
    { lang: "ts", norun: true, code: `await sequelize.transaction(async (t) => {
  const wallet = await Wallet.findOne({ where: { userId }, lock: t.LOCK.UPDATE, transaction: t });
  if (Number(wallet.balance) < amount) throw new AppError("Insufficient balance", 400);
  await wallet.decrement("balance", { by: amount, transaction: t });
  await Holding.create({ userId, grams, rate }, { transaction: t });
});` }),

  E("What is eager vs lazy loading in Sequelize (N+1)?", ["eager loading", "lazy loading sequelize", "n+1 sequelize", "include"],
    "Eager loading uses include to fetch related data in the same query with a join. Lazy loading fetches related data later with extra queries, which can cause the N+1 problem in loops. For lists, I use include.",
    "include = ek query. Loop mein query = N+1."),

  E("When do you use raw queries in Sequelize?", ["raw query sequelize", "sequelize.query", "replacements"],
    "For complex reports or performance-critical queries that are hard to write with the ORM. I always use replacements or bind parameters, never string concatenation.",
    "Complex report ke liye raw SQL, par placeholders ke saath.",
    { lang: "ts", norun: true, code: `const rows = await sequelize.query(
  "SELECT city_id, COUNT(*) AS total FROM merchants WHERE kyc_status = :status GROUP BY city_id",
  { replacements: { status: "APPROVED" }, type: QueryTypes.SELECT }
);` }),

  E("What are hooks and validations in Sequelize?", ["sequelize hooks", "beforecreate", "sequelize validation"],
    "Validations check field values before saving, like isEmail or a regex. Hooks run code at lifecycle points, like beforeCreate to hash a password or afterUpdate to write an audit log.",
    "Validation = sahi data. Hooks = save se pehle/baad code."),

  E("What is paranoid mode in Sequelize?", ["paranoid", "sequelize soft delete"],
    "paranoid: true enables soft delete. destroy() sets deletedAt instead of removing the row, normal queries skip deleted rows, and restore() brings them back. paranoid: false in a query includes deleted rows.",
    "Soft delete ka built-in tareeka."),
];

export const fintech = [
  E("What do you know about Augmont?", ["augmont", "about augmont", "what do you know about the company", "why augmont"],
    "Augmont is a gold-tech company in India. It runs certified gold refineries and digital gold platforms, where customers can buy and sell gold and silver in small amounts online, start gold SIPs, and convert digital gold into coins or jewellery. Every gram of digital gold is backed by physical gold in insured vaults, and live prices update in real time. So the tech needs to be fast, accurate with money, and very secure.",
    "Gold-tech: refinery + digital gold (buy/sell, SIP, delivery), live rates, vault-backed. [Website pe ek baar latest check kar lena]"),

  E("Why do you want to join Augmont?", ["why join augmont", "why this company augmont"],
    "I've been working on fintech products like a BBPS bill-payment platform and a merchant KYC onboarding platform, so payments, KYC and secure APIs are what I enjoy. Augmont works at the intersection of fintech and a real asset, gold, with live pricing and high transaction volume. I'd like to bring my Angular and Node.js experience there and grow with a product company.",
    "Fintech experience + Angular/Node + real product."),

  E("How would you design a 'Buy Gold' flow?", ["buy gold flow", "digital gold design", "gold purchase flow"],
    "The user enters an amount or grams. The backend gives a live rate with a short lock time, like 5 minutes. On confirm, we create a PENDING transaction with an idempotency key and start payment. When the payment gateway webhook confirms success, inside a database transaction we mark it SUCCESS, add grams to the user's holding and create the invoice with GST. If payment fails or the rate lock expires, the order is marked FAILED and nothing is credited.",
    "Rate lock → PENDING order → payment → webhook → DB transaction mein grams add.",
    { dia: `User (Angular) ──► GET /rates (live, lock 5 min)
       │
       ├─► POST /orders  { grams, rateId, idempotencyKey }  → PENDING
       │
       ├─► Payment gateway ──webhook──► Node API (verify signature)
       │                                   │
       │                    DB transaction: order SUCCESS + holding += grams + invoice
       │
       └─◄ status / WebSocket update` }),

  E("How do you show live gold prices in Angular?", ["live gold price", "real time price angular", "websocket angular", "live rates"],
    "For prices that change every few seconds, I use a WebSocket or server-sent events from the backend and expose the stream as an Observable, or poll the rate API with interval and switchMap. In the component I convert it to a signal or use the async pipe, and show a countdown for the rate lock.",
    "WebSocket/SSE ya interval + switchMap, async pipe se dikhao.",
    { lang: "ts", norun: true, code: `rate$ = timer(0, 5000).pipe(
  switchMap(() => this.api.getGoldRate()),
  distinctUntilChanged((a, b) => a.buy === b.buy),
  shareReplay({ bufferSize: 1, refCount: true })
);
rate = toSignal(this.rate$);` }),

  E("How do you avoid rounding errors with money in JavaScript?", ["rounding money", "floating point money", "0.1 + 0.2", "decimal money javascript"],
    "JavaScript numbers are floating point, so 0.1 plus 0.2 is not exactly 0.3. For money I calculate in the smallest unit, paise, as integers, or use a decimal library, and store values as DECIMAL in MySQL. I round only once at the end with a clear rule.",
    "Paise mein integer calculation, DB mein DECIMAL.",
    { code: `console.log(0.1 + 0.2);
const paise = Math.round(0.1 * 100) + Math.round(0.2 * 100);
console.log(paise / 100);`, out: "0.30000000000000004\n0.3" }),

  E("How do you secure a payments / KYC application?", ["fintech security", "kyc security", "secure payment app"],
    "HTTPS everywhere, JWT with short expiry and refresh tokens, role-based access on every API, server-side validation, rate limiting on OTP and login, encrypting sensitive data like PAN and Aadhaar at rest and masking them in the UI and logs, verifying payment webhook signatures, idempotency keys to avoid double charges, and audit logs for every important change.",
    "HTTPS + JWT + RBAC + mask/encrypt PII + webhook signature + idempotency + audit log."),

  E("How did you build KYC upload in MasterPe?", ["kyc upload", "masterpe kyc", "document upload", "merchant onboarding"],
    "The merchant fills business details, selects category, state and city, and uploads Aadhaar and PAN documents. On the frontend we validate file type and size and PAN format. The backend validates again, stores files with random names in secure storage, saves only the file key in the database, and the admin panel reviews and approves or rejects with a status. [Adjust to your exact implementation]",
    "Form + validation + secure upload + admin approve/reject."),

  E("What is idempotency and why does it matter in payments?", ["idempotency", "idempotency key", "double payment"],
    "Idempotency means the same request done twice has the same effect as once. In payments, the client sends an idempotency key, and the server stores it with a unique constraint. If the request comes again, because of a retry or double click, we return the first result instead of charging again.",
    "Do baar request = ek hi baar effect."),

  E("What is reconciliation?", ["reconciliation", "recon"],
    "Reconciliation means matching our records with the payment gateway's records to find mismatches, like payments that succeeded at the gateway but are still pending on our side. A scheduled job checks them and fixes or flags them.",
    "Apna record vs gateway ka record match karna."),

  E("How do you handle webhooks from a payment gateway?", ["webhook", "payment webhook", "verify webhook signature"],
    "Verify the signature with the gateway secret, check the order and amount, process it idempotently so duplicates are ignored, update the status inside a transaction, and respond quickly with 200, doing heavy work in a background job.",
    "Signature verify → idempotent update → jaldi 200."),

  // runnable fintech programs
  { q: "Program: Format amount in Indian Rupees (₹1,23,456.50)", tags: ["format inr", "indian currency format", "rupee format"], type: "program",
    a: "I'll use Intl.NumberFormat with the en-IN locale and INR currency. It gives the Indian lakh and crore grouping automatically.",
    hi: "en-IN locale se lakh/crore wala comma.", out: "₹1,23,456.50\n₹12,34,56,789.00", cx: "O(1)",
    ex: "en-IN groups digits as 1,23,456 instead of 123,456, and currency INR adds the rupee symbol.",
    ways: [["Intl", `const toINR = n => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(n);
console.log(toINR(123456.5));
console.log(toINR(123456789));`],
      ["Manual (no Intl)", `function toINR(n) {
  const [int, dec] = n.toFixed(2).split(".");
  const last3 = int.slice(-3);
  const rest = int.slice(0, -3).replace(/\\B(?=(\\d{2})+(?!\\d))/g, ",");
  return "₹" + (rest ? rest + "," : "") + last3 + "." + dec;
}
console.log(toINR(123456.5));
console.log(toINR(123456789));`]],
    cross: [["In Angular?", "Use the currency pipe: {{ amount | currency:'INR':'symbol':'1.2-2' }} with the en-IN locale registered."]] },

  { q: "Program: Mask PAN / Aadhaar / mobile number", tags: ["mask pan", "mask aadhaar", "mask data", "masking"], type: "program",
    a: "I'll keep only the last 4 characters visible and replace the rest with X.",
    hi: "Last 4 dikhao, baaki X.", out: "XXXXXXXX9012\nXXXXXX234F\n******3210", cx: "O(n)",
    ex: "slice(-4) keeps the last 4 characters, and repeat adds the mask for the rest.",
    ways: [["Code", `const mask = (value, visible = 4, ch = "X") =>
  ch.repeat(Math.max(0, value.length - visible)) + value.slice(-visible);

console.log(mask("123456789012"));
console.log(mask("ABCDE1234F"));
console.log(mask("9876543210", 4, "*"));`]],
    cross: [["Where should masking happen?", "On the backend before sending the response, so the full number never reaches the browser. The UI can mask again for display."]] },

  { q: "Program: Validate PAN, mobile, IFSC and email", tags: ["validate pan", "pan regex", "ifsc regex", "mobile validation", "regex validation"], type: "program",
    a: "I'll use regular expressions for each format and test the value.",
    hi: "Har field ka regex.", out: "true false\ntrue false\ntrue\ntrue", cx: "O(n)",
    ex: "PAN is 5 letters, 4 digits, 1 letter. Indian mobile starts with 6 to 9 and has 10 digits. IFSC is 4 letters, a zero, then 6 characters.",
    ways: [["Code", `const rules = {
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  mobile: /^[6-9]\\d{9}$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
};
console.log(rules.pan.test("ABCDE1234F"), rules.pan.test("ABC1234F"));
console.log(rules.mobile.test("9876543210"), rules.mobile.test("5876543210"));
console.log(rules.ifsc.test("HDFC0001234"));
console.log(rules.email.test("vivek@test.com"));`]],
    cross: [["Is frontend validation enough?", "No, the backend must validate again because the frontend can be bypassed."]] },

  { q: "Program: Calculate gold grams for an amount (with 3% GST)", tags: ["gold calculation", "grams from amount", "gst calculation", "buy gold calculation"], type: "program",
    a: "Amount includes GST, so I first remove GST to get the gold value, then divide by the rate per gram, and round grams down to 4 decimals so we never give extra gold.",
    hi: "GST hatao, rate se divide, 4 decimal tak round down.", out: '{"goldValue":970.87,"gst":29.13,"grams":0.1383}', cx: "O(1)",
    ex: "1000 ÷ 1.03 = 970.87 gold value, GST is the rest, and grams are rounded down with Math.floor.",
    ways: [["Code", `function buyGold(amount, ratePerGram, gstRate = 0.03) {
  const goldValue = Math.round((amount / (1 + gstRate)) * 100) / 100;
  const gst = Math.round((amount - goldValue) * 100) / 100;
  const grams = Math.floor((goldValue / ratePerGram) * 10000) / 10000;
  return { goldValue, gst, grams };
}
console.log(buyGold(1000, 7019.5));`]],
    cross: [["Why round grams down?", "So the company never credits more gold than paid for. The tiny remaining value is shown to the user transparently."], ["Where should this run?", "On the backend with the locked rate. The frontend only shows a preview."]] },

  { q: "Program: Generate a 6-digit OTP and check expiry", tags: ["otp", "generate otp", "otp expiry"], type: "program",
    a: "I'll generate a random 6-digit number, save it with an expiry time, and verify both the value and the time.",
    hi: "6 digit random + expiry time.", out: "6 true\ntrue\nfalse", cx: "O(1)",
    ex: "padStart keeps it 6 digits. In production, use crypto.randomInt and store a hash of the OTP, not the plain value.",
    ways: [["Code", `function createOtp(ttlMs = 5 * 60 * 1000) {
  const code = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  return { code, expiresAt: Date.now() + ttlMs };
}
const verify = (otp, input, now = Date.now()) => otp.code === input && now < otp.expiresAt;

const otp = createOtp();
console.log(otp.code.length, /^\\d{6}$/.test(otp.code));
console.log(verify(otp, otp.code));
console.log(verify(otp, otp.code, otp.expiresAt + 1));`]],
    cross: [["How do you stop OTP brute force?", "Limit attempts per mobile, rate limit the API, and expire the OTP after a few wrong tries."]] },
];

export const angularResume = [
  E("Tell me about yourself (Angular / Full-Stack).", ["tell me about yourself", "introduce yourself", "introduction", "intro", "about yourself", "tell me about yourself angular", "augmont intro"],
    "Hi, I'm Vivek Mishra. I'm a Full-Stack Developer with over four and a half years of experience, mainly in Angular, from version 7 to 20, along with TypeScript, RxJS, Node.js and Express. I started as an Angular intern, then worked at Code B, and at Boldsoftmation I built a multi-department CRM in Angular. At Adecco I worked on a finance web app for Mahindra Finance. Currently at Champion Software Technologies, I work on 360Pass, a society management app, and on fintech products: a BBPS bill-payment platform and MasterPe, a merchant onboarding platform with KYC. Now I'm looking for a product company in fintech where I can grow as a full-stack engineer.",
    "Naam → 4.5+ yrs Angular + Node → CRM → Mahindra Finance → current (360Pass, BBPS, MasterPe) → fintech growth."),

  E("Explain the CRM you built in Angular.", ["angular crm", "crm project", "boldsoftmation crm"],
    "It was a multi-department CRM for leads, invoices, follow-ups and dispatch. I built feature modules with lazy-loaded routes, reusable components with Angular Material and SCSS, shared services, and route guards for role-based access. APIs were called with HttpClient and RxJS, and an HTTP interceptor added the token and handled errors centrally. Reactive forms with validations handled lead creation, assignment, status tracking and follow-up reminders.",
    "Modules + lazy loading + guards + interceptor + reactive forms."),

  E("Which Angular version did you use in the CRM and in 360Pass?", ["angular version used", "which angular version"],
    "The CRM was in Angular 14 with feature modules. 360Pass uses Angular 20 with standalone components and signals. [Make sure this matches what you wrote in your resume and email]",
    "Resume aur email mein same version bolna."),

  E("How do you use Signals in your current project?", ["signals in project", "360pass signals"],
    "I keep UI state like filters, selected society and counts in signals, use computed for derived values like pending counts, and convert API Observables with toSignal. Components use OnPush, so only the parts that read a changed signal update.",
    "State = signals, derived = computed, API = toSignal."),

  E("How did you implement the live visitor dashboard?", ["visitor dashboard", "live dashboard", "360pass dashboard"],
    "The dashboard shows visitors inside and exited, with clickable stat cards as filters. Data comes from REST APIs and refreshes on an interval, the stat cards are computed from the list, and durations update live. Role-based access decides what Admin, Resident and Gatekeeper see.",
    "API + interval refresh + computed stats + role-based view."),

  E("What did you do on the Mahindra Finance project?", ["mahindra finance", "adecco project"],
    "At Adecco, for the client Mahindra Finance, I developed responsive screens for a finance web application integrated with REST APIs, and improved page load speed with lazy loading and reusable components.",
    "Responsive screens + APIs + lazy loading."),

  E("How much experience do you have in Node.js and MySQL?", ["node experience", "mysql experience", "backend experience"],
    "Around two years in Node.js and Express building REST APIs with JWT and role-based access, and over a year with MySQL using Sequelize in production, including schema design, associations, transactions and soft delete.",
    "Node 2+ yrs, MySQL 1+ yr (Sequelize). Email ke numbers ke saath match."),

  E("What is your notice period and expected CTC?", ["notice period", "expected ctc", "current ctc", "salary expectation"],
    "My notice period is 30 days and it's negotiable. My current CTC is [current CTC] and my expectation is [expected CTC], but I'm open to discussion based on the role.",
    "Jo numbers email mein bheje the, wahi bolo — app public hai isliye yahan nahi likhe."),

  E("How do you use AI coding tools in your work?", ["ai tools", "claude", "ai coding assistant"],
    "I use AI assistants like Claude daily for boilerplate, exploring approaches, debugging and documentation. I always review, understand and test the code before committing, and I never paste secrets or client data into them.",
    "Speed ke liye use, par samajh ke aur test karke."),
];
