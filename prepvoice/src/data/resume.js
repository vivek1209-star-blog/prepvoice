// Resume-based — [ ] wale part apni real detail se bolna
const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, ...x });

export default [
  E("Tell me about yourself.", ["tell me about yourself", "introduce yourself", "introduction", "intro", "about yourself"],
    "Hi, I'm Vivek Mishra. I have over four years of experience as a Full-Stack MERN developer. I started at Code B, then worked at Boldsoftmation and Adecco. Currently, I'm at Champion Software Technologies, working on MasterPe. Before that, I worked on 360Pass, a society management platform, and a BBPS bill-payment platform. I work across the full stack: React and Redux on the frontend, and Node.js, Express, MongoDB and MySQL on the backend. Now I'm looking to grow on bigger projects.",
    "Naam → experience → companies → current project → stack → kyun change. 60 second."),

  E("Explain your professional journey.", ["professional journey", "career journey", "work experience"],
    "I started with React Native apps at Code B. At Boldsoftmation, I worked on a CRM and a lead management app. At Adecco, I worked on UI for Mahindra Finance. At Champion, I work full-stack on production SaaS products. Each step moved me from UI towards full-stack ownership.",
    "Har company se ek learning bolo."),

  E("What are your roles and responsibilities?", ["roles and responsibilities", "responsibilities", "your role"],
    "I build features end to end: React pages, reusable components, Redux state and API integration on the frontend, and Node.js and Express APIs on the backend. I also fix production bugs and coordinate with the backend developer and my senior.",
    "Frontend + backend + bug fixing + coordination."),

  E("Explain your current project.", ["current project", "explain your project", "your project"],
    "My current project is MasterPe. [Explain in one line what MasterPe does, your modules and the tech stack you use.] Before this, I worked on 360Pass, a society and gate management platform with Super Admin, Society Admin, Gatekeeper and Resident roles.",
    "MasterPe ka 1 line kaam + tumhara part. Apni real detail bharo."),

  E("Explain the 360Pass project.", ["360pass", "360 pass", "society management", "gate management"],
    "360Pass is a society and gate management SaaS. It has four roles: Super Admin, Society Admin, Gatekeeper and Resident. It manages visitors, residents, flats, notices, amenities and complaints. The frontend is React with Redux Toolkit, and the backend is Node.js, Express and MySQL with JWT authentication.",
    "Kya hai → roles → features → stack."),

  E("Explain the BBPS bill-payment platform.", ["bbps", "bill payment", "crezzo", "fintech project"],
    "It's a BBPS bill-payment platform integrated with payment gateways like BillDesk and Razorpay. Users fetch their bill, pay through the gateway, and we confirm the payment through webhooks. Key parts are webhook handling, avoiding double payments, and reconciliation of pending transactions.",
    "Bill fetch → pay → webhook confirm → reconciliation."),

  E("What is MasterPe?", ["masterpe", "master pe"],
    "[MasterPe is … — explain the product in one line, who uses it, and what you built in it.]",
    "Ye tum khud bharo, main details nahi jaanta."),

  E("What is your contribution to the project?", ["contribution", "your contribution"],
    "In 360Pass, I built the frontend architecture: routing with protected routes, the Redux module pattern, and shared components like tables, modals and drawers. I built modules like notices, amenities, gatekeepers, residents, complaints and bulk upload from Excel.",
    "3-4 cheezein jo tumne khud banayi."),

  E("How did you manage state in your project?", ["state management in project", "project state management"],
    "We used Redux Toolkit. Each module has a thunk for API calls, a slice for state and selectors to read data. Pages use a custom hook, so they don't talk to Redux directly. Local UI state like modals stays in useState.",
    "Redux Toolkit + custom hook per module."),

  E("How did you implement authentication in your project?", ["authentication in project", "login in project", "otp login"],
    "Users log in with OTP and get a JWT. An axios interceptor adds the token to every request. If the token is invalid, the user is logged out automatically. Routes are protected based on the user's role.",
    "OTP → JWT → interceptor → role based routes."),

  E("How do you make sure one society can't see another society's data?", ["tenant isolation", "data isolation", "society data"],
    "The society id is taken from the JWT on the server, not from the URL. Every query is filtered by that society id, so even if someone changes an id in the request, they can't access other data.",
    "Society id token se, URL se nahi."),

  E("How does the bulk Excel upload work?", ["bulk upload", "excel upload", "bulk import"],
    "The user uploads an Excel file, we read it in the browser using SheetJS, validate every row, and show a preview with errors. Only valid rows are sent to the API.",
    "Excel padho → validate → preview → valid rows bhejo."),

  E("What challenges have you faced?", ["challenges", "challenge", "difficult bug", "hardest bug"],
    "Admins weren't getting push notifications. Logs showed they had no registered devices. The root cause was the web app wasn't sending the device id after login. I fixed the frontend to register it, and notifications started working.",
    "Problem → logs → root cause → fix. Ek real story."),

  E("Tell me about your npm libraries.", ["npm library", "npm libraries", "open source", "react-bulk-excel-import", "react-query-session-guard"],
    "I've published two React libraries on npm. react-bulk-excel-import gives a ready Excel upload modal and a hook with validation. react-query-session-guard clears cached data on logout, so one user's data doesn't show to the next user.",
    "Dono library ka naam + 1 line kaam."),

  E("Why are you looking for a job change?", ["job change", "why change", "why leaving"],
    "I've learned a lot in my current role. Now I want to work on larger applications with bigger teams and better processes, so I can grow faster as a full-stack developer.",
    "Growth. Current company ki burai kabhi nahi."),

  E("Why do you want to join our company?", ["why join", "why this company", "why capgemini"],
    "Your company works on large projects for global clients, which will give me exposure to real scale and good engineering practices. My MERN and fintech experience fits well here.",
    "Bada scale + seekhna + mera experience match."),

  E("Why should we hire you?", ["why hire you", "why should we hire"],
    "I have four years of real production experience in the MERN stack. I can handle a feature end to end, from UI to API to database, and I take ownership. I've also published two npm libraries on my own.",
    "Experience + ownership + initiative."),

  E("What are your strengths and weaknesses?", ["strengths", "weaknesses", "strength and weakness"],
    "My strength is debugging. I like finding the real root cause of a problem. My weakness is that I sometimes try to solve everything alone for too long. Now I ask for help if I'm stuck for more than an hour.",
    "Real weakness + kaise sudhaar rahe ho."),

  E("What is your biggest achievement?", ["achievement", "biggest achievement"],
    "Building the frontend architecture of 360Pass that all modules follow, and publishing two open-source React libraries on npm.",
    "Ek work + ek personal."),

  E("Where do you see yourself in 5 years?", ["5 years", "five years", "future plan"],
    "I see myself as a senior full-stack developer or tech lead, designing features and helping juniors grow.",
    "Senior/lead banna."),

  E("What do you do when you don't know an answer?", ["don't know answer", "dont know", "not sure"],
    "I'm honest about it. I say I haven't worked on it much, explain how I would approach it, and then learn it properly.",
    "Honest raho, approach batao."),

  E("Do you have any questions for us?", ["questions for us", "any questions", "ask interviewer"],
    "Yes. What kind of project and tech stack would I work on? And what would you expect from me in the first three months?",
    "Hamesha 1–2 question pucho."),
];
