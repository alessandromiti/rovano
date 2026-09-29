export default function Introduction() {
  const values = [
    {
      number: "01",
      title: "Tradizione",
      text: "La cucina italiana come punto di partenza, senza smettere di evolvere.",
    },
    {
      number: "02",
      title: "Materia",
      text: "Ingredienti selezionati con attenzione, seguendo stagioni e territorio.",
    },
    {
      number: "03",
      title: "Tecnica",
      text: "Tecnica e precisione sempre al servizio del gusto.",
    },
    {
      number: "04",
      title: "Equilibrio",
      text: "Ogni elemento del piatto ha un motivo e trova il proprio equilibrio.",
    },
  ];

  return (
    <section id="ristorante" className="bg-[#f3f0e8] py-28 md:py-36">
      <div className="container-rovano">
        <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a58a62]">
              Il ristorante
            </p>

            <h2 className="font-display mt-5 max-w-3xl text-5xl leading-[1.05] text-[#1b1b17] md:text-7xl">
              Una cucina che racconta qualcosa.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-[#77766f] md:text-lg">
              Rovano nasce dall&apos;incontro tra tradizione italiana e ricerca
              contemporanea. Selezioniamo ingredienti di stagione e li
              trasformiamo in piatti essenziali, pensati per valorizzare il
              gusto e la materia prima.
            </p>
          </div>
        </div>

        <div className="mt-24 grid border-t border-[#1b1b17]/10 md:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.number}
              className="border-b border-[#1b1b17]/10 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#a58a62]">
                {value.number}
              </span>

              <h3 className="font-display mt-5 text-3xl text-[#1b1b17]">
                {value.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#77766f]">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}