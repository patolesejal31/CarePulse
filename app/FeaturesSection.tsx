import { FaCalendarCheck, FaFlask, FaPrescriptionBottle } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    { 
      title: "Appointment Booking", 
      description: "Book appointments seamlessly with trusted doctors. Our intuitive platform allows patients to select their preferred doctor, view available slots, and receive instant booking confirmations.",
      icon: <FaCalendarCheck className="text-[#AF1740] text-5xl mb-4" />, 
    },
    { 
      title: "Lab Test Management", 
      description: "Order and manage your lab tests with ease. Patients can request lab tests directly through the platform, and doctors can authorize them with a few clicks.",
      icon: <FaFlask className="text-[#AF1740] text-5xl mb-4" />, 
    },
    { 
      title: "E-Prescriptions", 
      description: "Access and manage digital prescriptions online. Doctors can issue e-prescriptions, which patients can access digitally through the platform securely.",
      icon: <FaPrescriptionBottle className="text-[#AF1740] text-5xl mb-4" />, 
    },
  ];

  return (
    <section className="py-24 px-8 bg-white text-[#740938] w-full min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          Our Features
        </h2>
        <div className="h-1.5 w-24 bg-[#ffcf56] mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-10 rounded-[2.5rem] bg-[#fdf2f2] border border-[#740938]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-white"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-white rounded-2xl shadow-sm mb-6 group-hover:bg-[#fdf2f2] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#740938]">{feature.title}</h3>
                <p className="text-[#740938]/80 leading-relaxed font-medium">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
