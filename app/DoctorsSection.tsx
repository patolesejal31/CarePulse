import Image from "next/image";

const doctors = [
  { 
    image: "/assets/images/john_green.png",
    name: "John Green",
    specialization: "Cardiologist",
    experience: "15+ years",
    qualification: "MD, FACC",
    description: "Expert in heart diseases, angioplasty, and preventive cardiology.",
  },
  { 
    image: "/assets/images/leila_cameron.png",
    name: "Leila Cameron",
    specialization: "Pediatrician",
    experience: "10+ years",
    qualification: "MD, FAAP",
    description: "Specialist in child healthcare, vaccinations, and growth monitoring.",
  },
  { 
    image: "/assets/images/david_livingston.png",
    name: "David Livingston",
    specialization: "Orthopedic Surgeon",
    experience: "12+ years",
    qualification: "MS Ortho, FRCS",
    description: "Experienced in joint replacements, fractures, and sports injuries.",
  },
  { 
    image: "/assets/images/evan_peter.png",
    name: "Evan Peter",
    specialization: "Neurologist",
    experience: "18+ years",
    qualification: "DM Neurology",
    description: "Specializes in treating brain disorders, strokes, and epilepsy.",
  },
  { 
    image: "/assets/images/jane_powell.png",
    name: "Jane Powell",
    specialization: "Dermatologist",
    experience: "8+ years",
    qualification: "MD Dermatology",
    description: "Expert in skincare, laser treatments, and cosmetic dermatology.",
  },
  { 
    image: "/assets/images/alex_remirez.png",
    name: "Alex Ramirez",
    specialization: "Endocrinologist",
    experience: "14+ years",
    qualification: "MD, DM Endocrinology",
    description: "Manages diabetes, thyroid disorders, and hormonal imbalances.",
  },
  { 
    image: "/assets/images/jasmine_lee.png",
    name: "Jasmine Lee",
    specialization: "Gynecologist",
    experience: "16+ years",
    qualification: "MD, DGO",
    description: "Specializes in pregnancy care, fertility, and women's health.",
  },
  { 
    image: "/assets/images/alyana_cruz.png",
    name: "Alyana Cruz",
    specialization: "Oncologist",
    experience: "20+ years",
    qualification: "MD, DM Oncology",
    description: "Expert in cancer treatments, chemotherapy, and radiation therapy.",
  },
  { 
    image: "/assets/images/hardik_sharma.png",
    name: "Hardik Sharma",
    specialization: "General Physician",
    experience: "9+ years",
    qualification: "MBBS, MD Internal Medicine",
    description: "Handles general health checkups, chronic diseases, and infections.",
  },
];

const DoctorsSection = () => {
  return (
    <section className="py-24 px-8 bg-[#fdf2f2] w-full min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#740938]">
          Our Expert Medical Staff
        </h2>
        <div className="h-1.5 w-24 bg-[#ffcf56] mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctors.map((doctor, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[3rem] shadow-xl border border-[#740938]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center group"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#AF1740] to-[#740938] rounded-full blur-lg opacity-20 scale-110 group-hover:opacity-40 transition-opacity"></div>
                <Image 
                  src={doctor.image} 
                  alt={doctor.name} 
                  width={150} 
                  height={150} 
                  className="relative rounded-full border-4 border-[#ffcf56] shadow-md object-cover w-32 h-32 transform transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#740938] mb-1">Dr. {doctor.name}</h3>
              <p className="text-[#AF1740] font-bold text-xs tracking-widest uppercase mb-3 px-4 py-1 bg-[#fdf2f2] rounded-full group-hover:bg-[#AF1740] group-hover:text-white transition-colors">
                {doctor.specialization}
              </p>
              <div className="space-y-1 mb-4">
                 <p className="text-gray-600 font-semibold text-sm">{doctor.qualification}</p>
                 <p className="text-gray-400 text-xs italic">Experience: {doctor.experience}</p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{doctor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
