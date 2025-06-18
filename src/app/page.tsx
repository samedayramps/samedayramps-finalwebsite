import Header from "./Header";
import Hero from "./Hero";
import FeatureBar from "./FeatureBar";
import Benefits from "./Benefits";
import HowItWorks from "./HowItWorks";
import QuoteForm from "./QuoteForm";
import FAQ from "./FAQ";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <Header />
      <main>
        <Hero />
        <FeatureBar />
        <Benefits />
        <HowItWorks />
        <QuoteForm />
        <FAQ />
      </main>
    </div>
  );
}
