import { FaCalendarCheck, FaFlask, FaPrescriptionBottle, FaBell, FaShieldAlt } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    { 
      title: "Appointment Booking", 
      description: "Book appointments seamlessly with trusted doctors. Patients can browse doctors by specialization and confirm bookings instantly. The system sends automatic reminders via SMS to prevent missed appointments. Admins can manage and reschedule appointments efficiently.",
      icon: <FaCalendarCheck className="text-[#ff4545] text-4xl mb-4" />, 
    },
    { 
      title: "Lab Test Management", 
      description: "Order and manage your lab tests with ease. Patients can request lab tests online, and doctors can approve them digitally. Once processed, results are uploaded automatically and patients receive instant notifications. The system maintains historical records for tracking health trends over time.",
      icon: <FaFlask className="text-[#fbd288] text-4xl mb-4" />, 
    },
    { 
      title: "E-Prescriptions", 
      description: "Access and manage digital prescriptions online. Doctors can generate and send prescriptions electronically, reducing paperwork errors. Patients can share e-prescriptions with pharmacies for quick medicine pickup or delivery. The system ensures compliance with medical safety regulations.",
      icon: <FaPrescriptionBottle className="text-[#ff9c73] text-4xl mb-4" />, 
    },
    { 
      title: "Real-time Notifications", 
      description: "Stay updated with instant alerts. Receive notifications for appointment confirmations. The system ensures timely communication through SMS.",
      icon: <FaBell className="text-[#ff9c73] text-4xl mb-4" />, 
    },
    { 
      title: "Secure Data Management", 
      description: "Your medical records are stored with top-tier security. We use encrypted cloud storage to protect patient data and ensure HIPAA compliance. Access is restricted to authorized users only, keeping your health information safe and confidential.",
      icon: <FaShieldAlt className="text-[#44bba4] text-4xl mb-4" />, 
    },
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-r from-[#f8d88f] to-[#fbc69f] text-white">
      <h2 className="text-3xl font-extrabold text-center mb-12 text-[#ff4545]">
        Our Features
      </h2>

      {/* Horizontal Divider */}
      <div className="border-t-4 border-[#ff4545] mb-12 mx-auto w-24"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-6 shadow-xl rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform"
          >
            <div className="text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-[#ff4545]">{feature.title}</h3>
              <p className="text-[#333333]">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
