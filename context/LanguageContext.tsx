"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "mr";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const translations: Translations = {
  admin: {
    en: "Admin",
    hi: "एडमिन",
    mr: "प्रशासक",
  },
  revolutionize: {
    en: "Revolutionize Your Healthcare",
    hi: "अपनी स्वास्थ्य सेवा में क्रांति लाएं",
    mr: "आपल्या आरोग्य सेवेमध्ये क्रांती घडवा",
  },
  discover: {
    en: "Discover CarePulse, a seamless platform to book appointments, manage lab tests, and access digital prescriptions—designed to put health at your fingertips.",
    hi: "केयरपल्स की खोज करें, अपॉइंटमेंट बुक करने, लैब टेस्ट प्रबंधित करने और डिजिटल नुस्खे एक्सेस करने के लिए एक सहज मंच—जो स्वास्थ्य को आपकी उंगलियों पर रखने के लिए डिज़ाइन किया गया है।",
    mr: "केअरपल्सचा शोध घ्या, अपॉइंटमेंट बुक करण्यासाठी, लॅब चाचण्या व्यवस्थापित करण्यासाठी आणि डिजिटल प्रिस्क्रिप्शनमध्ये प्रवेश करण्यासाठी एक अखंड प्लॅटफॉर्म—आरोग्य आपल्या बोटांच्या टोकावर ठेवण्यासाठी डिझाइन केलेले आहे.",
  },
  registerPatient: {
    en: "Register as Patient",
    hi: "मरीज के रूप में पंजीकरण करें",
    mr: "रुग्ण म्हणून नोंदणी करा",
  },
  loginDoctor: {
    en: "Login as Doctor",
    hi: "डॉक्टर के रूप में लॉगिन करें",
    mr: "डॉक्टर म्हणून लॉगिन करा",
  },
  didYouKnow: {
    en: "Did You Know?",
    hi: "क्या आप जानते हैं?",
    mr: "तुम्हाला माहित आहे का?",
  },
  fact1: {
    en: "Over 4 billion people lack access to basic healthcare worldwide.",
    hi: "दुनिया भर में 4 अरब से अधिक लोगों के पास बुनियादी स्वास्थ्य सेवाओं तक पहुँच नहीं है।",
    mr: "जगभरात ४ अब्जाहून अधिक लोकांकडे मूलभूत आरोग्य सुविधांचा अभाव आहे.",
  },
  fact2: {
    en: "Digital healthcare can reduce waiting times by up to 60%.",
    hi: "डिजिटल स्वास्थ्य सेवा प्रतीक्षा समय को 60% तक कम कर सकती है।",
    mr: "डिजिटल आरोग्य सेवा प्रतीक्षा वेळ ६०% पर्यंत कमी करू शकते.",
  },
  fact3: {
    en: "Telemedicine services have grown 400% in recent years.",
    hi: "हाल के वर्षों में टेलीमेडिसिन सेवाओं में 400% की वृद्धि हुई है।",
    mr: "अलिकडच्या वर्षांत टेलिमेडिसिन सेवांमध्ये ४००% वाढ झाली आहे.",
  },
  quote: {
    en: "The greatest wealth is health.",
    hi: "\"सबसे बड़ा धन स्वास्थ्य है।\" — वर्जिल",
    mr: "\"आरोग्य हीच खरी संपत्ती आहे.\" — व्हर्जिल",
  },
  adminAccessTitle: {
    en: "Admin Access Verification",
    hi: "एडमिन एक्सेस सत्यापन",
    mr: "प्रशासक प्रवेश पडताळणी",
  },
  adminAccessDesc: {
    en: "To access the admin page, please enter the passkey.",
    hi: "एडमिन पेज तक पहुंचने के लिए, कृपया पासकी दर्ज करें।",
    mr: "प्रशासक पृष्ठावर प्रवेश करण्यासाठी, कृपया पासकी प्रविष्ट करा.",
  },
  enterPasskey: {
    en: "Enter Admin Passkey",
    hi: "एडमिन पासकी दर्ज करें",
    mr: "प्रशासक पासकी प्रविष्ट करा",
  },
  invalidPasskey: {
    en: "Invalid passkey. Please try again.",
    hi: "अमान्य पासकी। कृपया फिर से प्रयास करें।",
    mr: "अवैध पासकी. कृपया पुन्हा प्रयत्न करा.",
  },
  hiThere: {
    en: "Hi there 👋",
    hi: "नमस्ते 👋",
    mr: "नमस्कार 👋",
  },
  getStartedDesc: {
    en: "Get started with appointments.",
    hi: "अपॉइंटमेंट के साथ शुरू करें।",
    mr: "अपॉइंटमेंटसह सुरुवात करा.",
  },
  fullName: {
    en: "Full name",
    hi: "पूरा नाम",
    mr: "पूर्ण नाव",
  },
  emailLabel: {
    en: "Email",
    hi: "ईमेल",
    mr: "ईमेल",
  },
  phoneLabel: {
    en: "Phone number",
    hi: "फ़ोन नंबर",
    mr: "फोन नंबर",
  },
  getStartedBtn: {
    en: "Get Started",
    hi: "शुरू करें",
    mr: "सुरु करूया",
  },
  welcome: {
    en: "Welcome 👋",
    hi: "स्वागत है 👋",
    mr: "स्वागत आहे 👋",
  },
  letUsKnow: {
    en: "Let us know more about yourself.",
    hi: "हमें अपने बारे में और बताएं।",
    mr: "आम्हाला तुमच्याबद्दल अधिक कळू द्या.",
  },
  personalInfo: {
    en: "Personal Information",
    hi: "व्यक्तिगत जानकारी",
    mr: "वैयक्तिक माहिती",
  },
  medicalInfo: {
    en: "Medical Information",
    hi: "चिकित्सा जानकारी",
    mr: "वैद्यकीय माहिती",
  },
  idVerification: {
    en: "Identification and Verification",
    hi: "पहचान और सत्यापन",
    mr: "ओळख आणि पडताळणी",
  },
  consentPrivacy: {
    en: "Consent and Privacy",
    hi: "सहमति और गोपनीयता",
    mr: "संमती आणि गोपनीयता",
  },
  submitContinue: {
    en: "Submit and Continue",
    hi: "जमा करें और जारी रखें",
    mr: "सबमिट करा आणि सुरू ठेवा",
  },
  doctorLogin: {
    en: "Doctor Login",
    hi: "डॉक्टर लॉगिन",
    mr: "डॉक्टर लॉगिन",
  },
  signInDesc: {
    en: "Sign in to your account.",
    hi: "अपने खाते में साइन इन करें।",
    mr: "आपल्या खात्यात साइन इन करा.",
  },
  logInBtn: {
    en: "Log In",
    hi: "लॉगिन करें",
    mr: "लॉगिन करा",
  },
  actions: {
    en: "Actions",
    hi: "कार्रवाई",
    mr: "कृती",
  },
  viewMedicalInfo: {
    en: "View Medical Information",
    hi: "चिकित्सा जानकारी देखें",
    mr: "वैद्यकीय माहिती पहा",
  },
  bookAppointment: {
    en: "Book a New Appointment",
    hi: "एक नया अपॉइंटमेंट बुक करें",
    mr: "नवीन अपॉइंटमेंट बुक करा",
  },
  requestLabTest: {
    en: "Request a Lab Test",
    hi: "लैब टेस्ट के लिए अनुरोध करें",
    mr: "लॅब चाचणीसाठी विनंती करा",
  },
  viewPrescriptions: {
    en: "View Prescriptions",
    hi: "नुस्खे देखें",
    mr: "प्रिस्क्रिप्शन पहा",
  },
  dashboardWelcome: {
    en: "Welcome to Your Dashboard",
    hi: "आपके डैशबोर्ड पर आपका स्वागत है",
    mr: "तुमच्या डॅशबोर्डवर स्वागत आहे",
  },
  healthJourney: {
    en: "Your health journey, all in one place",
    hi: "आपकी स्वास्थ्य यात्रा, सब एक ही स्थान पर",
    mr: "तुमचा आरोग्य प्रवास, सर्व एकाच ठिकाणी",
  },
  upcomingAppointments: {
    en: "Upcoming Appointments",
    hi: "आगामी नियुक्तियाँ",
    mr: "आगामी अपॉइंटमेंट",
  },
  noUpcomingAppointments: {
    en: "No upcoming appointments.",
    hi: "कोई आगामी अपॉइंटमेंट नहीं है।",
    mr: "काही आगामी अपॉइंटमेंट नाहीत.",
  },
  recentLabResults: {
    en: "Recent Lab Test Results",
    hi: "हालिया लैब टेस्ट परिणाम",
    mr: "अलीकडील लॅब चाचणी निकाल",
  },
  statusDone: {
    en: "Done",
    hi: "पूर्ण",
    mr: "पूर्ण",
  },
  statusPending: {
    en: "Pending",
    hi: "लंबित",
    mr: "लंबित",
  },
  viewResultBtn: {
    en: "View Result",
    hi: "परिणाम देखें",
    mr: "निकाल पहा",
  },
  noRecentLabResults: {
    en: "No recent lab test results.",
    hi: "कोई हालिया लैब टेस्ट परिणाम नहीं है।",
    mr: "काही अलीकडील लॅब चाचणी निकाल नाहीत.",
  },
  healthSummary: {
    en: "Health Summary",
    hi: "स्वास्थ्य सारांश",
    mr: "आरोग्य सारांश",
  },
  healthSummaryText: {
    en: "You are doing great! Keep up with your medication and exercise regularly to maintain good health. Remember to follow up on lab results and upcoming appointments.",
    hi: "आप बहुत अच्छा कर रहे हैं! अच्छे स्वास्थ्य को बनाए रखने के लिए अपनी दवा और नियमित रूप से व्यायाम जारी रखें। लैब परिणामों और आगामी नियुक्तियों का पालन करना याद रखें।",
    mr: "तुम्ही छान काम करत आहात! चांगले आरोग्य राखण्यासाठी तुमचे औषध आणि नियमित व्यायाम सुरू ठेवा. लॅब निकाल आणि आगामी भेटींचा पाठपुरावा करण्याचे लक्षात ठेवा.",
  },
  feedback: {
    en: "Feedback",
    hi: "प्रतिक्रिया",
    mr: "अभिप्राय",
  },
  symptomCheckerTitle: {
    en: "AI Symptom Checker",
    hi: "एआई लक्षण चेकर",
    mr: "AI लक्षण चेकर",
  },
  symptomPrompt: {
    en: "Describe how you're feeling today (e.g., 'I have a fever').",
    hi: "बताएं कि आप आज कैसा महसूस कर रहे हैं (जैसे, 'मुझे बुखार है')।",
    mr: "तुम्हाला आज कसे वाटत आहे याचे वर्णन करा (उदा. 'मला ताप आहे').",
  },
  analysis: {
    en: "Preliminary Analysis",
    hi: "प्रारंभिक विश्लेषण",
    mr: "प्राथमिक विश्लेषण",
  },
  recDoctor: {
    en: "Recommended Doctor",
    hi: "अनुशंसित डॉक्टर",
    mr: "शिफारस केलेले डॉक्टर",
  },
  generalPhysician: {
    en: "General Physician",
    hi: "सामान्य चिकित्सक",
    mr: "जनरल फिजिशियन",
  },
  pediatrician: {
    en: "Pediatrician",
    hi: "बाल रोग विशेषज्ञ",
    mr: "बालरोगतज्ज्ञ",
  },
  checkNow: {
    en: "Check Now",
    hi: "अभी चेक करें",
    mr: "आता तपासा",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "hi" || savedLang === "mr")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    return translations[key] ? translations[key][language] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
