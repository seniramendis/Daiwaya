import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const initialState = {
  fullName: '',
  dateOfBirth: '',
  timeOfBirth: '00:00',
};

function OnboardingForm({ onGenerate, initialValues }) {
  const [form, setForm] = useState({ ...initialState, ...initialValues });
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(() => {
    return form.fullName.trim().length > 1 && form.dateOfBirth;
  }, [form]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    onGenerate({
      ...form,
      dateOfBirth: `${form.dateOfBirth}T${form.timeOfBirth}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-silver/80" htmlFor="fullName">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange('fullName')}
          placeholder="Your full name"
          className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
        {submitted && !form.fullName.trim() && (
          <p className="text-xs text-red-300">Please enter your full name.</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-silver/80" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
          {submitted && !form.dateOfBirth && (
            <p className="text-xs text-red-300">A birth date is required.</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-silver/80" htmlFor="timeOfBirth">
            Time of Birth
          </label>
          <input
            id="timeOfBirth"
            name="timeOfBirth"
            type="time"
            value={form.timeOfBirth}
            onChange={handleChange('timeOfBirth')}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
          />
        </div>
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:scale-[1.01] hover:bg-[#e5b300] focus:outline-none focus:ring-2 focus:ring-gold/50 sm:w-auto"
      >
        Generate Destiny Chart
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}

export default OnboardingForm;
