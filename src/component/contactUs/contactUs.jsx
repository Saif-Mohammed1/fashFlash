import FormField from "./formField";

const ContactUsPage = () => {
  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-4">
          We'd love to hear from you! Whether you have questions about our
          services, want to collaborate on a project, or just want to say hello,
          feel free to reach out to us using the contact information below.
        </p>
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg mb-4">
          <strong>Email:</strong> contact@example.com
        </p>
        <p className="text-lg mb-4">
          <strong>Phone:</strong> +123-456-7890
        </p>
        <p className="text-lg mb-4">
          <strong>Address:</strong> 123 Street, Cairo, Egypt
        </p>
        <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
        <p className="text-lg mb-4">
          If you prefer, you can also send us a message using the form below:
        </p>
        <FormField />{" "}
        <p className="text-lg mb-4">
          We'll do our best to get back to you as soon as possible!
        </p>
        <p className="text-lg mb-4">Thank you for reaching out to us.</p>
      </div>
    </>
  );
};

export default ContactUsPage;
