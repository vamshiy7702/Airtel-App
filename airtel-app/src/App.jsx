import { useRef, useState } from 'react'
import logo from './assets/logo.png'
import WaIcon from './WaIcon.jsx'
import { services } from './data.js'
import { WA_NUMBER, WA_HELLO, PHONE, PHONE_TEXT, EMAIL, COMPANY, ADDRESS, ADDRESS_LINK, MAPS_LINK } from './config.js'

const waUrl = (text = WA_HELLO) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

const WaButton = ({ className = 'btn wa', children = 'WhatsApp Us' }) => (
  <a className={className} href={waUrl()} target="_blank" rel="noopener noreferrer">{children}</a>
)

const whyCards = [
  ['Quick assistance', 'Get support for your Airtel service requirements.'],
  ['Multiple services', 'Mobile, Wi-Fi, DTH and business services in one place.'],
  ['Easy porting assistance', 'Get guidance when switching your existing number to Airtel.'],
  ['Home connectivity', 'Get assistance with Airtel Wi-Fi and broadband connections.'],
  ['Business solutions', 'Connectivity options for offices and businesses.'],
  ['WhatsApp support', 'Contact our team directly through WhatsApp.'],
]

const steps = [
  ['01', 'Choose your service', 'Select the Airtel service you are interested in.'],
  ['02', 'Submit your details', 'Enter your name, mobile number and service requirement.'],
  ['03', 'Get assistance', 'Our team will contact you regarding the next steps.'],
]

const faqs = [
  ['Can I get a new Airtel SIM?', 'Yes. Submit your enquiry and our team can assist with the new connection process.'],
  ['Can I port my existing number to Airtel?', 'Yes. Mobile number portability allows you to switch your number to Airtel, subject to applicable requirements. Airtel provides the required porting process through its official channels.'],
  ['Can I get Airtel Wi-Fi for my home?', 'Yes. Airtel offers broadband/Wi-Fi services in eligible locations. Availability and plans depend on your location.'],
  ['Do you provide Airtel DTH?', 'Submit a DTH enquiry and get assistance regarding available services.'],
  ['Can I get Airtel Postpaid?', 'Yes. Airtel provides multiple postpaid plans, subject to applicable availability and eligibility.'],
  ['What information is required for a new connection?', 'Required documents and verification can vary by service and applicable rules. Provide the documents requested during the official connection process.'],
  ['Can I contact you through WhatsApp?', 'Yes. Use the WhatsApp button on any page to chat with our team.'],
]

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['Home', '#home'], ['Services', '#services'], ['How it works', '#how'], ['About', '#about'], ['FAQs', '#faq'], ['Contact', '#contact']]
  return (
    <header>
      <div className="wrap nav">
        <a href="#home" className="logo">
          <img src={logo} alt="Airtel logo" style={{ height: 34, width: 'auto' }} />
          <span>Authorized Distributor</span>
        </a>
        <button className="menu" aria-label="Menu" onClick={() => setOpen(o => !o)}>Menu</button>
        <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
          {links.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
          <a className="btn" href="#enquiry" style={{ color: '#fff', padding: '8px 18px' }}>Get Started</a>
        </nav>
      </div>
    </header>
  )
}

function Hero({ onPick }) {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <h1>Get all <span>Airtel</span> services in one place</h1>
          <p className="sub">SIM, 5G, Prepaid, Postpaid, Wi-Fi, DTH, Business &amp; more</p>
          <p>Get assistance for your Airtel service requirements. Explore mobile connectivity, home internet, entertainment and business solutions from one convenient place.</p>
          <div className="cta">
            <a className="btn" href="#services">Explore Services</a>
            <WaButton />
            <a className="btn ghost" href={`tel:${PHONE}`}>Call Now</a>
          </div>
        </div>
        <div className="signal">
          <h3>What do you need today?</h3>
          <p>Pick a service and tell us in one step.</p>
          <div className="chips">
            {services.slice(0, 9).map(s => (
              <button key={s.key} className="chip" onClick={() => onPick(s.key)}>{s.key}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Services({ onOpen }) {
  return (
    <section id="services">
      <div className="wrap">
        <h2>Our Airtel services</h2>
        <p>Explore Airtel mobile, home, connectivity, entertainment and business services.</p>
        <div className="grid">
          {services.map(s => (
            <div className="card" key={s.key}>
              <div className="ic">{s.icon}</div>
              <h3>{s.key}</h3>
              <p>{s.desc}</p>
              <button className="btn" onClick={() => onOpen(s)}>{s.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceDialog({ service, dialogRef, onEnquire }) {
  return (
    <dialog ref={dialogRef}>
      {service && (
        <>
          <h3>{service.key}</h3>
          <p>{service.desc}</p>
          <ul>{service.features.map(f => <li key={f}>{f}</li>)}</ul>
          <div className="cta">
            <button className="btn" onClick={() => onEnquire(service.key)}>Enquire now</button>
            <button className="btn ghost" onClick={() => dialogRef.current.close()}>Close</button>
          </div>
        </>
      )}
    </dialog>
  )
}

function Enquiry({ service, setService }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', message: '' })
  const [done, setDone] = useState(false)
  const set = k => e => setForm({ ...form, [k]: e.target.value })

  const submit = e => {
    e.preventDefault()
    const text = `Airtel service request\nName: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email || '-'}\nService: ${service}\nMessage: ${form.message || '-'}`
    const a = document.createElement('a')
    a.href = waUrl(text); a.target = '_blank'; a.rel = 'noopener noreferrer'
    document.body.appendChild(a); a.click(); a.remove()
    setDone(true)
  }

  return (
    <section id="enquiry">
      <div className="wrap two">
        <div>
          <h2>Need an Airtel service?</h2>
          <p>Tell us which Airtel service you need and our team will get in touch with you.</p>
        </div>
        <form onSubmit={submit}>
          <label>Full name<input required placeholder="Enter your name" value={form.name} onChange={set('name')} /></label>
          <label>Mobile number<input required inputMode="tel" pattern="[0-9+ ]{10,14}" placeholder="Enter your mobile number" value={form.mobile} onChange={set('mobile')} /></label>
          <label>Email address<input type="email" placeholder="Enter your email" value={form.email} onChange={set('email')} /></label>
          <label>Select service
            <select value={service} onChange={e => setService(e.target.value)}>
              {services.map(s => <option key={s.key}>{s.key}</option>)}
              <option>Other</option>
            </select>
          </label>
          <label>Message<textarea rows="3" placeholder="Tell us what you need" value={form.message} onChange={set('message')} /></label>
          <button className="btn" type="submit">Submit service request</button>
          <p className="ok" role="status">{done && 'Request ready. Send it in WhatsApp and our team will contact you.'}</p>
        </form>
      </div>
    </section>
  )
}

function Contact() {
  const rows = [
    ['📞', 'Call us', PHONE_TEXT],
    ['💬', 'WhatsApp', PHONE_TEXT],
    ['✉️', 'Email', EMAIL],
    ['📍', 'Address', <a key="a" href={ADDRESS_LINK} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--mute)', textDecoration: 'underline' }}>{ADDRESS}</a>],
    ['🕙', 'Business hours', 'Monday – Sunday, 10:00 AM – 8:00 PM'],
  ]
  return (
    <section id="contact">
      <div className="wrap two">
        <div>
          <h2>Contact us</h2>
          <p>Have questions about Airtel services? Contact our team for assistance.</p>
          <div className="info">
            {rows.map(([i, t, v]) => <div key={t}><span>{i}</span><div><b>{t}</b>{v}</div></div>)}
          </div>
          <div className="cta">
            <a className="btn" href={`tel:${PHONE}`}>Call Now</a>
            <WaButton />
            <a className="btn ghost" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Get Directions</a>
          </div>
        </div>
        <div className="card" style={{ justifyContent: 'center', textAlign: 'center', minHeight: 260 }}>
          <div style={{ fontSize: '3rem' }}>📍</div>
          <h3>Pal Gam, Surat</h3>
          <p>Star World Complex, Green City Rd, Surat, Gujarat 394510</p>
        </div>
      </div>
    </section>
  )
}

function Footer({ onOpen }) {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div><h4>{COMPANY}</h4><p>Airtel service assistance for mobile, home, entertainment and business connectivity.</p></div>
          <div><h4>Quick links</h4><a href="#home">Home</a><a href="#about">About Us</a><a href="#services">Services</a><a href="#contact">Contact Us</a><a href="#faq">FAQs</a></div>
          <div><h4>Services</h4>{services.slice(1, 10).map(s => <a key={s.key} href="#services" onClick={() => onOpen(s)}>{s.key}</a>)}</div>
          <div><h4>Support</h4><a href="#contact">Contact Us</a><a href={waUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={`tel:${PHONE}`}>Call</a><a href="#enquiry">Service Enquiry</a></div>
          <div><h4>Legal</h4><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a><a href="#">Disclaimer</a></div>
        </div>
        <p className="copy">© 2026 {COMPANY}. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const dialogRef = useRef(null)
  const [active, setActive] = useState(null)
  const [service, setService] = useState(services[0].key)

  const pick = key => { setService(key); document.getElementById('enquiry').scrollIntoView({ behavior: 'smooth' }) }
  const openService = s => { setActive(s); dialogRef.current?.showModal() }
  const enquire = key => { dialogRef.current.close(); pick(key) }

  return (
    <>
      <Header />
      <main>
        <Hero onPick={pick} />
        <Services onOpen={openService} />
        <section className="why"><div className="wrap">
          <h2>Your local Airtel service partner</h2>
          <div className="grid">{whyCards.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div></section>
        <section id="how"><div className="wrap">
          <h2>Get connected in 3 simple steps</h2>
          <div className="steps">{steps.map(([n, t, d]) => <div className="step" key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div></section>
        <section id="about" className="why"><div className="wrap two">
          <div>
            <h2>About our Airtel services</h2>
            <p>We help customers explore and access Airtel connectivity and related services through a simple and convenient service experience.</p>
            <p>From mobile SIM connections and prepaid/postpaid services to Wi-Fi, DTH and business connectivity, our goal is to make the service enquiry process easier for customers.</p>
          </div>
          <div className="card"><span className="tag">Our mission</span><h3>Making connectivity simple</h3><p>We aim to provide customers with an easy way to discover Airtel services and connect with the right service assistance.</p></div>
        </div></section>
        <Enquiry service={service} setService={setService} />
        <section id="faq" className="why"><div className="wrap" style={{ maxWidth: 760 }}>
          <h2>Frequently asked questions</h2>
          {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div></section>
        <Contact />
        <section className="final"><div className="wrap">
          <h2>Ready to get connected?</h2>
          <p>Whether you need a new SIM, mobile plan, Wi-Fi, DTH, porting assistance or business connectivity, submit your enquiry today.</p>
          <div className="cta" style={{ justifyContent: 'center' }}>
            <a className="btn" href="#enquiry">Get Started</a><WaButton /><a className="btn ghost" href={`tel:${PHONE}`}>Call Now</a>
          </div>
        </div></section>
      </main>
      <Footer onOpen={openService} />
      <a className="float" href={waUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us"><WaIcon /></a>
      <ServiceDialog service={active} dialogRef={dialogRef} onEnquire={enquire} />
    </>
  )
}
