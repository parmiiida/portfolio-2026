import PageLayout from "../components/PageLayout";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <PageLayout activeSection="contact">
      <section className="space-y-8">
        <ContactForm />
      </section>
    </PageLayout>
  );
};

export default Contact;


