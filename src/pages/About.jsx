export default function About() {
  return (
    <>
      <section className="bg-slate-600 py-14 text-white">
        <div className="container-hotel">
          <p className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-amber-300">Conócenos</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Nosotros</h1>
          <p className="mt-3 text-lg text-white/70">Nuestra historia, misión y visión como hotel.</p>
        </div>
      </section>
      <section className="container-hotel my-12">
        <h2 className="section-title border-emerald-600">▤ Historia</h2>
        <p className="text-lg leading-8 text-slate-600">
          El Descanso Eterno nació con el propósito de ofrecer una experiencia de hospedaje cómoda, segura y accesible para viajeros que buscan un servicio de calidad respaldado por la tecnología. Desde sus inicios, el hotel identificó las dificultades de gestionar reservas y habitaciones mediante procesos manuales y apostó por una plataforma que automatiza las reservas y optimiza la administración interna. Comprometido con las nuevas tendencias del sector turístico, incorporó además el servicio pet-friendly para que los huéspedes disfruten su estadía junto a sus mascotas.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="card overflow-hidden">
            <header className="bg-emerald-600 p-4 text-xl font-semibold text-white">◎ Misión</header>
            <p className="p-6 leading-7">Brindar servicios de hospedaje cómodos, accesibles y seguros mediante una plataforma digital eficiente que facilite la reserva, mejore la experiencia del cliente y optimice la gestión interna, ofreciendo opciones diferenciadas como el servicio pet-friendly.</p>
          </article>
          <article className="card overflow-hidden">
            <header className="bg-blue-600 p-4 text-xl font-semibold text-white">◉ Visión</header>
            <p className="p-6 leading-7">Ser un hotel reconocido por ofrecer una experiencia cómoda, accesible y segura, destacándose por soluciones tecnológicas innovadoras y servicios que se adapten a las nuevas necesidades del mercado turístico.</p>
          </article>
        </div>
      </section>
    </>
  )
}
