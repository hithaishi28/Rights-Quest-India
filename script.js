/* Rights Quest India
   Child-friendly educational prototype for Children's Rights and Legal Awareness.
   Frontend is written as modular component functions. The localStorage adapter below
   acts as the prototype database; replace it with Firebase/MongoDB calls in production.
*/

const DB_KEY = "rightsQuestIndiaAppUsers";
const SESSION_KEY = "rightsQuestIndiaAppSession";
const VIDEO_RETURN_KEY = "rightsQuestIndiaReturnFromVideo";
const LANG_KEY = "rightsQuestIndiaLanguage";
const DEFAULT_LANGUAGE = "en";
const supportedLanguages = [
  { code: "en", label: "English", short: "EN", dir: "ltr", speech: "en-IN" },
  { code: "hi", label: "हिन्दी", short: "हि", dir: "ltr", speech: "hi-IN" },
  { code: "kn", label: "ಕನ್ನಡ", short: "ಕ", dir: "ltr", speech: "kn-IN" }
];

// Educational YouTube links. These are converted into safe embed iframe URLs.
const videoLibrary = [
  { title: "Module 1: Right to Care, Protection and Development", url: "https://youtu.be/y6s2FPowcsA?si=AVDTDE2jBSX6Qzrg" },
  { title: "Module 2: Right to Education", url: "https://youtu.be/2izn9XSNzww?si=rsTU95jTyb_5sSl6" },
  { title: "Module 3: Right to Protection from Abuse and Exploitation", url: "https://youtu.be/q8Xg3AlBHZc?si=0xqUnie-bdYDuLrh" },
  { title: "Module 4: Right to Child-Friendly Justice", url: "https://www.youtube.com/watch?v=DuOV83fTf3k" },
  { title: "Module 5: Right to Presumption of Innocence", url: "https://youtu.be/bRT1YB5xmcM?si=mpCAonQU1jiWmtbC" },
  { title: "Module 6: Right to Legal Aid", url: "https://youtu.be/N5n7BAddD-w?si=lU0x8t3UFSijG2C2" },
  { title: "Module 7: Right to Rehabilitation and Reintegration", url: "https://youtu.be/4qwZk2w8suA?si=XBlPjzBr5r-Yon86" },
  { title: "Module 8: Right to be Heard", url: "https://youtu.be/Om4MGnmFKyQ?si=QyBw7NxwzzuEAyAO" },
  { title: "Module 9: Right to Privacy, Dignity and Confidentiality", url: "https://youtube.com/watch?v=yiKeLOKc1tw&feature=shared" },
  { title: "Module 10: Right to Health, Nutrition and a Dignified Life", url: "https://youtu.be/c06dTj0v0sM?si=hImFes7UOZ5--fix" },
  { title: "Module 11: Additional Legal Awareness Video", url: "https://www.youtube.com/watch?v=TafvHxXFzUM" }
];

// Four required learning modules with story cards and quiz assessments.
const modules = [
  {
    id: "child-rights",
    icon: "🌈",
    title: "Child Rights",
    level: "Beginner",
    badge: "Rights Explorer",
    story: "Maya learns that every child deserves care, safety, learning, play, and respect.",
    points: 30,
    color: "pink",
    quiz: [
      {
        question: "What are child rights?",
        options: ["Promises that protect children", "Only school homework", "Prizes for marks"],
        answer: 0,
        explain: "Child rights help children grow safely, learn, and be respected."
      },
      {
        question: "Every child deserves dignity and care.",
        options: ["True", "False"],
        answer: 0,
        explain: "Correct. Rights belong to every child."
      },
      {
        question: "Which action shows respect for a child's right to be heard?",
        options: ["Listening when the child shares a worry", "Ignoring the child", "Laughing at the child"],
        answer: 0,
        explain: "Children have the right to share opinions and complaints safely."
      },
      {
        question: "A child found begging should be helped with safety, food, learning, and care.",
        options: ["True", "False"],
        answer: 0,
        explain: "Children in distress need protection, development, and rehabilitation."
      },
      {
        question: "Who should get child rights?",
        options: ["Every child", "Only toppers", "Only older children"],
        answer: 0,
        explain: "Rights belong to every child equally."
      },
      {
        question: "What should a child do if something feels unfair or unsafe?",
        options: ["Tell a trusted adult", "Stay silent forever", "Run away without help"],
        answer: 0,
        explain: "Trusted adults and child support services can help protect children."
      }
    ]
  },
  {
    id: "pocso",
    icon: "🛡️",
    title: "POCSO Act",
    level: "Intermediate",
    badge: "Safety Star",
    story: "A safe teacher explains that unsafe touch, threats, and secrets should be reported.",
    points: 40,
    color: "blue",
    quiz: [
      {
        question: "If a child feels unsafe, what should they do?",
        options: ["Tell a trusted adult", "Keep an unsafe secret", "Handle it alone"],
        answer: 0,
        explain: "A trusted adult, teacher, counselor, or helpline can help."
      },
      {
        question: "A child's identity should be protected in sensitive cases.",
        options: ["True", "False"],
        answer: 0,
        explain: "Correct. Privacy and dignity are important."
      },
      {
        question: "What is an unsafe secret?",
        options: ["A secret that makes a child scared or uncomfortable", "A surprise birthday plan", "A quiz answer"],
        answer: 0,
        explain: "Unsafe secrets should be shared with a trusted adult."
      },
      {
        question: "Children should work in hazardous factories.",
        options: ["False", "True"],
        answer: 0,
        explain: "Children must be protected from unsafe work and exploitation."
      },
      {
        question: "If someone threatens a child, the safest step is to:",
        options: ["Move near a safe adult and tell them", "Keep quiet", "Meet the person alone"],
        answer: 0,
        explain: "Safety comes first. A trusted adult or helpline can support the child."
      },
      {
        question: "POCSO supports children's safety and dignity.",
        options: ["True", "False"],
        answer: 0,
        explain: "POCSO is designed to protect children from sexual offences."
      }
    ]
  },
  {
    id: "juvenile-justice",
    icon: "⚖️",
    title: "Juvenile Justice Act",
    level: "Intermediate",
    badge: "Fair Judge",
    story: "Aarav plays Judge the Case and learns that children need counselling and support.",
    points: 40,
    color: "green",
    quiz: [
      {
        question: "What is child-friendly justice?",
        options: ["Fair treatment and guidance", "Harsh punishment first", "No listening"],
        answer: 0,
        explain: "Children should be heard and supported through fair processes."
      },
      {
        question: "Children in distress may need rehabilitation.",
        options: ["True", "False"],
        answer: 0,
        explain: "Correct. Support helps children return to normal life."
      },
      {
        question: "A child accused of a mistake should first get:",
        options: ["A fair inquiry and support", "Immediate jail", "No chance to speak"],
        answer: 0,
        explain: "Child-friendly justice checks facts and gives children a chance to be heard."
      },
      {
        question: "Presumption of innocence means:",
        options: ["A child is considered innocent until facts prove otherwise", "A child is always punished first", "No one listens"],
        answer: 0,
        explain: "Fair justice does not assume guilt without checking evidence."
      },
      {
        question: "Legal aid can help a child by providing:",
        options: ["Free legal help when needed", "Extra homework", "A sports prize"],
        answer: 0,
        explain: "Children who need legal support can receive help through legal aid systems."
      },
      {
        question: "Counselling can be part of child-friendly justice.",
        options: ["True", "False"],
        answer: 0,
        explain: "Counselling and guidance can help children grow safely after distress."
      }
    ]
  },
  {
    id: "constitutional-rights",
    icon: "📜",
    title: "Constitutional Rights",
    level: "Advanced",
    badge: "Constitution Champ",
    story: "Maya unlocks school worlds while learning about education, health, equality, and dignity.",
    points: 50,
    color: "orange",
    quiz: [
      {
        question: "Article 21A supports which right?",
        options: ["Education for children aged 6-14", "Only sports", "Only exams"],
        answer: 0,
        explain: "Article 21A supports free and compulsory education for children aged 6 to 14."
      },
      {
        question: "Equality means every child deserves fair treatment.",
        options: ["True", "False"],
        answer: 0,
        explain: "Correct. Fairness is central to constitutional values."
      },
      {
        question: "The Right to Education mainly supports children aged:",
        options: ["6 to 14 years", "Only 18 years and above", "Only 3 to 5 years"],
        answer: 0,
        explain: "Article 21A supports free and compulsory education for children aged 6 to 14."
      },
      {
        question: "A healthy, dignified life includes:",
        options: ["Food, healthcare, safety, and respect", "Only games", "Only exams"],
        answer: 0,
        explain: "Children need nutrition, health, protection, and dignity to develop well."
      },
      {
        question: "Treating children differently because of background is fair.",
        options: ["False", "True"],
        answer: 0,
        explain: "Equality means every child deserves fair treatment."
      },
      {
        question: "If a child is out of school, adults should help the child return to learning.",
        options: ["True", "False"],
        answer: 0,
        explain: "Education is a right, and support should help children continue learning."
      }
    ]
  },
  {
    id: "additional-legal-awareness",
    icon: "&#128161;",
    title: "Additional Legal Awareness",
    level: "Advanced",
    badge: "Legal Awareness Champion",
    story: "Children review key safety, rights, and support lessons, then practice choosing calm and legal next steps.",
    points: 55,
    color: "blue",
    quiz: makeModuleQuiz("Additional Legal Awareness", "Pause, stay safe, and ask a trusted adult for help", "Children can use trusted adults, Childline 1098, school support, and legal aid when needed", "A child feels unsafe, confused, or pressured and is asked to stay silent")
  }
];

function makeModuleQuiz(rightTitle, safeAction, legalHelp, dangerSign) {
  return [
    {
      question: `In the ${rightTitle} video, what is the safest first step for a child who needs help?`,
      options: [safeAction, "Stay silent and wait", "Hide the problem from everyone", "Try to solve it alone"],
      answer: 0,
      explain: `${safeAction} is safest because children should not handle difficult situations alone.`
    },
    {
      question: `Which adult can a child speak to about ${rightTitle}?`,
      options: ["A trusted parent, teacher, counselor, or Childline 1098", "Only a stranger online", "Nobody at all", "Only another child"],
      answer: 0,
      explain: "Trusted adults and Childline 1098 can guide children safely in India."
    },
    {
      question: `What does ${rightTitle} teach children?`,
      options: [legalHelp, "Children have no voice", "Only marks matter", "Unsafe secrets are okay"],
      answer: 0,
      explain: `${rightTitle} helps children understand safety, dignity, and support.`
    },
    {
      question: `Which is a warning sign in this module?`,
      options: [dangerSign, "A teacher explaining rights kindly", "A parent helping with school", "A friend playing safely"],
      answer: 0,
      explain: `A warning sign should be shared with a trusted adult quickly.`
    },
    {
      question: "If a child feels scared while learning this topic, what should they remember?",
      options: ["They are not in trouble for asking for help", "They should feel ashamed", "They must keep quiet", "They should stop learning forever"],
      answer: 0,
      explain: "Children deserve calm support. Asking for help is brave and safe."
    },
    {
      question: `Which choice follows the message of the ${rightTitle} video?`,
      options: ["Speak up kindly and ask for safe support", "Ignore unsafe behavior", "Trust every online message", "Hide injuries or fear"],
      answer: 0,
      explain: "Speaking up to safe people helps protect children."
    },
    {
      question: "Why are videos and quizzes used after each module?",
      options: ["To remember rights through stories and practice", "To scare children", "To replace trusted adults", "To make learning confusing"],
      answer: 0,
      explain: "Stories and quizzes help children remember what to do in real life."
    },
    {
      question: "What should a child do before taking a big decision in a legal or safety problem?",
      options: ["Talk to a trusted adult or child support service", "Act alone immediately", "Believe rumors", "Post private details online"],
      answer: 0,
      explain: "Children should get guidance before decisions involving safety or law."
    },
    {
      question: `What is one child-friendly legal support linked to ${rightTitle}?`,
      options: ["Childline 1098, school support, police child desk, or legal aid", "No help is available", "Only punishment", "Only social media comments"],
      answer: 0,
      explain: "India has child support systems that can guide and protect children."
    },
    {
      question: `What is the best learning action after watching the ${rightTitle} video?`,
      options: ["Answer the quiz slowly and ask Rights Buddy if confused", "Skip every question", "Guess without reading", "Keep doubts secret"],
      answer: 0,
      explain: "Slow learning, asking questions, and using help builds confidence."
    }
  ];
}

function makeQuizState(module) {
  return {
    index: 0,
    score: 0,
    selected: null,
    answered: false,
    feedback: "",
    complete: false,
    optionOrders: module.quiz.map((question, questionIndex) => optionOrderFor(module.id, questionIndex, question.options.length))
  };
}

function optionOrderFor(moduleId, questionIndex, count) {
  const order = Array.from({ length: count }, (_, index) => index);
  if (count <= 1) return order;
  const moduleSeed = Math.max(1, moduleIndex(moduleId) + 1);
  const shift = (moduleSeed + questionIndex * 2 + 1) % count || 1;
  return order.slice(shift).concat(order.slice(0, shift));
}

const tenRightModules = [
  {
    id: "care-protection-development",
    icon: "🛟",
    title: "Right to Care, Protection and Development",
    level: "Beginner",
    badge: "Protector Hero",
    story: "A child in distress is taken to a safe shelter with food, school support, healthcare, and caring adults.",
    points: 30,
    color: "pink",
    quiz: makeModuleQuiz("Right to Care, Protection and Development", "Go near a safe adult and ask for care", "Every child must be safe, cared for, and supported to grow", "A child is left without food, school, or safe shelter")
  },
  {
    id: "right-to-education",
    icon: "📚",
    title: "Right to Education",
    level: "Beginner",
    badge: "School World Explorer",
    story: "A rescued child joins school again and receives learning support from teachers and friends.",
    points: 35,
    color: "blue",
    quiz: makeModuleQuiz("Right to Education", "Tell a trusted adult if a child is kept away from school", "Children aged 6 to 14 should get free and compulsory education", "A child is forced to miss school again and again")
  },
  {
    id: "protection-abuse-exploitation",
    icon: "🛡️",
    title: "Protection from Abuse and Exploitation",
    level: "Intermediate",
    badge: "Safety Star",
    story: "Children learn to spot unsafe touch, threats, child labour, and exploitation, then tell a trusted adult.",
    points: 40,
    color: "green",
    quiz: makeModuleQuiz("Protection from Abuse and Exploitation", "Say no, move away, and tell a trusted adult", "POCSO and child labour protections help keep children safe", "Someone asks a child to keep an unsafe secret")
  },
  {
    id: "child-friendly-justice",
    icon: "⚖️",
    title: "Right to Child-Friendly Justice",
    level: "Intermediate",
    badge: "Fair Judge",
    story: "A child who makes a mistake is heard calmly and guided through counselling instead of harsh punishment.",
    points: 40,
    color: "orange",
    quiz: makeModuleQuiz("Right to Child-Friendly Justice", "Ask for a trusted adult, counselor, or child-friendly officer", "Children should be heard, guided, and treated fairly", "A child is shouted at before facts are checked")
  },
  {
    id: "presumption-innocence",
    icon: "🔎",
    title: "Right to Presumption of Innocence",
    level: "Intermediate",
    badge: "Truth Finder",
    story: "A child accused of damage gets a fair inquiry before anyone decides what happened.",
    points: 40,
    color: "pink",
    quiz: makeModuleQuiz("Right to Presumption of Innocence", "Ask adults to check facts calmly and fairly", "A child is considered innocent until facts prove otherwise", "People blame a child without listening")
  },
  {
    id: "legal-aid",
    icon: "🤝",
    title: "Right to Legal Aid",
    level: "Intermediate",
    badge: "Legal Helper",
    story: "A child who cannot afford a lawyer receives free legal support and child-friendly guidance.",
    points: 45,
    color: "blue",
    quiz: makeModuleQuiz("Right to Legal Aid", "Ask for free legal help through a trusted adult or authority", "Children can get legal help when they need support", "A child is told only rich people can get legal help")
  },
  {
    id: "rehabilitation-reintegration",
    icon: "🌱",
    title: "Right to Rehabilitation and Reintegration",
    level: "Advanced",
    badge: "Recovery Hero",
    story: "A child rescued from labour receives counselling, school support, healthcare, and a safe return to normal life.",
    points: 45,
    color: "green",
    quiz: makeModuleQuiz("Right to Rehabilitation and Reintegration", "Accept counselling, school support, and safe care", "Children should be helped to recover and return to normal life", "A rescued child is sent back to the same unsafe situation")
  },
  {
    id: "right-to-be-heard",
    icon: "🗣️",
    title: "Right to be Heard",
    level: "Advanced",
    badge: "Brave Voice",
    story: "A child reports mistreatment in a shelter and caring authorities listen and take action.",
    points: 45,
    color: "orange",
    quiz: makeModuleQuiz("Right to be Heard", "Share worries with a trusted adult or complaint box", "Children can express opinions and complaints safely", "Adults ignore a child's complaint about mistreatment")
  },
  {
    id: "privacy-dignity-confidentiality",
    icon: "🔐",
    title: "Right to Privacy, Dignity and Confidentiality",
    level: "Advanced",
    badge: "Safe Space Guardian",
    story: "A child in a sensitive case is treated respectfully, and private identity details are protected.",
    points: 50,
    color: "pink",
    quiz: makeModuleQuiz("Right to Privacy, Dignity and Confidentiality", "Ask adults to protect private details and dignity", "A child's identity should be protected in sensitive legal processes", "Someone shares a child's private story or photo without permission")
  },
  {
    id: "health-nutrition-dignified-life",
    icon: "🍎",
    title: "Right to Health, Nutrition and a Dignified Life",
    level: "Advanced",
    badge: "Healthy Life Builder",
    story: "An abandoned child receives medical care, food, clean shelter, and long-term support.",
    points: 50,
    color: "green",
    quiz: makeModuleQuiz("Right to Health, Nutrition and a Dignified Life", "Ask for medical care, food, and safe shelter support", "Every child deserves health, nutrition, safety, and dignity", "A child is denied food, medicine, or safe surroundings")
  },
  {
    id: "additional-legal-awareness",
    icon: "&#128161;",
    title: "Additional Legal Awareness",
    level: "Advanced",
    badge: "Legal Awareness Champion",
    story: "Children review key safety, rights, and support lessons, then practice choosing calm and legal next steps.",
    points: 55,
    color: "blue",
    quiz: makeModuleQuiz("Additional Legal Awareness", "Pause, stay safe, and ask a trusted adult for help", "Children can use trusted adults, Childline 1098, school support, and legal aid when needed", "A child feels unsafe, confused, or pressured and is asked to stay silent")
  }
];

modules.splice(0, modules.length, ...tenRightModules);
modules.slice(0, 5).forEach((module) => {
  module.quiz = module.quiz.slice(0, 5);
});

const supportiveDistractors = [
  "Ask a trusted adult first",
  "Wait without telling anyone",
  "Choose the safest action",
  "Ignore the problem"
];

modules.forEach((module, moduleOrder) => {
  module.quiz.forEach((question, questionOrder) => {
    const pool = supportiveDistractors.filter((option) => !question.options.includes(option));
    while (question.options.length < 4) {
      question.options.push(pool.shift() || `Safe choice ${moduleOrder + 1}.${questionOrder + question.options.length}`);
    }
  });
});

const badgeCatalog = [
  "First Lesson Completed",
  "Rights Explorer",
  "Safety Star",
  "Fair Judge",
  "Constitution Champ",
  "Quiz Master",
  "Child Rights Champion"
];

const shopItems = [
  { id: "books", title: "New School Books", cost: 80, icon: "📚" },
  { id: "bag", title: "Bright School Bag", cost: 120, icon: "🎒" },
  { id: "art-kit", title: "Creative Art Kit", cost: 160, icon: "🎨" },
  { id: "lunch-box", title: "Healthy Lunch Box", cost: 100, icon: "🍱" },
  { id: "water-bottle", title: "Smart Water Bottle", cost: 110, icon: "🧴" },
  { id: "pencil-kit", title: "Color Pencil Kit", cost: 140, icon: "✏️" },
  { id: "sports-kit", title: "Sports Kit", cost: 180, icon: "🏏" },
  { id: "study-lamp", title: "Study Lamp", cost: 210, icon: "💡" },
  { id: "science-kit", title: "Mini Science Kit", cost: 230, icon: "🔬" },
  { id: "cycle", title: "New Cycle", cost: 250, icon: "🚲" },
  { id: "school-shoes", title: "Comfort School Shoes", cost: 270, icon: "👟" },
  { id: "dictionary", title: "Picture Dictionary", cost: 300, icon: "📖" },
  { id: "raincoat", title: "Rainy Day Kit", cost: 320, icon: "☔" },
  { id: "library-pass", title: "Library Adventure Pass", cost: 350, icon: "🏛️" },
  { id: "music-kit", title: "Music Practice Kit", cost: 380, icon: "🎵" },
  { id: "tablet", title: "Learning Tablet", cost: 420, icon: "📱" },
  { id: "field-trip", title: "Museum Field Trip", cost: 480, icon: "🚌" },
  { id: "coding-kit", title: "Beginner Coding Kit", cost: 540, icon: "💻" },
  { id: "scholarship", title: "Dream Scholarship", cost: 600, icon: "🎓" }
];

const avatarOptions = [
  { id: "star", icon: "&#11088;", label: "Star Learner" },
  { id: "rocket", icon: "&#128640;", label: "Rocket Explorer" },
  { id: "book", icon: "&#128218;", label: "Book Hero" },
  { id: "shield", icon: "&#128737;", label: "Safety Hero" },
  { id: "rainbow", icon: "&#127752;", label: "Kind Friend" },
  { id: "planet", icon: "&#129680;", label: "Space Thinker" }
];

let users = loadUsers();
let sessionEmail = shouldRestoreAfterVideo() ? localStorage.getItem(SESSION_KEY) : null;
let view = sessionEmail ? "dashboard" : "home";
let authMode = "signup";
let authAudience = "ask";
let selectedModuleId = modules[0]?.id || "care-protection-development";
let quizState = null;
let authMessage = "";
let activeVideo = null;
let assistantOpen = false;
let assistantExpanded = false;
let assistantPanelPosition = null;
let currentLanguage = detectInitialLanguage();
let translations = {};
const translationCache = {};
let assistantStatus = "assistant.status.tap";
let activeRecognition = null;
let activeAssistantAudio = null;
let pendingRewardCelebration = null;
let pendingBadgeCelebrations = [];
let lastButtonSoundAt = 0;
let preferredAssistantVoiceName = "";
let assistantMessages = [
  {
    from: "assistant",
    textKey: "assistant.welcome"
  }
];

const situationPrompts = [
  ["unsafe-touch", "Someone touched me in a way I did not like.", "I am glad you told me. Your body belongs to you. Move near a trusted adult now if you can. Tell a parent, teacher, counselor, or another safe adult. In India, unsafe touch can be reported under POCSO. You can call Childline 1098. Do not keep unsafe secrets."],
  ["forced-work", "A child is being forced to work.", "That child deserves safety and school, not unsafe work. Tell a trusted adult, teacher, NGO worker, police child desk, or call Childline 1098. Do not confront the employer alone. Adults can help report child labour safely."],
  ["not-allowed-school", "I am not being allowed to go to school.", "You have a right to education. Tell a trusted teacher, head teacher, parent, guardian, or local child support worker. Children aged 6 to 14 should get free and compulsory education in India. You deserve help returning to learning."],
  ["bullying", "Someone is bullying me at school.", "Bullying is not your fault. Stay near safe friends or adults, write down what happened, and tell a teacher, parent, or school counselor. Ask the school to help keep you safe. You deserve respect."],
  ["online-threat", "Someone online is threatening me.", "Do not reply or share private details. Save screenshots, block the person, and tell a trusted adult. Online threats can be reported to cybercrime.gov.in or police with adult help. You are not alone."],
  ["private-photo", "Someone asked me for a private photo.", "Say no and stop chatting. Do not send photos. Tell a trusted adult immediately. Asking children for private photos is unsafe and can be reported. Keep evidence if safe, but do not handle it alone."],
  ["accused", "I am blamed for something I did not do.", "Take a breath. You have the right to be heard and treated fairly. Tell a trusted adult what happened. Ask adults to check facts before deciding. Do not sign or admit anything you do not understand."],
  ["police", "Police or adults are asking me questions.", "Ask for a parent, guardian, teacher, counselor, or child welfare support person to stay with you. You should be spoken to calmly. If you feel scared, say: I need a trusted adult with me."],
  ["shelter-mistreat", "A child in a shelter is being mistreated.", "That child has the right to care and dignity. Tell a trusted staff member, teacher, child welfare officer, NGO, or call Childline 1098. Reports should be taken seriously and the child's identity should be protected."],
  ["lost", "I am lost or separated from family.", "Stay in a public safe place. Approach a police officer, woman help desk, teacher, shopkeeper with family, or call Childline 1098. Do not go alone with a stranger. Share your name and safe contact only with officials or trusted adults."],
  ["hungry-sick", "A child has no food or medical care.", "That child needs urgent care. Tell a trusted adult, teacher, health worker, local child protection worker, or call 1098. Children deserve food, healthcare, and a dignified life."],
  ["unsafe-secret", "Someone told me to keep an unsafe secret.", "Unsafe secrets should be shared. If a secret makes you scared, hurt, or uncomfortable, tell a trusted adult. You are not breaking trust by asking for help; you are protecting yourself."],
  ["child-marriage", "A child is being forced to marry.", "Child marriage is illegal and unsafe. Do not confront people alone. Tell a trusted teacher, child protection officer, police, NGO, or call Childline 1098. The child deserves safety and education."],
  ["run-away", "I feel like running away.", "I am sorry things feel heavy. Please pause and go near a trusted adult, teacher, counselor, police child desk, or call 1098. Running alone can be unsafe. You deserve help without being judged."],
  ["exam-pressure", "I feel too much exam pressure.", "Your marks do not decide your worth. Tell a parent, teacher, or counselor how you feel. Take one small study step, rest, drink water, and ask for support. If you feel unsafe with yourself, tell an adult immediately."],
  ["discrimination", "Someone treats me badly because of my gender, caste, religion, disability, or background.", "That is unfair. Every child deserves equality and dignity. Tell a trusted adult or teacher and ask the school to act. Keep notes of what happened. You deserve respect."],
  ["legal-help", "My family cannot afford a lawyer.", "Children can ask for legal aid. Tell a trusted adult, teacher, child welfare officer, or legal services authority. Free legal help exists so children are not left alone in legal problems."],
  ["home-violence", "There is violence at home.", "Your safety matters. Move to a safer place in the home if possible, tell a trusted adult, neighbor, teacher, or call 1098. If there is immediate danger, contact emergency services with adult help."],
  ["friend-danger", "My friend told me they are unsafe.", "Listen kindly and do not blame them. Encourage your friend to tell a trusted adult. If they are in danger, you should tell a safe adult even if your friend is scared. Helping them get support is caring."],
  ["privacy-case", "Someone is sharing a child's private case or identity.", "A child's privacy and dignity must be protected. Do not forward the information. Tell a trusted adult, teacher, platform moderator, or authority. Sensitive child details should not be spread."]
];

const situationTranslations = {
  hi: {
    "unsafe-touch": ["किसी ने मुझे गलत तरीके से छुआ।", "आपने बताकर सही किया। आपका शरीर आपका है। तुरंत किसी भरोसेमंद बड़े के पास जाएँ। माता-पिता, शिक्षक, काउंसलर या सुरक्षित बड़े को बताइए। भारत में POCSO के तहत मदद मिल सकती है और चाइल्डलाइन 1098 पर कॉल किया जा सकता है।"],
    "forced-work": ["किसी बच्चे से जबरन काम करवाया जा रहा है।", "बच्चे को सुरक्षा और स्कूल मिलना चाहिए। भरोसेमंद बड़े, शिक्षक, NGO, पुलिस चाइल्ड डेस्क या 1098 को बताइए। अकेले employer से सामना न करें।"],
    "not-allowed-school": ["मुझे स्कूल जाने नहीं दिया जा रहा।", "आपको शिक्षा का अधिकार है। भरोसेमंद शिक्षक, प्रधानाचार्य, अभिभावक या बाल सहायता कार्यकर्ता को बताइए। भारत में 6 से 14 वर्ष के बच्चों को शिक्षा मिलनी चाहिए।"],
    bullying: ["स्कूल में कोई मुझे परेशान कर रहा है।", "बुलिंग आपकी गलती नहीं है। सुरक्षित दोस्तों या बड़े के पास रहें, घटना लिखें और शिक्षक, माता-पिता या काउंसलर को बताइए।"],
    "online-threat": ["ऑनलाइन कोई मुझे धमकी दे रहा है।", "जवाब न दें और निजी जानकारी न भेजें। स्क्रीनशॉट सुरक्षित रखें, ब्लॉक करें और भरोसेमंद बड़े को बताइए। adult help से cybercrime.gov.in या पुलिस में रिपोर्ट हो सकती है।"],
    "private-photo": ["किसी ने मुझसे निजी फोटो माँगी।", "ना कहें और चैट बंद करें। फोटो न भेजें। तुरंत भरोसेमंद बड़े को बताइए। यह असुरक्षित है और रिपोर्ट किया जा सकता है।"],
    accused: ["मुझ पर ऐसी बात का आरोप लगा है जो मैंने नहीं की।", "गहरी साँस लें। आपको सुने जाने और निष्पक्ष व्यवहार का अधिकार है। भरोसेमंद बड़े को सच बताइए और तथ्यों की जाँच माँगिए।"],
    police: ["पुलिस या बड़े मुझसे सवाल पूछ रहे हैं।", "कहें कि आपके साथ माता-पिता, शिक्षक, काउंसलर या child welfare support person रहे। आपसे शांति से बात की जानी चाहिए।"],
    "shelter-mistreat": ["शेल्टर में बच्चे से बुरा व्यवहार हो रहा है।", "बच्चे को देखभाल और गरिमा का अधिकार है। भरोसेमंद staff, शिक्षक, child welfare officer, NGO या 1098 को बताइए।"],
    lost: ["मैं परिवार से बिछड़ गया/गई हूँ।", "किसी सार्वजनिक सुरक्षित जगह पर रहें। पुलिस, महिला हेल्प डेस्क, शिक्षक या 1098 से मदद लें। किसी अजनबी के साथ अकेले न जाएँ।"],
    "hungry-sick": ["किसी बच्चे के पास खाना या इलाज नहीं है।", "उसे तुरंत देखभाल चाहिए। भरोसेमंद बड़े, शिक्षक, health worker, child protection worker या 1098 को बताइए।"],
    "unsafe-secret": ["किसी ने मुझे असुरक्षित बात छिपाने को कहा।", "जो secret डर, चोट या असहजता दे, उसे भरोसेमंद बड़े को बताना चाहिए। मदद माँगना सही है।"],
    "child-marriage": ["किसी बच्चे की जबरन शादी करवाई जा रही है।", "बाल विवाह illegal और unsafe है। अकेले सामना न करें। शिक्षक, child protection officer, पुलिस, NGO या 1098 को बताइए।"],
    "run-away": ["मेरा घर से भागने का मन है।", "मुझे दुख है कि चीजें भारी लग रही हैं। कृपया रुकें और भरोसेमंद बड़े, शिक्षक, काउंसलर, police child desk या 1098 से मदद लें।"],
    "exam-pressure": ["मुझे परीक्षा का बहुत दबाव है।", "आपकी कीमत marks से तय नहीं होती। माता-पिता, शिक्षक या काउंसलर को बताइए। छोटा study step लें, आराम करें और support माँगें।"],
    discrimination: ["मेरे gender, caste, religion, disability या background के कारण बुरा व्यवहार हो रहा है।", "यह unfair है। हर बच्चे को equality और dignity चाहिए। भरोसेमंद बड़े या teacher को बताइए और school से action माँगिए।"],
    "legal-help": ["मेरे परिवार के पास lawyer के पैसे नहीं हैं।", "बच्चे legal aid माँग सकते हैं। भरोसेमंद बड़े, teacher, child welfare officer या legal services authority से बात करें।"],
    "home-violence": ["घर में हिंसा हो रही है।", "आपकी safety important है। संभव हो तो सुरक्षित जगह जाएँ और भरोसेमंद बड़े, पड़ोसी, teacher या 1098 को बताइए।"],
    "friend-danger": ["मेरे दोस्त ने बताया कि वह unsafe है।", "ध्यान से सुनें और blame न करें। दोस्त को trusted adult को बताने के लिए कहें। खतरा हो तो safe adult को बताना caring है।"],
    "privacy-case": ["कोई बच्चे की private case या identity share कर रहा है।", "बच्चे की privacy और dignity protected होनी चाहिए। इसे forward न करें। भरोसेमंद बड़े, teacher, platform या authority को बताइए।"]
  },
  kn: {
    "unsafe-touch": ["ಯಾರೋ ನನಗೆ ಇಷ್ಟವಿಲ್ಲದ ರೀತಿಯಲ್ಲಿ ಮುಟ್ಟಿದರು.", "ನೀವು ಹೇಳಿದ್ದು ಸರಿಯಾಗಿದೆ. ನಿಮ್ಮ ದೇಹ ನಿಮ್ಮದು. ಈಗಲೇ ನಂಬಿಕೆಯ ಹಿರಿಯರ ಹತ್ತಿರ ಹೋಗಿ. ಪೋಷಕರು, ಶಿಕ್ಷಕರು, ಕೌನ್ಸಲರ್ ಅಥವಾ ಸುರಕ್ಷಿತ ಹಿರಿಯರಿಗೆ ತಿಳಿಸಿ. ಭಾರತದಲ್ಲಿ POCSO ಅಡಿಯಲ್ಲಿ ಸಹಾಯ ಸಿಗಬಹುದು ಮತ್ತು 1098 ಗೆ ಕರೆ ಮಾಡಬಹುದು."],
    "forced-work": ["ಮಗುವನ್ನು ಬಲವಂತವಾಗಿ ಕೆಲಸ ಮಾಡಿಸುತ್ತಿದ್ದಾರೆ.", "ಮಗುವಿಗೆ ಸುರಕ್ಷತೆ ಮತ್ತು ಶಾಲೆ ಬೇಕು. ನಂಬಿಕೆಯ ಹಿರಿಯರು, ಶಿಕ್ಷಕರು, NGO, ಪೊಲೀಸ್ child desk ಅಥವಾ 1098 ಗೆ ತಿಳಿಸಿ. ಒಬ್ಬರೇ ಎದುರಿಸಬೇಡಿ."],
    "not-allowed-school": ["ನನ್ನನ್ನು ಶಾಲೆಗೆ ಹೋಗಲು ಬಿಡುತ್ತಿಲ್ಲ.", "ನಿಮಗೆ ಶಿಕ್ಷಣದ ಹಕ್ಕಿದೆ. ನಂಬಿಕೆಯ ಶಿಕ್ಷಕ, ಮುಖ್ಯೋಪಾಧ್ಯಾಯ, ಪೋಷಕ ಅಥವಾ ಮಕ್ಕಳ ಸಹಾಯ ಕಾರ್ಯಕರ್ತರಿಗೆ ತಿಳಿಸಿ."],
    bullying: ["ಶಾಲೆಯಲ್ಲಿ ಯಾರೋ ನನ್ನನ್ನು ಕಿರುಕುಳ ಕೊಡುತ್ತಿದ್ದಾರೆ.", "ಬುಲಿಯಿಂಗ್ ನಿಮ್ಮ ತಪ್ಪಲ್ಲ. ಸುರಕ್ಷಿತ ಸ್ನೇಹಿತರು ಅಥವಾ ಹಿರಿಯರ ಹತ್ತಿರಿರಿ, ಏನಾಯಿತು ಎಂದು ಬರೆಯಿರಿ ಮತ್ತು ಶಿಕ್ಷಕ ಅಥವಾ ಕೌನ್ಸಲರ್‌ಗೆ ತಿಳಿಸಿ."],
    "online-threat": ["ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಯಾರೋ ನನಗೆ ಬೆದರಿಕೆ ಹಾಕುತ್ತಿದ್ದಾರೆ.", "ಉತ್ತರಿಸಬೇಡಿ ಮತ್ತು ಖಾಸಗಿ ಮಾಹಿತಿ ಕೊಡಬೇಡಿ. screenshot ಉಳಿಸಿ, block ಮಾಡಿ ಮತ್ತು ನಂಬಿಕೆಯ ಹಿರಿಯರಿಗೆ ತಿಳಿಸಿ."],
    "private-photo": ["ಯಾರೋ ನನ್ನ private photo ಕೇಳಿದರು.", "ಬೇಡ ಎಂದು ಹೇಳಿ chat ನಿಲ್ಲಿಸಿ. photo ಕಳುಹಿಸಬೇಡಿ. ತಕ್ಷಣ ನಂಬಿಕೆಯ ಹಿರಿಯರಿಗೆ ತಿಳಿಸಿ."],
    accused: ["ನಾನು ಮಾಡದ ವಿಷಯಕ್ಕೆ ನನ್ನ ಮೇಲೆ ಆರೋಪ ಬಂದಿದೆ.", "ಉಸಿರೆಳೆದುಕೊಳ್ಳಿ. ನಿಮಗೆ ಕೇಳಿಸಿಕೊಳ್ಳುವ ಮತ್ತು ನ್ಯಾಯಯುತ ವರ್ತನೆಯ ಹಕ್ಕಿದೆ. ನಂಬಿಕೆಯ ಹಿರಿಯರಿಗೆ ಸತ್ಯ ಹೇಳಿ."],
    police: ["ಪೊಲೀಸ್ ಅಥವಾ ಹಿರಿಯರು ನನಗೆ ಪ್ರಶ್ನೆ ಕೇಳುತ್ತಿದ್ದಾರೆ.", "ನನ್ನ ಜೊತೆ ಪೋಷಕ, ಶಿಕ್ಷಕ, ಕೌನ್ಸಲರ್ ಅಥವಾ child welfare support person ಇರಲಿ ಎಂದು ಕೇಳಿ."],
    "shelter-mistreat": ["ಶೆಲ್ಟರ್‌ನಲ್ಲಿ ಮಗುವಿಗೆ ಕೆಟ್ಟ ವರ್ತನೆ ಆಗುತ್ತಿದೆ.", "ಮಗುವಿಗೆ ಆರೈಕೆ ಮತ್ತು ಗೌರವದ ಹಕ್ಕಿದೆ. ನಂಬಿಕೆಯ staff, ಶಿಕ್ಷಕ, child welfare officer, NGO ಅಥವಾ 1098 ಗೆ ತಿಳಿಸಿ."],
    lost: ["ನಾನು ಕುಟುಂಬದಿಂದ ದೂರವಾಗಿದ್ದೇನೆ.", "ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷಿತ ಸ್ಥಳದಲ್ಲಿರಿ. ಪೊಲೀಸ್, ಮಹಿಳಾ help desk, ಶಿಕ್ಷಕ ಅಥವಾ 1098 ರಿಂದ ಸಹಾಯ ಪಡೆಯಿರಿ. ಅನ್ಯರ ಜೊತೆ ಒಬ್ಬರೇ ಹೋಗಬೇಡಿ."],
    "hungry-sick": ["ಮಗುವಿಗೆ ಆಹಾರ ಅಥವಾ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ.", "ಆ ಮಗುವಿಗೆ ತಕ್ಷಣ ಆರೈಕೆ ಬೇಕು. ನಂಬಿಕೆಯ ಹಿರಿಯರು, ಶಿಕ್ಷಕರು, health worker ಅಥವಾ 1098 ಗೆ ತಿಳಿಸಿ."],
    "unsafe-secret": ["ಯಾರೋ unsafe secret ಇಡಲು ಹೇಳಿದರು.", "ಭಯ, ನೋವು ಅಥವಾ ಅಸಹಜತೆ ಕೊಡುವ secret ಅನ್ನು ನಂಬಿಕೆಯ ಹಿರಿಯರಿಗೆ ಹೇಳಬೇಕು. ಸಹಾಯ ಕೇಳುವುದು ಸರಿಯಾಗಿದೆ."],
    "child-marriage": ["ಮಗುವನ್ನು ಬಲವಂತವಾಗಿ ಮದುವೆ ಮಾಡುತ್ತಿದ್ದಾರೆ.", "ಮಕ್ಕಳ ಮದುವೆ illegal ಮತ್ತು unsafe. ಒಬ್ಬರೇ ಎದುರಿಸಬೇಡಿ. ಶಿಕ್ಷಕ, child protection officer, ಪೊಲೀಸ್, NGO ಅಥವಾ 1098 ಗೆ ತಿಳಿಸಿ."],
    "run-away": ["ನನಗೆ ಮನೆಬಿಟ್ಟು ಓಡಿಹೋಗಬೇಕು ಅನಿಸುತ್ತಿದೆ.", "ವಿಷಯಗಳು ಭಾರವಾಗಿವೆ ಎಂದು ವಿಷಾದ. ದಯವಿಟ್ಟು ನಿಲ್ಲಿ ಮತ್ತು ನಂಬಿಕೆಯ ಹಿರಿಯರು, ಶಿಕ್ಷಕ, ಕೌನ್ಸಲರ್ ಅಥವಾ 1098 ರಿಂದ ಸಹಾಯ ಪಡೆಯಿರಿ."],
    "exam-pressure": ["ಪರೀಕ್ಷೆಯ ಒತ್ತಡ ತುಂಬಾ ಇದೆ.", "ನಿಮ್ಮ ಮೌಲ್ಯ marks ನಿಂದ ನಿರ್ಧರಿಸುವುದಿಲ್ಲ. ಪೋಷಕ, ಶಿಕ್ಷಕ ಅಥವಾ ಕೌನ್ಸಲರ್‌ಗೆ ಹೇಳಿ. ಚಿಕ್ಕ study step ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಮಾಡಿ."],
    discrimination: ["ನನ್ನ gender, caste, religion, disability ಅಥವಾ background ಕಾರಣ ಕೆಟ್ಟ ವರ್ತನೆ ಆಗುತ್ತಿದೆ.", "ಇದು ಅನ್ಯಾಯ. ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೆ ಸಮಾನತೆ ಮತ್ತು ಗೌರವ ಬೇಕು. ನಂಬಿಕೆಯ ಹಿರಿಯರು ಅಥವಾ ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಿ."],
    "legal-help": ["ನನ್ನ ಕುಟುಂಬಕ್ಕೆ lawyer ಗೆ ಹಣವಿಲ್ಲ.", "ಮಕ್ಕಳು legal aid ಕೇಳಬಹುದು. ನಂಬಿಕೆಯ ಹಿರಿಯರು, ಶಿಕ್ಷಕರು, child welfare officer ಅಥವಾ legal services authority ಜೊತೆ ಮಾತನಾಡಿ."],
    "home-violence": ["ಮನೆಯಲ್ಲಿ ಹಿಂಸೆ ಇದೆ.", "ನಿಮ್ಮ ಸುರಕ್ಷತೆ ಮುಖ್ಯ. ಸಾಧ್ಯವಾದರೆ ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ಹೋಗಿ ಮತ್ತು ನಂಬಿಕೆಯ ಹಿರಿಯರು, ನೆರೆಹೊರೆಯವರು, ಶಿಕ್ಷಕ ಅಥವಾ 1098 ಗೆ ತಿಳಿಸಿ."],
    "friend-danger": ["ನನ್ನ ಸ್ನೇಹಿತನು unsafe ಎಂದು ಹೇಳಿದ.", "ಮೃದುವಾಗಿ ಕೇಳಿ ಮತ್ತು blame ಮಾಡಬೇಡಿ. ಸ್ನೇಹಿತನಿಗೆ trusted adult ಗೆ ಹೇಳಲು ಸಹಾಯ ಮಾಡಿ. ಅಪಾಯ ಇದ್ದರೆ safe adult ಗೆ ಹೇಳುವುದು ಕಾಳಜಿ."],
    "privacy-case": ["ಯಾರೋ ಮಗುವಿನ private case ಅಥವಾ identity share ಮಾಡುತ್ತಿದ್ದಾರೆ.", "ಮಗುವಿನ privacy ಮತ್ತು dignity ರಕ್ಷಿಸಬೇಕು. forward ಮಾಡಬೇಡಿ. ನಂಬಿಕೆಯ ಹಿರಿಯರು, ಶಿಕ್ಷಕ, platform ಅಥವಾ authority ಗೆ ತಿಳಿಸಿ."]
  }
};

function situationText(item, field) {
  const localized = situationTranslations[currentLanguage]?.[item[0]];
  if (localized) return localized[field === "answer" ? 1 : 0];
  return field === "answer" ? item[2] : item[1];
}

const app = document.querySelector("#app");

function detectInitialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (supportedLanguages.some((language) => language.code === queryLanguage)) return queryLanguage;
  const stored = localStorage.getItem(LANG_KEY);
  if (supportedLanguages.some((language) => language.code === stored)) return stored;
  const browserLanguage = (navigator.language || DEFAULT_LANGUAGE).slice(0, 2).toLowerCase();
  return supportedLanguages.some((language) => language.code === browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
}

async function loadLanguage(languageCode) {
  const safeCode = supportedLanguages.some((language) => language.code === languageCode) ? languageCode : DEFAULT_LANGUAGE;
  if (!translationCache.en && safeCode !== "en") await loadLanguage("en");
  if (!translationCache[safeCode]) {
    const bundledLocale = window.RIGHTS_QUEST_LOCALES?.[safeCode];
    if (bundledLocale) {
      translationCache[safeCode] = bundledLocale;
    } else {
      try {
      const response = await fetch(`locales/${safeCode}/common.json`, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Missing locale ${safeCode}`);
      translationCache[safeCode] = await response.json();
      } catch (error) {
        console.warn("Translation bundle failed to load:", error);
        translationCache[safeCode] = safeCode === "en" ? {} : translationCache.en || {};
      }
    }
  }
  currentLanguage = safeCode;
  translations = translationCache[safeCode];
  localStorage.setItem(LANG_KEY, safeCode);
  applyLocaleMeta();
}

function t(key, params = {}, fallback = "") {
  const value = translations[key] ?? translationCache.en?.[key] ?? fallback ?? key;
  if (!value) console.warn(`Missing translation key: ${key}`);
  return String(value).replace(/\{\{(\w+)\}\}/g, (_, token) => params[token] ?? "");
}

function tp(key, count, params = {}) {
  const pluralKey = count === 1 ? `${key}.one` : `${key}.other`;
  return t(pluralKey, { ...params, count: formatNumber(count) }, t(key, { ...params, count: formatNumber(count) }));
}

function languageConfig() {
  return supportedLanguages.find((language) => language.code === currentLanguage) || supportedLanguages[0];
}

function formatNumber(value) {
  return new Intl.NumberFormat(currentLanguage).format(value);
}

function formatPercent(value) {
  return `${formatNumber(value)}%`;
}

function applyLocaleMeta() {
  const config = languageConfig();
  document.documentElement.lang = config.code;
  document.documentElement.dir = config.dir;
  document.body.dataset.lang = config.code;
  document.title = t("meta.title");
  const description = document.querySelector("meta[name='description']");
  if (description) description.setAttribute("content", t("meta.description"));
}

function renderLanguageSwitcher() {
  return `
    <div class="language-switcher" role="group" aria-label="${t("language.aria")}">
      ${supportedLanguages
        .map(
          (language) => `
            <button class="${language.code === currentLanguage ? "active" : ""}" type="button" data-lang="${language.code}" aria-pressed="${language.code === currentLanguage}">
              <span>${language.short}</span>
              <strong>${language.label}</strong>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function moduleText(module, field) {
  return t(`modules.${module.id}.${field}`, {}, module[field] || "");
}

function quizText(module, questionIndex, field, optionIndex = null) {
  const key = optionIndex === null ? `modules.${module.id}.quiz.${questionIndex}.${field}` : `modules.${module.id}.quiz.${questionIndex}.options.${optionIndex}`;
  const question = module.quiz[questionIndex];
  const fallback = optionIndex === null ? question[field] : question.options[optionIndex];
  return t(key, {}, fallback);
}

function shopTitle(item) {
  return t(`shop.${item.id}.title`, {}, item.title);
}

function videoTitle(video, index) {
  const module = modules[index];
  const number = formatNumber(index + 1);
  const fallbackTitle = module
    ? t("modules.numberedTitle", { number, title: moduleText(module, "title") }, `Module ${number}: ${moduleText(module, "title")}`)
    : video.title;
  return t(`videos.${index + 1}.title`, {}, fallbackTitle);
}

function openVideoById(id, title = "", moduleId = "") {
  if (!id) return;
  markVideoWatched(moduleId || moduleIdForVideoId(id));
  activeVideo = {
    id,
    title: title || t("videos.watchVideo"),
    moduleId: moduleId || moduleIdForVideoId(id),
    watchUrl: getWatchUrl(id),
    thumbUrl: getThumbUrl(id)
  };
  render();
}

function moduleIdForVideoId(videoId) {
  const index = videoLibrary.findIndex((video) => getYouTubeId(video.url) === videoId);
  return modules[index]?.id || "";
}

function markVideoWatched(moduleId) {
  const user = getUser();
  if (!user || !moduleId) return;
  if (!user.watchedVideos.includes(moduleId)) user.watchedVideos.push(moduleId);
  user.analytics.lastReengagementMessage = t("engagement.videoWatchedMessage", {}, "Video watched. Your quiz is unlocked for this module.");
  saveUser(user);
  trackEvent("video_watch", { moduleId });
}

function badgeLabel(badge) {
  const key = String(badge)
    .replace(/^Bought /, "bought-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return t(`badges.${key}`, {}, badge);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hasClaimedComebackBonus(user) {
  return user?.analytics?.comebackBonusClaimedOn === todayKey();
}

// Local database adapter. In production, these functions become Firebase/MongoDB API calls.
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers() {
  localStorage.setItem(DB_KEY, JSON.stringify(users));
}

function getUser() {
  const user = users.find((item) => item.email === sessionEmail) || null;
  return user ? normalizeUser(user) : null;
}

function saveUser(nextUser) {
  users = users.map((user) => (user.email === nextUser.email ? nextUser : user));
  saveUsers();
}

function createUser({ name, age, email, password, avatar = "star" }) {
  return {
    name,
    age: Number(age),
    email: email.toLowerCase(),
    password,
    avatar,
    role: "child",
    linkedChildren: ["Diya Demo", "Ravi Kumar", "Meena S"],
    points: 0,
    coins: 0,
    badges: [],
    completedModules: [],
    completedLevels: [],
    watchedVideos: [],
    quizScores: {},
    rewards: [],
    purchases: [],
    analytics: {
      events: [],
      sessionStartedAt: Date.now(),
      lastActiveAt: Date.now(),
      wrongAnswers: 0,
      quizRetries: 0,
      abandonedLessons: 0,
      rageClicks: 0,
      comebackBonuses: 0,
      comebackBonusClaimedOn: "",
      streakFreeze: 1
    },
    createdAt: new Date().toISOString()
  };
}

function progressPercent(user) {
  return Math.round((user.completedModules.length / modules.length) * 100);
}

function levelFor(user) {
  if (user.points >= 180) return "advanced";
  if (user.points >= 80) return "intermediate";
  return "beginner";
}

function addBadge(user, badge) {
  if (!user.badges.includes(badge)) {
    user.badges.push(badge);
    pendingBadgeCelebrations.push(badge);
  }
}

function avatarIcon(userOrId) {
  const id = typeof userOrId === "string" ? userOrId : userOrId?.avatar;
  return (avatarOptions.find((avatar) => avatar.id === id) || avatarOptions[0]).icon;
}

function childProfileEmail(name, age, avatar = "") {
  const slug = String(name || "student")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "student";
  const avatarSlug = String(avatar || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `kid-${slug}-${age}${avatarSlug ? "-" + avatarSlug : ""}@rightsquest.local`;
}

function normalizeUser(user) {
  user.coins = Number(user.coins || 0);
  user.avatar = user.avatar || "star";
  user.completedLevels = user.completedLevels || [];
  user.watchedVideos = user.watchedVideos || [];
  user.purchases = user.purchases || [];
  user.role = user.role || "child";
  user.linkedChildren = user.linkedChildren || ["Diya Demo", "Ravi Kumar", "Meena S"];
  user.analytics = user.analytics || {};
  user.analytics.events = user.analytics.events || [];
  user.analytics.sessionStartedAt = user.analytics.sessionStartedAt || Date.now();
  user.analytics.lastActiveAt = user.analytics.lastActiveAt || Date.now();
  user.analytics.wrongAnswers = Number(user.analytics.wrongAnswers || 0);
  user.analytics.quizRetries = Number(user.analytics.quizRetries || 0);
  user.analytics.abandonedLessons = Number(user.analytics.abandonedLessons || 0);
  user.analytics.rageClicks = Number(user.analytics.rageClicks || 0);
  user.analytics.comebackBonuses = Number(user.analytics.comebackBonuses || 0);
  user.analytics.comebackBonusClaimedOn = user.analytics.comebackBonusClaimedOn || "";
  user.analytics.streakFreeze = Number(user.analytics.streakFreeze ?? 1);
  user.analytics.lastReengagementMessage = user.analytics.lastReengagementMessage || "";
  return user;
}

function isMentorUser(user) {
  return user?.role === "parent" || user?.role === "teacher";
}

function trackEvent(type, details = {}) {
  const user = getUser();
  if (!user || isMentorUser(user)) return;
  const now = Date.now();
  const previous = user.analytics.events[user.analytics.events.length - 1];
  if (previous && previous.type === type && now - previous.at < 700) {
    user.analytics.rageClicks += 1;
  }
  user.analytics.lastActiveAt = now;
  user.analytics.events.push({ type, at: now, moduleId: selectedModuleId, details });
  user.analytics.events = user.analytics.events.slice(-80);
  saveUser(user);
}

function computeEngagement(user) {
  const normalized = normalizeUser(user);
  const events = normalized.analytics.events || [];
  const now = Date.now();
  const sessionMinutes = Math.max(1, Math.round((now - normalized.analytics.sessionStartedAt) / 60000));
  const recent = events.filter((event) => now - event.at < 1000 * 60 * 60 * 24 * 7);
  const quizStarts = recent.filter((event) => event.type === "quiz_start").length;
  const quizCompletes = recent.filter((event) => event.type === "quiz_complete").length;
  const videoWatches = recent.filter((event) => event.type === "video_watch").length;
  const helpUses = recent.filter((event) => event.type === "assistant_help").length;
  const wrongAnswers = recent.filter((event) => event.type === "wrong_answer").length + normalized.analytics.wrongAnswers;
  const idleMinutes = Math.max(0, Math.round((now - normalized.analytics.lastActiveAt) / 60000));
  const completionRate = modules.length ? normalized.completedLevels.length / modules.length : 0;
  const interactionScore = Math.min(28, recent.length * 2 + videoWatches * 3);
  const completionScore = Math.round(completionRate * 32);
  const accuracyValues = Object.values(normalized.quizScores || {}).map((score) => Number(score.accuracy || 0));
  const averageAccuracy = accuracyValues.length ? Math.round(accuracyValues.reduce((sum, item) => sum + item, 0) / accuracyValues.length) : 72;
  const accuracyScore = Math.round(averageAccuracy * 0.22);
  const helpScore = Math.min(8, helpUses * 2);
  const penalty = Math.min(38, idleMinutes / 2 + wrongAnswers * 2 + normalized.analytics.abandonedLessons * 5 + normalized.analytics.rageClicks * 3 + Math.max(0, quizStarts - quizCompletes) * 4);
  const engagement = clamp(Math.round(38 + completionScore + interactionScore + accuracyScore + helpScore - penalty), 0, 100);
  const motivation = clamp(Math.round(45 + normalized.coins / 10 + normalized.badges.length * 4 + quizCompletes * 5 - idleMinutes / 3 - wrongAnswers * 2), 0, 100);
  const dropout = clamp(Math.round(100 - engagement + idleMinutes / 2 + Math.max(0, 70 - averageAccuracy) / 2), 0, 100);
  const status = dropout >= 72 ? "critical" : dropout >= 52 ? "risk" : engagement < 72 ? "slight" : "engaged";
  const reason = predictDisengagementReason({ wrongAnswers, averageAccuracy, quizStarts, quizCompletes, idleMinutes, helpUses, motivation });
  return { engagement, motivation, dropout, status, reason, sessionMinutes, idleMinutes, averageAccuracy, videoWatches };
}

function predictDisengagementReason(metrics) {
  if (metrics.idleMinutes > 20) return "inactivity";
  if (metrics.wrongAnswers >= 5 || metrics.averageAccuracy < 55) return "difficult";
  if (metrics.quizStarts > metrics.quizCompletes + 1) return "overload";
  if (metrics.motivation < 45) return "lowConfidence";
  if (metrics.helpUses >= 3) return "confusion";
  return "healthy";
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function moduleIndex(moduleId) {
  return modules.findIndex((module) => module.id === moduleId);
}

function isModuleUnlocked(user, moduleId) {
  const index = moduleIndex(moduleId);
  if (index <= 0) return true;
  return user.completedLevels.includes(modules[index - 1].id);
}

function hasWatchedModuleVideo(user, moduleId) {
  return Boolean(user?.watchedVideos?.includes(moduleId));
}

function nextLockedMessage(moduleId) {
  const index = moduleIndex(moduleId);
  if (index <= 0) return "";
  return t("alerts.levelLocked", { current: formatNumber(index), next: formatNumber(index + 1) });
}

function getYouTubeId(url) {
  const cleanUrl = String(url || "").trim().replace(/\(.+$/, "");
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]{11})/
  ];
  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match) return match[1];
  }
  return "";
}

function getEmbedUrl(url) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1` : "";
}

function getWatchUrl(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function getThumbUrl(id) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function openExternalVideo(url) {
  sessionStorage.setItem(VIDEO_RETURN_KEY, "1");
  window.location.href = url;
}

function shouldRestoreAfterVideo() {
  const shouldRestore = sessionStorage.getItem(VIDEO_RETURN_KEY) === "1";
  if (shouldRestore) sessionStorage.removeItem(VIDEO_RETURN_KEY);
  const savedEmail = localStorage.getItem(SESSION_KEY);
  return shouldRestore && users.some((user) => user.email === savedEmail);
}

function render() {
  const user = getUser();
  if (!user && view !== "home") view = "home";
  app.innerHTML = `
    ${renderCosmicBackdrop()}
    ${renderHeader(user)}
    <main>
      ${view === "home" ? renderHome() : isMentorUser(user) ? renderMentorPortal(user) : renderDashboard(user)}
    </main>
    ${renderVideoModal()}
    ${renderVoiceAssistant(user)}
  `;
  bindInteractiveControls();
}

function renderCosmicBackdrop() {
  return `
    <div class="cosmic-backdrop" aria-hidden="true">
      <span class="galaxy galaxy-one"></span>
      <span class="planet planet-blue"></span>
      <span class="planet planet-ring"></span>
      <span class="planet planet-pink"></span>
      <span class="comet comet-one"></span>
      <span class="comic-burst burst-one">WOW</span>
      <span class="comic-burst burst-two">ZAP</span>
    </div>
  `;
}

function bindInteractiveControls() {
  bindAssistantDrag();
  app.querySelectorAll("[data-lang]").forEach((element) => {
    element.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      loadLanguage(element.dataset.lang).then(render);
    };
  });
  app.querySelectorAll("[data-ask]").forEach((element) => {
    element.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      askAssistant(element.dataset.ask, true);
    };
  });
  app.querySelectorAll("[data-situation]").forEach((element) => {
    element.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const situation = situationPrompts.find((item) => item[0] === element.dataset.situation);
      if (situation) askAssistant(situationText(situation, "prompt"), true);
    };
  });
  app.querySelectorAll("[data-video-id]").forEach((element) => {
    element.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      openVideoById(element.dataset.videoId, element.dataset.title, element.dataset.moduleId);
    };
  });
  app.querySelectorAll("button[data-view]").forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      view = button.dataset.view;
      render();
    };
  });
  app.querySelectorAll("button[data-jump]").forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      jumpTo(button.dataset.jump);
    };
  });
  app.querySelectorAll("button[data-module]").forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      openModuleQuiz(button.dataset.module);
    };
  });
  app.querySelectorAll("button[data-answer]").forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      selectAnswer(Number(button.dataset.answer));
    };
  });
  app.querySelectorAll("button[data-locked]").forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      alert(nextLockedMessage(button.dataset.locked));
    };
  });
  app.querySelectorAll("button[data-buy]").forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      buyReward(button.dataset.buy);
    };
  });
  app.querySelectorAll("button[data-action]").forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      handleAction(button.dataset.action, button);
    };
  });
}

function bindAssistantDrag() {
  const panel = app.querySelector(".voice-panel");
  const handle = app.querySelector("[data-drag-assistant]");
  if (!panel || !handle) return;
  keepAssistantPanelInView(panel);
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  const movePanel = (clientX, clientY) => {
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const left = clamp(startLeft + clientX - startX, 8, Math.max(8, window.innerWidth - width - 8));
    const top = clamp(startTop + clientY - startY, 8, Math.max(8, window.innerHeight - height - 8));
    assistantPanelPosition = { left, top };
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  };
  handle.onpointerdown = (event) => {
    if (event.target.closest("button")) return;
    const rect = panel.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    startLeft = rect.left;
    startTop = rect.top;
    handle.setPointerCapture?.(event.pointerId);
    handle.classList.add("dragging");
    event.preventDefault();
  };
  handle.onpointermove = (event) => {
    if (!handle.classList.contains("dragging")) return;
    movePanel(event.clientX, event.clientY);
  };
  handle.onpointerup = (event) => {
    handle.classList.remove("dragging");
    handle.releasePointerCapture?.(event.pointerId);
  };
  handle.onpointercancel = () => handle.classList.remove("dragging");
}

function keepAssistantPanelInView(panel) {
  const rect = panel.getBoundingClientRect();
  const left = clamp(rect.left, 8, Math.max(8, window.innerWidth - rect.width - 8));
  const top = clamp(rect.top, 46, Math.max(46, window.innerHeight - Math.min(rect.height, window.innerHeight - 28) - 8));
  if (Math.abs(left - rect.left) > 1 || Math.abs(top - rect.top) > 1) {
    assistantPanelPosition = { left, top };
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  }
}

function renderHeader(user) {
  return `
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark">&#128737;</span>
        <span>${t("brand.name")}</span>
      </div>
      ${
        user
          ? `<nav class="nav" aria-label="${t("aria.mainNav")}">
              <button class="${view === "dashboard" ? "active" : ""}" type="button" data-view="dashboard"><span class="nav-icon">&#127968;</span><span>${t("navbar.dashboard")}</span></button>
              <button type="button" data-jump="about"><span class="nav-icon">&#128161;</span><span>${t("navbar.about")}</span></button>
              <button type="button" data-jump="modules"><span class="nav-icon">&#128218;</span><span>${t("navbar.modules")}</span></button>
              <button type="button" data-jump="videos"><span class="nav-icon">&#9658;</span><span>${t("navbar.videos")}</span></button>
            </nav>`
          : ""
      }
      <div class="top-actions">
        ${renderLanguageSwitcher()}
        ${
          user
            ? `<button class="icon-button primary" type="button" data-action="logout" onclick="handleAction('logout')">${t("auth.logout")}</button>`
            : ""
        }
      </div>
    </header>
  `;
}

function renderHome() {
  return `
    <section class="auth-start">
      <div class="auth-intro">
        <p class="level-chip">${t("hero.eyebrow")}</p>
        <h1>${t("hero.title")}</h1>
        <p class="simple-text">${t("hero.subtitle")}</p>
        <div class="login-about">
          <h2>${t("about.title")}</h2>
          <p>${t("about.body")}</p>
        </div>
        <div class="grid-4 auth-feature-grid">
          ${featureCard("&#127912;", t("features.bright.title"), t("features.bright.text"))}
          ${featureCard("&#128214;", t("features.stories.title"), t("features.stories.text"))}
          ${featureCard("&#127918;", t("features.quizzes.title"), t("features.quizzes.text"))}
          ${featureCard("&#129689;", t("features.coins.title"), t("features.coins.text"))}
        </div>
      </div>
      <div id="auth">
        ${renderAuthCard()}
      </div>
    </section>
  `;
}
function renderDashboard(user) {
  const selected = modules.find((module) => module.id === selectedModuleId) || modules[0];
  const progress = progressPercent(user);
  const engagement = computeEngagement(user);
  const badges = user.badges.length ? user.badges.map(badgeLabel).join(", ") : t("dashboard.noBadges");
  const selectedWatched = hasWatchedModuleVideo(user, selected.id);
  return `
    <section class="screen">
      <div class="screen-title">
        <div>
          <p class="level-chip">${t("dashboard.welcome", { name: user.name })}</p>
          <h1>${t("dashboard.title")}</h1>
          <p class="simple-text">${t("dashboard.ageLevel", { age: formatNumber(user.age), level: t("levels." + levelFor(user)) })}</p>
        </div>
        <button class="pill-button primary" type="button" data-action="demo-progress">${t("dashboard.demoPoints")}</button>
      </div>

      <section class="dashboard-grid">
        <article class="panel hero-panel">
          <div class="avatar">${avatarIcon(user)}</div>
          <div>
            <h2>${t("dashboard.progressTitle", { name: user.name })}</h2>
            <div class="progress-label"><span>${t("dashboard.learningCompletion")}</span><span>${formatPercent(progress)}</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
          </div>
        </article>
        <article class="panel">
          <h2>${t("dashboard.pointsCoinsRewards")}</h2>
          <p><strong>${formatNumber(user.points)}</strong> ${t("dashboard.pointsEarned")}</p>
          <p><strong>${formatNumber(user.coins)}</strong> ${t("dashboard.coinsAvailable")}</p>
          <p>${badges}</p>
        </article>
      </section>

      <section class="grid-4" style="margin-top:16px">
        ${statCard("&#128218;", formatNumber(user.completedModules.length), t("stats.lessonsCompleted"))}
        ${statCard("&#127918;", formatNumber(Object.keys(user.quizScores).length), t("stats.quizzesTaken"))}
        ${statCard("&#11088;", formatNumber(user.points), t("stats.points"))}
        ${statCard("&#129689;", formatNumber(user.coins), t("stats.coins"))}
        ${statCard("&#128640;", t("levels." + levelFor(user)), t("stats.progressLevel"))}
      </section>

      <section class="learning-flow-guide" aria-label="${t("flow.aria", {}, "Video then quiz learning steps")}">
        <button class="flow-step ${selectedWatched ? "done" : "active"}" type="button" data-jump="videos">
          <span>1</span>
          <div>
            <strong>${t("flow.watchTitle", {}, "Watch the module video first")}</strong>
            <p>${t("flow.watchText", {}, "Click the matching video card below. Videos are always open for learning.")}</p>
            <em>${t("flow.watchCta", {}, "Jump to videos")}</em>
          </div>
        </button>
        <div class="flow-arrow" aria-hidden="true">&rarr;</div>
        <button class="flow-step ${selectedWatched ? "active" : ""}" type="button" data-action="start-quiz">
          <span>2</span>
          <div>
            <strong>${t("flow.quizTitle", {}, "Then unlock and take the quiz")}</strong>
            <p>${selectedWatched ? t("flow.quizReady", {}, "Great. This module quiz is unlocked now.") : t("flow.quizLocked", {}, "The quiz button opens only after the video is clicked.")}</p>
            <em>${selectedWatched ? t("flow.quizCtaReady", {}, "Start quiz") : t("flow.quizCtaLocked", {}, "Watch video to unlock")}</em>
          </div>
        </button>
      </section>

      <section class="lesson-stage dashboard-lesson">
        <p class="level-chip">${t("modules.moduleNumber", { number: formatNumber(moduleIndex(selected.id) + 1) }, "Module " + formatNumber(moduleIndex(selected.id) + 1))}</p>
        <h2>${selected.icon} ${t("modules.numberedTitle", { number: formatNumber(moduleIndex(selected.id) + 1), title: moduleText(selected, "title") }, "Module " + formatNumber(moduleIndex(selected.id) + 1) + ": " + moduleText(selected, "title"))}</h2>
        <p class="simple-text">${moduleText(selected, "story")}</p>
        <div class="story-scene">
          <span class="sun"></span>
          <span class="cloud"></span>
          <div class="kid"><span class="head"></span><span class="body"></span></div>
          <div class="teacher"><span class="head"></span><span class="body"></span></div>
          <div class="speech-bubble">${t("modules.badgeMission", { badge: moduleText(selected, "badge") })}</div>
        </div>
        <div class="button-row">
          <button class="pill-button primary" type="button" data-action="complete-module">${t("modules.completeChapter")}</button>
          <button class="pill-button ghost" type="button" data-action="start-quiz">${t("quiz.start")}</button>
        </div>
      </section>

      <section class="screen-title mini-title" id="videos">
        <div>
          <p class="level-chip">${t("videos.eyebrow")}</p>
          <h2>${t("videos.title")}</h2>
        </div>
      </section>
      <div class="video-grid upper-video-grid">
        ${videoLibrary.map(videoCard).join("")}
      </div>

      <section class="quiz-video-reminder ${selectedWatched ? "is-ready" : ""}" id="quiz-guide">
        <div>
          <p class="level-chip">${selectedWatched ? t("quiz.videoUnlockedEyebrow", {}, "Quiz Unlocked") : t("quiz.videoFirstEyebrow", {}, "Before the Quiz")}</p>
          <h2>${selectedWatched ? t("quiz.videoUnlockedTitle", {}, "Great. You can now take this module quiz.") : t("quiz.videoFirstTitle", {}, "Watch the video first, then attend the quiz")}</h2>
          <p>${selectedWatched ? t("quiz.videoUnlockedText", {}, "You watched the matching video. Start the quiz when you feel ready.") : t("quiz.videoFirstText", {}, "The video helps you understand the story, rights, and safe legal steps before answering the questions.")}</p>
        </div>
        ${selectedWatched
          ? `<button class="pill-button primary" type="button" data-action="start-quiz">${t("quiz.start", {}, "Start Quiz")}</button>`
          : `<button class="pill-button primary" type="button" data-jump="videos">${t("quiz.goToVideos", {}, "Go to Embedded Videos")}</button>`}
      </section>

      ${quizState ? renderQuiz(selected, user) : ""}

      <section class="panel about-panel" id="about">
        <p class="level-chip">${t("about.title")}</p>
        <h2>${t("hero.title")}</h2>
        <p class="simple-text">${t("about.body")}</p>
      </section>

      ${renderEngagementPanel(engagement, user)}

      <section class="assistant-spotlight">
        <div>
          <p class="level-chip">${t("assistant.spotlightEyebrow")}</p>
          <h2>${t("assistant.spotlightTitle")}</h2>
          <p class="simple-text">${t("assistant.spotlightText")}</p>
        </div>
        <div class="button-row">
          <button class="pill-button primary" type="button" data-action="toggle-assistant">${t("assistant.open")}</button>
          <button class="pill-button ghost" type="button" data-ask="help-rights">${t("assistant.tryQuestion")}</button>
        </div>
      </section>

      <section class="screen-title mini-title" id="modules">
        <div>
          <p class="level-chip">${t("modules.eyebrow")}</p>
          <h2>${t("modules.title")}</h2>
        </div>
      </section>
      <div class="chapter-grid">
        ${modules.map((module) => moduleCard(module, true, user)).join("")}
      </div>

      <section class="screen-title mini-title">
        <div>
          <p class="level-chip">${t("shop.eyebrow")}</p>
          <h2>${t("shop.title")}</h2>
        </div>
      </section>
      <div class="rewards-grid">
        ${shopItems.map((item) => shopCard(item, user)).join("")}
      </div>

    </section>
  `;
}

function renderEngagementPanel(engagement, user) {
  const selectedWatched = hasWatchedModuleVideo(user, selectedModuleId);
  const bonusClaimed = hasClaimedComebackBonus(user);
  return `
    <section class="engagement-grid">
      <article class="panel engagement-card">
        <p class="level-chip">${t("engagement.eyebrow", {}, "Learning Energy")}</p>
        <h2>${t("engagement.title", {}, "Your comeback and motivation meter")}</h2>
        <div class="engagement-meters">
          ${meterRow(t("engagement.engagement", {}, "Engagement"), engagement.engagement, "green")}
          ${meterRow(t("engagement.motivation", {}, "Motivation"), engagement.motivation, "yellow")}
          ${meterRow(t("engagement.dropout", {}, "Dropout risk"), engagement.dropout, "pink", true)}
        </div>
        <p class="simple-text">${t("engagement.reason." + engagement.reason, {}, "You are doing well. Keep learning in short, happy bursts.")}</p>
        ${user.analytics.lastReengagementMessage ? '<p class="reengagement-status">' + user.analytics.lastReengagementMessage + '</p>' : ''}
      </article>
      <article class="panel mission-card">
        <p class="level-chip">${t("engagement.reengageEyebrow", {}, "Re-engagement Quest")}</p>
        <h2>${t("engagement.questTitle", {}, "Today's gentle mission")}</h2>
        <ul class="mentor-list">
          <li><span class="check-dot done">1</span>${t("engagement.quest1", {}, "Answer one easy quiz question to rebuild confidence.")}</li>
          <li><span class="check-dot ${selectedWatched ? "done" : ""}">2</span>${t("engagement.quest2", {}, "Watch one short video before the next level.")}</li>
          <li><span class="check-dot">3</span>${t("engagement.quest3", {}, "Ask Rights Buddy for a hint if a topic feels hard.")}</li>
        </ul>
        <div class="button-row">
          <button class="pill-button primary" type="button" data-action="comeback-bonus" ${bonusClaimed ? "disabled" : ""}>${bonusClaimed ? t("engagement.bonusClaimed", {}, "Bonus Claimed Today") : t("engagement.claimBonus", {}, "Claim Comeback Bonus")}</button>
          <button class="pill-button ghost" type="button" data-action="streak-freeze">${t("engagement.streakFreeze", {}, "Use Streak Freeze")} (${formatNumber(user.analytics.streakFreeze)})</button>
        </div>
      </article>
    </section>
  `;
}

function meterRow(label, value, tone, inverse = false) {
  const display = inverse ? 100 - value : value;
  return '<div class="meter-row meter-' + tone + '"><div class="progress-label"><span>' + label + '</span><span>' + formatPercent(value) + '</span></div><div class="progress-track"><div class="progress-fill" style="width:' + display + '%"></div></div></div>';
}

function renderAuthCard() {
  if (authAudience === "ask") {
    return '<section class="auth-card auth-portal audience-card">' +
      '<h2>' + t("auth.audienceTitle", {}, "Who is using the app?") + '</h2>' +
      '<p class="simple-text">' + t("auth.audienceText", {}, "Children get a quick avatar login. Parents and teachers use a user ID and password.") + '</p>' +
      '<div class="audience-choice-grid">' +
        '<button class="audience-choice child-choice" type="button" data-action="audience-child"><span class="choice-icon">&#128640;</span><strong>' + t("auth.childYes", {}, "Yes, I am a child") + '</strong><small>' + t("auth.childHint", {}, "Use favorite name, age, and avatar") + '</small></button>' +
        '<button class="audience-choice adult-choice" type="button" data-action="audience-adult"><span class="choice-icon">&#128272;</span><strong>' + t("auth.adultNo", {}, "No, I am parent/teacher") + '</strong><small>' + t("auth.adultHint", {}, "Use user ID and password") + '</small></button>' +
      '</div>' +
      '<div class="button-row"><button class="pill-button warn" type="button" data-action="demo-login">' + t("auth.tryDemo") + '</button></div>' +
    '</section>';
  }

  if (authAudience === "child") {
    const ageOptions = Array.from({ length: 7 }, (_, index) => 8 + index)
      .map((age, index) => '<label class="age-pill"><input type="radio" name="age" value="' + age + '" ' + (index === 2 ? "checked" : "") + ' /><span>' + formatNumber(age) + '</span></label>')
      .join("");
    const avatarChoices = avatarOptions
      .map((avatar, index) => '<label class="avatar-choice"><input type="radio" name="avatar" value="' + avatar.id + '" ' + (index === 0 ? "checked" : "") + ' /><span class="avatar-preview">' + avatar.icon + '</span><small>' + t("avatars." + avatar.id, {}, avatar.label) + '</small></label>')
      .join("");
    return '<form class="auth-card auth-portal child-login-card" data-form="auth">' +
      '<input type="hidden" name="audience" value="child" />' +
      '<h2>' + t("auth.childTitle", {}, "Start your rights adventure") + '</h2>' +
      '<p class="simple-text">' + t("auth.childText", {}, "No password needed. Choose your favorite name, age, and avatar.") + '</p>' +
      '<label class="field">' + t("auth.favoriteName", {}, "Favorite Name") + ' <input name="name" placeholder="' + t("auth.favoriteNamePlaceholder", {}, "Diya Star") + '" required /></label>' +
      '<div class="field-group"><strong>' + t("auth.pickAge", {}, "Pick your age") + '</strong><div class="age-choice-grid">' + ageOptions + '</div></div>' +
      '<div class="field-group"><strong>' + t("auth.pickAvatar", {}, "Choose your avatar") + '</strong><div class="avatar-choice-grid">' + avatarChoices + '</div></div>' +
      '<p class="auth-message" aria-live="polite">' + (authMessage ? t(authMessage) : "") + '</p>' +
      '<div class="button-row">' +
        '<button class="pill-button primary" type="submit">' + t("auth.startLearning", {}, "Start Learning") + '</button>' +
        '<button class="pill-button ghost" type="button" data-action="audience-back">' + t("auth.backChoice", {}, "Back") + '</button>' +
      '</div>' +
    '</form>';
  }

  return '<form class="auth-card auth-portal adult-login-card" data-form="auth">' +
    '<input type="hidden" name="audience" value="adult" />' +
    '<h2>' + (authMode === "signup" ? t("auth.adultSignupTitle", {}, "Create Parent / Teacher Account") : t("auth.adultLoginTitle", {}, "Parent / Teacher Login")) + '</h2>' +
    '<p class="simple-text">' + (authMode === "signup" ? t("auth.adultSignupText", {}, "Create your monitoring account first. Then login with the same user ID and password.") : t("auth.adultLoginText", {}, "Enter your registered user ID and password to open the monitoring portal.")) + '</p>' +
    (authMode === "signup"
      ? '<label class="field">' + t("auth.studentName", {}, "Name") + ' <input name="name" placeholder="' + t("auth.adultNamePlaceholder", {}, "Parent or Teacher Name") + '" required /></label>' +
        '<label class="field">' + t("auth.roleLabel") + ' <select name="role"><option value="parent">' + t("auth.roleParent") + '</option><option value="teacher">' + t("auth.roleTeacher") + '</option></select></label>'
      : '') +
    '<label class="field">' + t("auth.userId", {}, "User ID / Email") + ' <input name="email" type="text" placeholder="' + t("auth.userIdPlaceholder", {}, "mentor@rightsquest.in") + '" required /></label>' +
    '<label class="field">' + t("auth.password") + ' <input name="password" type="password" placeholder="' + t("auth.passwordPlaceholder") + '" required /></label>' +
    (authMode === "signup" ? '<label class="field">' + t("auth.confirmPassword") + ' <input name="confirmPassword" type="password" placeholder="' + t("auth.passwordPlaceholder") + '" required /></label>' : '') +
    '<p class="auth-message" aria-live="polite">' + (authMessage ? t(authMessage) : "") + '</p>' +
    '<div class="button-row">' +
      '<button class="pill-button primary" type="submit">' + (authMode === "signup" ? t("auth.signup") : t("auth.login")) + '</button>' +
      '<button class="pill-button ghost" type="button" data-action="switch-auth">' + (authMode === "signup" ? t("auth.alreadyAccount") : t("auth.needSignup")) + '</button>' +
      '<button class="pill-button ghost" type="button" data-action="audience-back">' + t("auth.backChoice", {}, "Back") + '</button>' +
      '<button class="pill-button ghost" type="button" data-action="mentor-demo">' + t("mentor.demoButton", {}, "Parent/Teacher Demo") + '</button>' +
    '</div>' +
  '</form>';
}

function featureCard(icon, title, text) {
  return `<article class="stat-card"><span class="icon-dot">${icon}</span><strong>${title}</strong><span>${text}</span></article>`;
}

function statCard(icon, value, label) {
  return `<article class="stat-card"><span class="icon-dot">${icon}</span><strong>${value}</strong><span>${label}</span></article>`;
}

function renderMentorPortal(user) {
  const roleLabel = user.role === "teacher" ? t("mentor.teacher", {}, "Teacher") : t("mentor.parent", {}, "Parent");
  const childName = t("mentor.demoChildName", {}, "Diya Demo");
  const demoChild = normalizeUser(users.find((item) => item.email === "demo@rightsquest.in") || createUser({ name: childName, age: 11, email: "demo@rightsquest.in", password: "demo123" }));
  const engagement = computeEngagement(demoChild);
  return `
    <section class="screen mentor-portal" id="mentor-about">
      <div class="screen-title">
        <div>
          <p class="level-chip">${t("mentor.rolePortal", { role: roleLabel }, roleLabel + " Portal")}</p>
          <h1>${t("mentor.title", {}, "Support every child's rights journey")}</h1>
          <p class="simple-text">${t("mentor.subtitle", {}, "A warm dashboard for progress, safety guidance, rural learning support, and caring mentorship.")}</p>
        </div>
        <button class="pill-button primary" type="button" data-action="toggle-assistant">${t("assistant.open")}</button>
      </div>

      <section class="mentor-hero">
        <article class="panel">
          <h2>${t("mentor.childProgress", {}, "Child Progress Overview")}</h2>
          <div class="mentor-child-row">
            <span class="mini-avatar">&#128105;</span>
            <div>
              <strong>${childName}</strong>
              <p>${t("mentor.childSummary", {}, "4 lessons started, 2 quizzes completed, confidence improving.")}</p>
            </div>
            <span class="level-chip">62%</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:62%"></div></div>
        </article>
        <article class="panel warm-alert">
          <h2>${t("mentor.safetyPulse", {}, "Safety & Wellbeing Pulse")}</h2>
          <p>${t("mentor.safetyText", {}, "No urgent risk signals. Encourage the child to speak openly about safe adults, body boundaries, and online safety.")}</p>
          <button class="pill-button ghost" type="button" data-ask="unsafe">${t("mentor.askBuddy", {}, "Ask Rights Buddy")}</button>
        </article>
      </section>

      <section class="grid-4 mentor-stats">
        ${statCard("&#128101;", "3", t("mentor.studentsTracked", {}, "Children tracked"))}
        ${statCard("&#128197;", "5", t("mentor.weeklyTasks", {}, "Weekly support tasks"))}
        ${statCard("&#128276;", formatPercent(engagement.dropout), t("mentor.gentleAlerts", {}, "Gentle alert"))}
        ${statCard("&#127979;", "4", t("mentor.ruralKits", {}, "Rural support kits"))}
      </section>

      <section class="panel mentor-card heatmap-card">
        <p class="level-chip">${t("mentor.dropoutEyebrow", {}, "Dropout Prevention")}</p>
        <h2>${t("mentor.dropoutTitle", {}, "Student re-engagement heatmap")}</h2>
        <div class="heatmap-grid">
          ${heatCell("Diya", engagement.dropout, engagement.status)}
          ${heatCell("Ravi", 42, "slight")}
          ${heatCell("Meena", 18, "engaged")}
          ${heatCell("Class", Math.round((engagement.dropout + 42 + 18) / 3), "risk")}
        </div>
        <p>${t("mentor.interventionText", {}, "Suggested intervention: praise effort, reduce lesson length, offer one easy-win quiz, and send a caring reminder at home.")}</p>
      </section>

      <section class="mentor-grid" id="mentor-guide">
        <article class="panel mentor-card" id="mentor-support">
          <h2>${t("mentor.guidanceTitle", {}, "Mentorship Guide")}</h2>
          <ul class="mentor-list">
            <li><span class="check-dot done">1</span>${t("mentor.guide1", {}, "Ask one calm question: What did you learn about safety today?")}</li>
            <li><span class="check-dot done">2</span>${t("mentor.guide2", {}, "Praise effort before scores to build confidence.")}</li>
            <li><span class="check-dot">3</span>${t("mentor.guide3", {}, "Remind the child: unsafe secrets should be shared with a trusted adult.")}</li>
          </ul>
        </article>
        <article class="panel mentor-card">
          <h2>${t("mentor.ruralTitle", {}, "Rural Learning Support")}</h2>
          <p>${t("mentor.ruralText", {}, "Use low-data videos, printable discussion cards, local language explanations, and weekly teacher check-ins for students with limited access.")}</p>
          <div class="button-row">
            <button class="pill-button primary" type="button" data-action="mentor-note">${t("mentor.sendNote", {}, "Send Encouragement")}</button>
            <button class="pill-button ghost" type="button" data-action="mentor-kit">${t("mentor.openKit", {}, "Open Support Kit")}</button>
          </div>
        </article>
        <article class="panel mentor-card">
          <h2>${t("mentor.communicationTitle", {}, "Safe Communication Bridge")}</h2>
          <div class="mentor-message">
            <strong>${t("mentor.suggestedMessage", {}, "Suggested message")}</strong>
            <p>${t("mentor.messageText", {}, "I am proud that you are learning your rights. You can always talk to me or a trusted teacher if something feels wrong.")}</p>
          </div>
        </article>
        <article class="panel mentor-card">
          <h2>${t("mentor.analyticsTitle", {}, "Simple Analytics")}</h2>
          <p>${t("mentor.analyticsText", {}, "Strength: Education rights. Needs support: POCSO safety vocabulary. Recommended next: watch safety video and discuss trusted adults.")}</p>
        </article>
      </section>
    </section>
  `;
}

function heatCell(name, risk, status) {
  return '<div class="heat-cell heat-' + status + '"><strong>' + t("mentor.heat." + name.toLowerCase(), {}, name) + '</strong><span>' + formatPercent(risk) + '</span></div>';
}

function shopCard(item, user) {
  const owned = user.purchases.includes(item.id);
  const canBuy = user.coins >= item.cost && !owned;
  return '<article class="reward-card ' + (owned ? '' : 'locked') + '">' +
    '<div class="reward-medal">' + item.icon + '</div>' +
    '<h2>' + shopTitle(item) + '</h2>' +
    '<p>' + t("shop.cost", { cost: formatNumber(item.cost) }) + '</p>' +
    '<button class="pill-button ' + (canBuy ? 'primary' : 'ghost') + '" type="button" data-buy="' + item.id + '" ' + (canBuy ? '' : 'disabled') + '>' +
      (owned ? t("shop.purchased") : canBuy ? t("shop.buyReward") : t("shop.needMoreCoins")) +
    '</button>' +
  '</article>';
}

function buyReward(itemId) {
  const user = getUser();
  const item = shopItems.find((reward) => reward.id === itemId);
  if (!user || !item || user.purchases.includes(item.id) || user.coins < item.cost) return;
  user.coins -= item.cost;
  user.purchases.push(item.id);
  user.rewards.push(item.title);
  addBadge(user, `Bought ${item.title}`);
  saveUser(user);
  render();
  flushBadgeCelebrations();
}

function moduleCard(module, interactive, user = null) {
  const done = user?.completedModules.includes(module.id);
  const unlocked = !interactive || isModuleUnlocked(user, module.id);
  const action = interactive
    ? unlocked
      ? '<button class="pill-button primary" type="button" data-module="' + module.id + '">' + t("modules.openLevel", { level: formatNumber(moduleIndex(module.id) + 1) }) + '</button>'
      : '<button class="pill-button ghost" type="button" data-locked="' + module.id + '">' + t("modules.locked") + '</button>'
    : '<button class="pill-button ghost" type="button" data-jump="auth">' + t("modules.loginToLearn") + '</button>';
  const moduleNumber = moduleIndex(module.id) + 1;
  return '<article class="chapter-card module-' + module.color + ' ' + (unlocked ? '' : 'locked-card') + '">' +
    '<div class="chapter-art"><span class="module-emoji">' + module.icon + '</span></div>' +
    '<p class="level-chip">' + t("modules.moduleNumber", { number: formatNumber(moduleNumber) }, "Module " + formatNumber(moduleNumber)) + ' • ' + t("levels." + module.level.toLowerCase()) + '</p>' +
    '<h3>' + t("modules.numberedTitle", { number: formatNumber(moduleNumber), title: moduleText(module, "title") }, "Module " + formatNumber(moduleNumber) + ": " + moduleText(module, "title")) + (done ? ' ?' : '') + '</h3>' +
    '<p>' + moduleText(module, "story") + '</p>' +
    '<p><strong>' + t("modules.badgeLabel") + ':</strong> ' + moduleText(module, "badge") + '</p>' +
    action +
  '</article>';
}

function videoCard(video, index) {
  const id = getYouTubeId(video.url);
  const title = videoTitle(video, index);
  const moduleId = modules[index]?.id || "";
  const user = getUser();
  const watched = hasWatchedModuleVideo(user, moduleId);
  if (!id) {
    return '<article class="video-slot"><div><span class="icon-dot">&#9658;</span><h2>' + title + '</h2><p>' + t("videos.invalid") + '</p></div></article>';
  }
  return '<article class="video-card video-card-button ' + (watched ? 'watched' : '') + '" role="button" tabindex="0" data-video-id="' + id + '" data-module-id="' + moduleId + '" data-title="' + title + '" aria-label="' + t("videos.watchAria", { title }) + '">' +
    '<div class="video-thumb"><span>▶</span></div>' +
    '<h3>' + title + '</h3>' +
    '<p class="video-card-note">' + (watched ? t("videos.watched", {}, "Watched. Quiz unlocked.") : t("videos.cardNote")) + '</p>' +
  '</article>';
}

function renderVideoModal() {
  if (!activeVideo) return "";
  return '<div class="video-modal" role="dialog" aria-modal="true" aria-label="' + activeVideo.title + '">' +
    '<div class="video-modal-card">' +
      '<div class="chat-head"><span>' + activeVideo.title + '</span><button class="icon-button" type="button" data-action="close-video">' + t("common.close") + '</button></div>' +
      '<div class="player-shell"><div class="video-fallback direct-watch">' +
        '<img src="' + activeVideo.thumbUrl + '" alt="' + t("videos.thumbnailAlt", { title: activeVideo.title }) + '" />' +
        '<div><h2>' + t("videos.watchOnYoutube") + '</h2>' +
        '<p>' + t("videos.fallbackText") + '</p>' +
        '<div class="button-row"><button class="pill-button primary video-link-button" type="button" data-action="watch-current-video">' + t("videos.watchVideo") + '</button>' +
        '<button class="pill-button ghost" type="button" data-action="copy-video-link">' + t("videos.copyLink") + '</button></div>' +
        '</div></div></div>' +
    '</div></div>';
}

function renderVoiceAssistant(user) {
  const name = user?.name || t("assistant.friend");
  const panelStyle = assistantPanelPosition ? ' style="left:' + assistantPanelPosition.left + 'px; top:' + assistantPanelPosition.top + 'px; right:auto; bottom:auto;"' : "";
  const readAloudButton = currentLanguage === "en"
    ? '<button class="pill-button ghost" type="button" data-action="read-aloud">' + t("assistant.readAloud", {}, "Read aloud") + '</button>'
    : "";
  const messages = assistantMessages.map((message) => {
    const body = message.textKey ? t(message.textKey) : message.text;
    return '<p class="voice-msg ' + message.from + '">' + body + '</p>';
  }).join("");
  return '<button class="voice-fab" type="button" data-action="toggle-assistant" aria-label="' + t("assistant.openAria") + '">' +
    '<span>&#129302;</span><small>' + t("assistant.buddyShort") + '</small></button>' +
    (assistantOpen ?
      '<aside class="voice-panel ' + (assistantExpanded ? 'expanded' : '') + '" role="dialog" aria-label="' + t("assistant.dialogAria") + '"' + panelStyle + '>' +
        '<div class="buddy-border-title" aria-hidden="true">Rights Buddy</div>' +
        '<div class="voice-head" data-drag-assistant="true" title="' + t("assistant.dragHint", {}, "Drag to move") + '"><div class="buddy-title-wrap"><span class="buddy-subtitle">' + t("assistant.subtitle", { name }) + '</span></div>' +
        '<div class="voice-head-actions">' +
        '<button class="icon-button" type="button" data-action="toggle-assistant-size">' + (assistantExpanded ? t("assistant.compact", {}, "Compact") : t("assistant.expand", {}, "Expand")) + '</button>' +
        '<button class="icon-button" type="button" data-action="cancel-assistant">' + t("common.cancel", {}, "Cancel") + '</button></div></div>' +
        '<div class="voice-safety"><strong>' + t("assistant.safePromiseLabel") + ':</strong> ' + t("assistant.safePromise") + '</div>' +
        '<div class="voice-messages" id="assistantMessages">' + messages + '</div>' +
        '<div class="quick-prompts" aria-label="' + t("assistant.quickAria") + '">' +
          '<button type="button" data-ask="education">' + t("assistant.quick.education") + '</button>' +
          '<button type="button" data-ask="unsafe">' + t("assistant.quick.unsafe") + '</button>' +
          '<button type="button" data-ask="quiz">' + t("assistant.quick.quiz") + '</button>' +
          '<button type="button" data-ask="confused">' + t("assistant.quick.confused") + '</button>' +
        '</div>' +
        '<div class="situation-prompts" aria-label="' + t("assistant.situationsAria", {}, "Child safety situations") + '">' +
          '<strong>' + t("assistant.situationsTitle", {}, "Choose a situation") + '</strong>' +
          '<div>' + situationPrompts.map((item) => '<button type="button" data-situation="' + item[0] + '">' + situationText(item, "prompt") + '</button>').join("") + '</div>' +
        '</div>' +
        '<form class="voice-form" data-form="assistant">' +
          '<button class="pill-button mic-button" type="button" data-action="start-mic" aria-label="' + t("assistant.mic", {}, "Mic") + '"><span aria-hidden="true">🎙</span><strong>' + t("assistant.mic", {}, "Mic") + '</strong></button>' +
          '<input name="assistantText" placeholder="' + t("assistant.placeholder") + '" autocomplete="off" />' +
          '<button class="pill-button primary" type="submit">' + t("assistant.ask") + '</button>' +
        '</form>' +
        '<p class="voice-status" aria-live="polite">' + t(assistantStatus) + '</p>' +
        '<div class="assistant-tools">' + readAloudButton +
        '<button class="pill-button ghost" type="button" data-action="cancel-assistant">' + t("common.cancel", {}, "Cancel") + '</button></div>' +
      '</aside>' : '');
}

function renderQuiz(module, user) {
  const question = module.quiz[quizState.index];
  const questionIndex = quizState.index;
  const optionOrder = quizState.optionOrders?.[questionIndex] || question.options.map((_, index) => index);
  const progress = Math.round(((quizState.index + (quizState.answered ? 1 : 0)) / module.quiz.length) * 100);
  return '<section class="quiz-card dashboard-quiz quiz-pop" id="quiz-zone">' +
    '<p class="level-chip">' + t("quiz.label", { title: moduleText(module, "title") }) + '</p>' +
    '<div class="quiz-progress"><span>' + t("quiz.questionProgress", { current: formatNumber(questionIndex + 1), total: formatNumber(module.quiz.length) }, "Question " + formatNumber(questionIndex + 1) + " of " + formatNumber(module.quiz.length)) + '</span><span>' + formatPercent(progress) + '</span></div>' +
    '<div class="progress-track mini"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
    '<h2>' + quizText(module, questionIndex, "question") + '</h2>' +
    '<div class="answer-grid">' +
      optionOrder.map((optionIndex) => '<button class="answer-button ' + answerClass(question, optionIndex) + '" type="button" data-answer="' + optionIndex + '">' + quizText(module, questionIndex, "options", optionIndex) + '</button>').join("") +
    '</div>' +
    '<p class="feedback">' + (quizState.feedback || t("quiz.chooseFeedback")) + '</p>' +
    (quizState.complete ? '' : '<button class="pill-button primary" type="button" data-action="next-question">' + (quizState.answered ? t("common.next") : t("quiz.checkAnswer")) + '</button>') +
  '</section>';
}

function answerClass(question, index) {
  if (!quizState?.answered) return "";
  if (index === question.answer) return "correct";
  if (index === quizState.selected) return "wrong";
  return "";
}

function completeModule() {
  const user = getUser();
  const module = modules.find((item) => item.id === selectedModuleId);
  if (!user || !module) return;
  if (!user.completedModules.includes(module.id)) {
    user.completedModules.push(module.id);
    user.points += module.points;
    addBadge(user, "First Lesson Completed");
    addBadge(user, module.badge);
    if (user.completedModules.length === modules.length) addBadge(user, "Child Rights Champion");
    user.rewards.push(`${module.id} completed`);
    saveUser(user);
  }
  render();
  flushBadgeCelebrations();
}

function startQuiz() {
  const user = getUser();
  if (!isModuleUnlocked(user, selectedModuleId)) {
    quizState = null;
    alert(nextLockedMessage(selectedModuleId));
    return;
  }
  if (!hasWatchedModuleVideo(user, selectedModuleId)) {
    quizState = null;
    alert(t("quiz.watchVideoFirstAlert", {}, "Please watch this module video first. Then the quiz will unlock."));
    render();
    scrollToVideoReminder();
    return;
  }
  if (user.quizScores[selectedModuleId]) {
    user.analytics.quizRetries += 1;
    saveUser(user);
  }
  const module = modules.find((item) => item.id === selectedModuleId);
  quizState = makeQuizState(module);
  trackEvent("quiz_start");
  render();
  scrollToQuiz();
}
function openModuleQuiz(moduleId) {
  const user = getUser();
  selectedModuleId = moduleId;
  if (!isModuleUnlocked(user, moduleId)) {
    quizState = null;
    alert(nextLockedMessage(moduleId));
    return;
  }
  if (!hasWatchedModuleVideo(user, moduleId)) {
    quizState = null;
    trackEvent("module_open", { moduleId, needsVideo: true });
    render();
    scrollToVideoReminder();
    return;
  }
  const module = modules.find((item) => item.id === moduleId);
  quizState = makeQuizState(module);
  trackEvent("module_open", { moduleId });
  trackEvent("quiz_start", { moduleId });
  render();
  scrollToQuiz();
}
function scrollToVideoReminder() {
  requestAnimationFrame(() => {
    document.querySelector(".quiz-video-reminder")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
function scrollToQuiz() {
  requestAnimationFrame(() => {
    document.querySelector("#quiz-zone")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
function selectAnswer(index) {
  if (!quizState || quizState.answered || quizState.complete) return;
  const module = modules.find((item) => item.id === selectedModuleId);
  const question = module.quiz[quizState.index];
  quizState.selected = index;
  quizState.answered = true;

  if (index === question.answer) {
    quizState.score += 1;
    playCorrectAnswerSound();
    trackEvent("correct_answer", { question: quizState.index });
    quizState.feedback = t("quiz.correctFeedback", { explain: quizText(module, quizState.index, "explain") });
  } else {
    playWrongAnswerSound();
    const user = getUser();
    if (user) {
      user.analytics.wrongAnswers += 1;
      saveUser(user);
    }
    trackEvent("wrong_answer", { question: quizState.index });
    quizState.feedback = t("quiz.wrongFeedback", { explain: quizText(module, quizState.index, "explain") });
  }
  render();
}
function nextQuestion() {
  const user = getUser();
  const module = modules.find((item) => item.id === selectedModuleId);
  if (quizState.complete) return;
  if (!quizState.answered) {
    quizState.feedback = t("quiz.pickAnswer");
    render();
    return;
  }
  if (quizState.index < module.quiz.length - 1) {
    quizState.index += 1;
    quizState.selected = null;
    quizState.answered = false;
    quizState.feedback = "";
  } else {
    const accuracy = Math.round((quizState.score / module.quiz.length) * 100);
    const previousBest = user.quizScores[module.id]?.score || 0;
    const improvedAnswers = Math.max(0, quizState.score - previousBest);
    const earnedCoins = quizState.score * 25;
    const earnedPoints = improvedAnswers * 10 + (accuracy === 100 ? 20 : 0);
    user.points += earnedPoints;
    user.coins += earnedCoins;
    user.quizScores[module.id] = { score: quizState.score, total: module.quiz.length, accuracy, coinsEarned: earnedCoins };
    if (!user.completedLevels.includes(module.id)) user.completedLevels.push(module.id);
    if (!user.completedModules.includes(module.id)) user.completedModules.push(module.id);
    addBadge(user, module.badge);
    if (accuracy === 100) addBadge(user, "Quiz Master");
    saveUser(user);
    trackEvent("quiz_complete", { moduleId: module.id, accuracy, score: quizState.score });
    quizState.feedback = t("quiz.completeFeedback", {
      score: formatNumber(quizState.score),
      total: formatNumber(module.quiz.length),
      accuracy: formatNumber(accuracy),
      coins: formatNumber(earnedCoins)
    });
    pendingRewardCelebration = { coins: earnedCoins, points: earnedPoints };
    quizState.answered = true;
    quizState.complete = true;
  }
  render();
  if (pendingRewardCelebration) {
    const reward = pendingRewardCelebration;
    pendingRewardCelebration = null;
    playQuizScoreSound();
    celebrateReward(reward);
  }
}
function jumpTo(id) {
  const user = getUser();
  const mentorTargets = {
    about: "mentor-about",
    modules: "mentor-guide",
    videos: "mentor-support"
  };
  const targetId = isMentorUser(user) ? (mentorTargets[id] || id) : id;
  if (user && (id === "about" || id === "modules" || id === "videos" || id === "quiz-zone" || id === "quiz-guide")) {
    view = "dashboard";
  } else {
    view = "home";
  }
  render();
  requestAnimationFrame(() => {
    const target = document.getElementById(targetId) || document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function speakAssistant(text) {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  stopAssistantAudio();
  if (currentLanguage === "hi" || currentLanguage === "kn") {
    playTranslatedTts(text).catch(() => speakWithBrowserVoice(text));
    return;
  }
  speakWithBrowserVoice(text);
}

function speakWithBrowserVoice(text) {
  if (!("speechSynthesis" in window)) return;
  let spoken = false;
  const speakNow = () => {
    if (spoken) return;
    spoken = true;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageConfig().speech;
    utterance.rate = currentLanguage === "en" ? 0.9 : 0.86;
    utterance.pitch = currentLanguage === "en" ? 1.48 : 1.2;
    const voice = chooseFemaleVoice(utterance.lang);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };
  waitForSpeechVoices().then(speakNow);
}

function waitForSpeechVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices?.() || [];
    if (voices.length) {
      resolve(voices);
      return;
    }
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve(window.speechSynthesis.getVoices?.() || []);
    };
    window.speechSynthesis.onvoiceschanged = done;
    window.setTimeout(done, 1300);
  });
}

function stopAssistantAudio() {
  if (activeAssistantAudio) {
    activeAssistantAudio.pause();
    activeAssistantAudio.src = "";
    activeAssistantAudio = null;
  }
}

function ttsCode() {
  if (currentLanguage === "hi") return "hi";
  if (currentLanguage === "kn") return "kn";
  return "en-IN";
}

async function playTranslatedTts(text) {
  const chunks = splitTtsText(text, 170);
  for (const chunk of chunks) {
    await playTtsChunk(chunk);
  }
  assistantStatus = "assistant.status.ready";
  render();
}

function playTtsChunk(text) {
  return new Promise((resolve, reject) => {
    const url = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=" + encodeURIComponent(ttsCode()) + "&ttsspeed=1&total=1&idx=0&textlen=" + encodeURIComponent(String(text).length) + "&q=" + encodeURIComponent(text);
    const audio = new Audio(url);
    activeAssistantAudio = audio;
    audio.setAttribute("playsinline", "true");
    audio.onended = resolve;
    audio.onerror = reject;
    audio.play().catch(() => {
      showAudioFallback(url);
      reject();
    });
  });
}

function showAudioFallback(url) {
  const panel = document.querySelector(".voice-panel");
  if (!panel) return;
  panel.querySelector(".tts-fallback")?.remove();
  const box = document.createElement("div");
  box.className = "tts-fallback";
  box.innerHTML = '<strong>' + t("assistant.audioReady", {}, "Audio ready") + '</strong><audio controls autoplay src="' + url + '"></audio>';
  panel.appendChild(box);
}

function splitTtsText(text, maxLength) {
  const parts = String(text || "").split(/(?<=[.!?।])\s+/);
  const chunks = [];
  let current = "";
  for (const part of parts) {
    if ((current + " " + part).trim().length > maxLength && current) {
      chunks.push(current);
      current = part;
    } else {
      current = (current + " " + part).trim();
    }
  }
  if (current) chunks.push(current);
  return chunks.length ? chunks : [String(text || "")];
}

function celebrateReward({ coins = 0, points = 0 } = {}) {
  if (!coins && !points) return;
  document.querySelector(".reward-burst")?.remove();
  const burst = document.createElement("div");
  burst.className = "reward-burst";
  burst.setAttribute("aria-live", "polite");
  const label = document.createElement("div");
  label.className = "reward-burst-label";
  label.textContent = "+" + formatNumber(coins) + " coins  +" + formatNumber(points) + " points";
  burst.appendChild(label);
  for (let index = 0; index < 18; index += 1) {
    const coin = document.createElement("span");
    coin.className = "falling-coin";
    coin.textContent = "🪙";
    coin.style.left = (10 + Math.random() * 80) + "vw";
    coin.style.animationDelay = (Math.random() * 0.45) + "s";
    coin.style.animationDuration = (1.4 + Math.random() * 0.9) + "s";
    burst.appendChild(coin);
  }
  document.body.appendChild(burst);
  playRewardSound();
  flushBadgeCelebrations();
  window.setTimeout(() => burst.remove(), 2600);
}

function flushBadgeCelebrations() {
  if (!pendingBadgeCelebrations.length) return;
  const badges = [...new Set(pendingBadgeCelebrations)];
  pendingBadgeCelebrations = [];
  badges.forEach((badge, index) => {
    window.setTimeout(() => celebrateBadge(badge), index * 700);
  });
}

function celebrateBadge(badge) {
  document.querySelector(".badge-unlock-burst")?.remove();
  const burst = document.createElement("div");
  burst.className = "badge-unlock-burst";
  burst.setAttribute("aria-live", "polite");
  const card = document.createElement("div");
  card.className = "badge-unlock-card";
  card.innerHTML = '<div class="badge-medal">🏅</div><p>' + t("badges.unlocked", {}, "Badge Unlocked") + '</p><h2>' + badgeLabel(badge) + '</h2>';
  burst.appendChild(card);
  for (let index = 0; index < 14; index += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "badge-sparkle";
    sparkle.textContent = "✨";
    sparkle.style.left = (18 + Math.random() * 64) + "vw";
    sparkle.style.top = (14 + Math.random() * 48) + "vh";
    sparkle.style.animationDelay = (Math.random() * 0.5) + "s";
    burst.appendChild(sparkle);
  }
  document.body.appendChild(burst);
  playBadgeSound();
  window.setTimeout(() => burst.remove(), 2400);
}

function playBadgeSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const notes = [523, 659, 784, 1046];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index % 2 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.07);
    gain.gain.exponentialRampToValueAtTime(0.14, context.currentTime + index * 0.07 + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.07 + 0.22);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + index * 0.07);
    oscillator.stop(context.currentTime + index * 0.07 + 0.24);
  });
}

function playRewardSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const notes = [660, 880, 1175];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.08 + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + index * 0.08);
    oscillator.stop(context.currentTime + index * 0.08 + 0.2);
  });
}

function playQuizScoreSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const notes = [523, 659, 784, 1046, 1318];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index % 2 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.075);
    gain.gain.exponentialRampToValueAtTime(0.16, context.currentTime + index * 0.075 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.075 + 0.22);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + index * 0.075);
    oscillator.stop(context.currentTime + index * 0.075 + 0.24);
  });
}

function playCorrectAnswerSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const notes = [660, 880, 1175];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.055);
    gain.gain.exponentialRampToValueAtTime(0.13, context.currentTime + index * 0.055 + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.055 + 0.16);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + index * 0.055);
    oscillator.stop(context.currentTime + index * 0.055 + 0.18);
  });
}

function playWrongAnswerSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const notes = [330, 247];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.075, context.currentTime + index * 0.12 + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.12 + 0.24);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime + index * 0.12);
    oscillator.stop(context.currentTime + index * 0.12 + 0.26);
  });
}

function playButtonSound() {
  const now = Date.now();
  if (now - lastButtonSoundAt < 80) return;
  lastButtonSoundAt = now;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(520, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(760, context.currentTime + 0.08);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.09, context.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.14);
}

function chooseFemaleVoice(lang) {
  if (!("speechSynthesis" in window)) return null;
  const base = String(lang || "en").slice(0, 2).toLowerCase();
  const voices = window.speechSynthesis.getVoices?.() || [];
  const matching = voices.filter((voice) => voice.lang.toLowerCase().startsWith(base));
  const preferredFemaleNames = /(zira|jenny|aria|samantha|susan|victoria|karen|moira|tessa|fiona|serena|natasha|sonia|libby|veena|heera|kalpana|swara|lekha|female|woman|google us english|google uk english female)/i;
  const avoidMaleNames = /(david|mark|alex|daniel|ravi|male|man|guy|fred|ralph|george|aaron)/i;
  const saved = voices.find((voice) => voice.name === preferredAssistantVoiceName && voice.lang.toLowerCase().startsWith(base));
  const selected = saved ||
    matching.find((voice) => preferredFemaleNames.test(voice.name) && !avoidMaleNames.test(voice.name)) ||
    voices.find((voice) => preferredFemaleNames.test(voice.name) && !avoidMaleNames.test(voice.name)) ||
    matching.find((voice) => !avoidMaleNames.test(voice.name)) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("en") && preferredFemaleNames.test(voice.name) && !avoidMaleNames.test(voice.name)) ||
    null;
  if (selected) preferredAssistantVoiceName = selected.name;
  return selected;
}

function addAssistantMessage(from, text, speak = false) {
  assistantMessages.push({ from, text });
  assistantMessages = assistantMessages.slice(-8);
  assistantStatus = from === "user" ? "assistant.status.thinking" : "assistant.status.ready";
  if (speak && from === "assistant") speakAssistant(text);
  render();
  requestAnimationFrame(() => {
    const messageBox = document.querySelector("#assistantMessages");
    if (messageBox) messageBox.scrollTop = messageBox.scrollHeight;
  });
}

function latestAssistantText() {
  const latest = [...assistantMessages].reverse().find((message) => message.from === "assistant");
  if (!latest) return "";
  return latest.textKey ? t(latest.textKey) : latest.text;
}

function assistantReply(input) {
  const text = String(input || "").toLowerCase();
  const user = getUser();
  const selected = modules.find((module) => module.id === selectedModuleId);
  const situation = situationPrompts.find((item) => item[1].toLowerCase() === text || situationText(item, "prompt").toLowerCase() === text);
  if (situation) return situationText(situation, "answer");

  if (/(unsafe|danger|scared|afraid|abuse|hurt|touch|threat|follow|alone|असुरक्षित|डर|खतरा|सहायता|ಅಸುರಕ್ಷಿತ|ಭಯ|ಸಹಾಯ)/.test(text)) {
    return t("assistant.responses.unsafe");
  }
  if (/(confused|don't understand|do not understand|hard|difficult|stuck|समझ|मुश्किल|ಅರ್ಥ|ಕಷ್ಟ)/.test(text)) {
    return t("assistant.responses.confused", { title: selected ? moduleText(selected, "title") : t("assistant.lesson") });
  }
  if (/(quiz|answer|test|score|level|प्रश्न|उत्तर|क्विज|ಪ್ರಶ್ನೆ|ಉತ್ತರ|ಕ್ವಿಜ್)/.test(text)) {
    return t("assistant.responses.quiz");
  }
  if (/(education|school|article 21a|21a|शिक्षा|स्कूल|ಶಿಕ್ಷಣ|ಶಾಲೆ)/.test(text)) {
    return t("assistant.responses.education");
  }
  if (/(pocso|protection|abuse|exploitation|पोक्सो|सुरक्षा|शोषण|ಪೋಕ್ಸೋ|ರಕ್ಷಣೆ)/.test(text)) {
    return t("assistant.responses.pocso");
  }
  if (/(juvenile|justice|law|case|innocent|lawyer|legal aid|न्याय|कानून|वकील|ನ್ಯಾಯ|ಕಾನೂನು|ವಕೀಲ)/.test(text)) {
    return t("assistant.responses.justice");
  }
  if (/(privacy|dignity|heard|opinion|speak|गोपनीयता|सम्मान|सुनना|ಗೌಪ್ಯತೆ|ಗೌರವ|ಕೇಳಿಸಿಕೊಳ್ಳುವ)/.test(text)) {
    return t("assistant.responses.privacy");
  }
  if (/(reward|coin|shop|cycle|books|badge|इनाम|सिक्के|ಪುಸ್ತಕ|ನಾಣ್ಯ|ಬಹುಮಾನ)/.test(text)) {
    return t("assistant.responses.reward", { coins: formatNumber(user?.coins || 0) });
  }
  if (/(progress|completed|dashboard|प्रगति|पूरा|ಪ್ರಗತಿ|ಮುಗಿದ)/.test(text)) {
    return t("assistant.responses.progress", { progress: formatNumber(user ? progressPercent(user) : 0) });
  }
  if (/(hello|hi|hey|buddy|नमस्ते|हेलो|ನಮಸ್ಕಾರ|ಹಲೋ)/.test(text)) {
    return t("assistant.responses.hello");
  }
  return t("assistant.responses.default");
}

function askAssistant(text, speak = true) {
  const promptMap = {
    education: t("assistant.prompts.education"),
    unsafe: t("assistant.prompts.unsafe"),
    quiz: t("assistant.prompts.quiz"),
    confused: t("assistant.prompts.confused"),
    "help-rights": t("assistant.prompts.helpRights")
  };
  const clean = String(promptMap[text] || text || "").trim();
  if (!clean) return;
  trackEvent("assistant_help", { prompt: clean.slice(0, 60) });
  assistantOpen = true;
  assistantStatus = "assistant.status.thinking";
  addAssistantMessage("user", clean);
  window.setTimeout(() => addAssistantMessage("assistant", assistantReply(clean), speak), 250);
}

function cancelAssistant() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  stopAssistantAudio();
  if (activeRecognition) {
    activeRecognition.stop();
    activeRecognition = null;
  }
  assistantStatus = "assistant.status.cancelled";
  assistantOpen = false;
  assistantExpanded = false;
  render();
}

function readAssistantAloud() {
  const text = latestAssistantText();
  if (!text) return;
  assistantStatus = "assistant.status.reading";
  render();
  speakAssistant(text);
}

function startMicListening() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    startBasicMicFallback();
    return;
  }
  if (activeRecognition) {
    activeRecognition.stop();
    activeRecognition = null;
  }
  assistantOpen = true;
  assistantStatus = "assistant.status.micPermission";
  render();
  const recognition = new Recognition();
  activeRecognition = recognition;
  recognition.lang = languageConfig().speech;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || "";
    activeRecognition = null;
    if (transcript.trim()) {
      assistantStatus = "assistant.status.heard";
      askAssistant(transcript.trim(), true);
    } else {
      assistantStatus = "assistant.status.tap";
      render();
    }
  };
  recognition.onend = () => {
    if (activeRecognition === recognition) {
      activeRecognition = null;
      assistantStatus = "assistant.status.tap";
      render();
    }
  };
  recognition.onerror = () => {
    activeRecognition = null;
    startBasicMicFallback();
  };
  recognition.onstart = () => {
    assistantStatus = "assistant.status.listening";
    render();
  };
  try {
    recognition.start();
  } catch {
    activeRecognition = null;
    startBasicMicFallback();
  }
}

function startBasicMicFallback() {
  assistantOpen = true;
  assistantStatus = "assistant.status.micPermission";
  render();
  if (!navigator.mediaDevices?.getUserMedia) {
    assistantStatus = "assistant.status.micConnectedNoSpeech";
    render();
    return;
  }
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      assistantStatus = "assistant.status.listening";
      render();
      window.setTimeout(() => {
        stream.getTracks().forEach((track) => track.stop());
        assistantStatus = "assistant.status.voiceHeard";
        render();
      }, 4200);
    })
    .catch(() => {
      assistantStatus = "assistant.status.micConnectedNoSpeech";
      render();
    });
}

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (form.dataset.form === "assistant") {
    event.preventDefault();
    const data = new FormData(form);
    askAssistant(data.get("assistantText"), true);
    return;
  }
  if (form.dataset.form !== "auth") return;
  event.preventDefault();
  const data = new FormData(form);
  const audience = String(data.get("audience") || authAudience);
  const email = String(data.get("email") || "").toLowerCase();
  const password = String(data.get("password") || "");

  if (audience === "child") {
    const age = Number(data.get("age"));
    const name = String(data.get("name") || "Student").trim();
    const avatar = String(data.get("avatar") || "star");
    authMessage = "";
    if (age < 8 || age > 14) {
      authMessage = "auth.errors.childAgeRange";
      render();
      return;
    }
    const childEmail = childProfileEmail(name, age, avatar);
    const legacyChildEmail = childProfileEmail(name, age);
    let user = users.find((item) => item.email === childEmail) ||
      users.find((item) => item.email === legacyChildEmail && (item.avatar || "star") === avatar);
    if (!user) {
      user = createUser({ name, age, email: childEmail, password: "child-profile", avatar });
      user.role = "child";
      users.push(user);
    } else {
      user.name = name;
      user.age = age;
      user.avatar = avatar;
      if (user.email === legacyChildEmail && !users.some((item) => item.email === childEmail)) {
        user.email = childEmail;
      }
    }
    saveUsers();
    sessionEmail = user.email;
    localStorage.setItem(SESSION_KEY, sessionEmail);
    view = "dashboard";
    trackEvent("login");
    render();
    return;
  }

  if (authMode === "signup") {
    const age = audience === "adult" ? 30 : Number(data.get("age"));
    const name = String(data.get("name") || "Student").trim();
    const confirmPassword = String(data.get("confirmPassword") || "");
    authMessage = "";

    if (password !== confirmPassword) {
      authMessage = "auth.errors.passwordMismatch";
      render();
      return;
    }
    const role = audience === "adult" ? String(data.get("role") || "parent") : String(data.get("role") || "child");
    if (role === "child" && (age < 8 || age > 14)) {
      form.querySelector("[name='age']").setCustomValidity(t("auth.errors.ageRange"));
      form.querySelector("[name='age']").reportValidity();
      return;
    }
    if (users.some((user) => user.email === email)) {
      authMessage = "auth.errors.emailRegistered";
      render();
      return;
    }
    const user = createUser({
      name,
      age,
      email,
      password
    });
    user.role = role;
    users.push(user);
    saveUsers();
    authMode = "login";
    authMessage = "auth.success.accountCreated";
    view = "home";
  } else {
    authMessage = "";
    const registeredUser = users.find((item) => item.email === email);
    if (!registeredUser) {
      authMessage = "auth.errors.userNotFound";
      render();
      return;
    }
    if (registeredUser.password !== password) {
      authMessage = "auth.errors.incorrectPassword";
      render();
      return;
    }
    const user = registeredUser;
    if (!user) {
      authMessage = "auth.errors.userNotFound";
      render();
      return;
    }
    sessionEmail = user.email;
    localStorage.setItem(SESSION_KEY, sessionEmail);
    user.analytics.sessionStartedAt = Date.now();
    user.analytics.lastActiveAt = Date.now();
    saveUser(user);
    view = "dashboard";
    trackEvent("login");
  }
  render();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button?.dataset.answer !== undefined) return;
  if (button && !button.disabled) playButtonSound();
}, true);

function handleAction(action, source = null) {
  if (action === "audience-child") {
    authAudience = "child";
    authMessage = "";
    render();
    return;
  }
  if (action === "audience-adult") {
    authAudience = "adult";
    authMode = "signup";
    authMessage = "";
    render();
    return;
  }
  if (action === "audience-back") {
    authAudience = "ask";
    authMessage = "";
    render();
    return;
  }
  if (action === "switch-auth") {
    authMode = authMode === "signup" ? "login" : "signup";
    render();
    return;
  }
  if (action === "demo-login") {
    let demo = users.find((user) => user.email === "demo@rightsquest.in");
    if (!demo) {
      demo = createUser({ name: "Diya Demo", age: 11, email: "demo@rightsquest.in", password: "demo123" });
      users.push(demo);
      saveUsers();
    }
    demo.name = "Diya Demo";
    saveUser(demo);
    sessionEmail = demo.email;
    localStorage.setItem(SESSION_KEY, sessionEmail);
    view = "dashboard";
    trackEvent("login");
    render();
    return;
  }
  if (action === "mentor-demo") {
    let demo = users.find((user) => user.email === "mentor@rightsquest.in");
    if (!demo) {
      demo = createUser({ name: "Mentor Demo", age: 34, email: "mentor@rightsquest.in", password: "demo123" });
      demo.role = "teacher";
      users.push(demo);
      saveUsers();
    }
    sessionEmail = demo.email;
    localStorage.setItem(SESSION_KEY, sessionEmail);
    view = "dashboard";
    render();
    return;
  }
  if (action === "mentor-note") {
    alert(t("mentor.noteSent", {}, "Encouragement note saved for the child."));
    return;
  }
  if (action === "mentor-kit") {
    alert(t("mentor.kitOpened", {}, "Support kit: discuss trusted adults, emergency 1098, school attendance, and safe touch rules."));
    return;
  }
  if (action === "logout") {
    sessionEmail = null;
    localStorage.removeItem(SESSION_KEY);
    view = "home";
    authAudience = "ask";
    render();
    return;
  }
  if (action === "close-video") {
    activeVideo = null;
    render();
    return;
  }
  if (action === "watch-current-video" && activeVideo) {
    openExternalVideo(activeVideo.watchUrl);
    return;
  }
  if (action === "copy-video-link" && activeVideo) {
    navigator.clipboard?.writeText(activeVideo.watchUrl);
    return;
  }
  if (action === "toggle-assistant") {
    assistantOpen = !assistantOpen;
    assistantStatus = assistantOpen ? "assistant.status.tap" : assistantStatus;
    render();
    return;
  }
  if (action === "toggle-assistant-size") {
    assistantExpanded = !assistantExpanded;
    if (assistantExpanded) assistantPanelPosition = null;
    render();
    return;
  }
  if (action === "cancel-assistant") {
    cancelAssistant();
    return;
  }
  if (action === "read-aloud") {
    readAssistantAloud();
    return;
  }
  if (action === "start-mic") {
    startMicListening();
    return;
  }
  if (action === "complete-module") {
    completeModule();
    return;
  }
  if (action === "start-quiz") {
    startQuiz();
    return;
  }
  if (action === "next-question") {
    nextQuestion();
    return;
  }
  if (action === "demo-progress") {
    const user = getUser();
    user.points += 20;
    addBadge(user, "Rights Explorer");
    saveUser(user);
    render();
    celebrateReward({ points: 20 });
    return;
  }
  if (action === "comeback-bonus") {
    const user = getUser();
    if (!user) return;
    if (hasClaimedComebackBonus(user)) {
      user.analytics.lastReengagementMessage = t("engagement.bonusAlreadyClaimed", {}, "You already claimed today's comeback bonus. Try a quiz mission to earn more coins.");
      saveUser(user);
      render();
      return;
    }
    user.coins += 15;
    user.points += 10;
    user.analytics.comebackBonuses += 1;
    user.analytics.comebackBonusClaimedOn = todayKey();
    user.analytics.lastReengagementMessage = t("engagement.comebackClaimed", {}, "Comeback bonus claimed. You earned 15 coins and 10 points.");
    addBadge(user, "Comeback Star");
    saveUser(user);
    trackEvent("comeback_bonus");
    render();
    celebrateReward({ coins: 15, points: 10 });
    return;
  }
  if (action === "streak-freeze") {
    const user = getUser();
    if (!user) return;
    if (user.analytics.streakFreeze > 0) {
      user.analytics.streakFreeze -= 1;
      user.points += 5;
      user.analytics.lastReengagementMessage = t("engagement.streakUsed", {}, "Streak freeze used. Your learning streak is protected.");
      trackEvent("streak_freeze");
      saveUser(user);
      pendingRewardCelebration = { points: 5 };
    } else {
      user.analytics.lastReengagementMessage = t("engagement.noStreakFreeze", {}, "No streak freezes left right now. Complete a quiz to earn more rewards.");
      saveUser(user);
    }
    render();
    if (pendingRewardCelebration) {
      const reward = pendingRewardCelebration;
      pendingRewardCelebration = null;
      celebrateReward(reward);
    }
    return;
  }
}

loadLanguage(currentLanguage).then(render);

/* Production backend plan:
   Firebase collections or MongoDB collections:
   users: { id, name, age, email, passwordHash, createdAt }
   progress: { userId, moduleId, completed, pointsEarned, updatedAt }
   quizzes: { userId, moduleId, score, total, accuracy, attempts }
   rewards: { userId, badgeName, unlockedAt }

   API examples for Node.js/Express:
   POST /api/auth/signup
   POST /api/auth/login
   GET /api/modules
   POST /api/progress
   POST /api/quiz-attempts
   GET /api/users/:id/dashboard
*/






