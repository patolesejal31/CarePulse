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
    <section className="py-20 px-8 bg-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-12 text-[#ff4545]">
        Meet Our Expert Doctors
      </h2>

      {/* Horizontal Divider */}
      <div className="border-t-4 border-[#ff4545] mb-12 mx-auto w-24"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {doctors.map((doctor, index) => (
          <div 
            key={index} 
            className="bg-white p-6 shadow-xl rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform text-center"
          >
            <Image 
              src={doctor.image} 
              alt={doctor.name} 
              width={180} 
              height={180} 
              className="mx-auto rounded-full border-4 border-[#ff4545]"
            />
            <h3 className="text-xl font-semibold mt-4 text-[#ff4545]">{doctor.name}</h3>
            <p className="text-gray-600 font-medium">{doctor.specialization}</p>
            <p className="text-gray-500 mt-1">{doctor.qualification}</p>
            <p className="text-gray-500">Experience: {doctor.experience}</p>
            <p className="text-gray-700 mt-3">{doctor.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsSection;
