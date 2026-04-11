import { Award, Users, Zap } from "lucide-react";

export const TrustBar = () => {
  const benefits = [
    {
      icon: <Award className="text-white" size={24} />,
      title: "21+ Anos",
      desc: "De experiência ensinando surf",
    },
    {
      icon: <Users className="text-white" size={24} />,
      title: "500+",
      desc: "Alunos satisfeitos",
    },
    {
      icon: <Zap className="text-white" size={24} />,
      title: "Método T4",
      desc: "Metodologia exclusiva comprovada",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-slate-50">
      <p className="text-center text-slate-600 font-medium mb-10">
        Por que escolher T4 SURF?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#E47B25] rounded-full flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
