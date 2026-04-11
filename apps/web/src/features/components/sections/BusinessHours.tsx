import { Calendar } from "lucide-react";

export const BusinessHours = () => {
  const shifts = ["6h", "7h30", "9h", "10h30", "15h30"]; //

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-50 mb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#E47B25] rounded-xl text-white">
          <Calendar size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          Horários de Funcionamento
        </h2>
      </div>

      <div className="space-y-4">
        {/* Terça a Sexta */}
        <div className="bg-slate-50 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#40B5AD]" />
            <span className="font-bold text-slate-800">
              De terça a sexta e aos domingos
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {shifts.map((time) => (
              <span
                key={time}
                className="bg-[#40B5AD]/10 text-[#40B5AD] px-4 py-1.5 rounded-full text-sm font-medium border border-[#40B5AD]/20"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* Segunda e Sábado */}
        <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="font-bold text-slate-800">Segunda e sábado</span>
          </div>
          <span className="text-slate-500 font-medium">Fechado</span>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#40B5AD]" />
            <span className="font-bold text-slate-800">Tempo de Resposta</span>
          </div>
          <span className="text-slate-500 font-medium">Até 2 horas</span>
        </div>
      </div>
    </div>
  );
};
