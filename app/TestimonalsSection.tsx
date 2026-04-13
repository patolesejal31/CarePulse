const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Patient",
      feedback: "CarePulse made scheduling my appointments so simple! The platform is intuitive and really helps me stay on top of my health.",
      avatar: "/assets/images/user-1.png", 
    },
    {
      name: "Dr. Sharma",
      role: "Cardiologist",
      feedback: "An excellent platform for managing patient interactions efficiently. The e-prescription feature has saved us so much time.",
      avatar: "/assets/images/doctor-sharma.png", 
    },
  ];

  return (
    <section className="py-24 px-8 bg-gradient-to-br from-[#740938] to-[#AF1740] relative overflow-hidden w-full min-h-screen flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
         <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ffcf56] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-[#ffcf56]">
          What People Are Saying
        </h2>
        <div className="h-1.5 w-24 bg-white/20 mx-auto mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-10 rounded-[3rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500"
            >
              <div className="flex flex-col h-full">
                 <p className="text-xl text-white italic leading-relaxed mb-8 flex-1 font-medium">
                  "{testimonial.feedback}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-14 h-14 rounded-full bg-[#ffcf56]/20 border-2 border-[#ffcf56] flex items-center justify-center text-[#ffcf56] font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-[#ffcf56] text-sm font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
