import Link from "next/link";
export const metadata = {
  title: "About Us",
  description: "About Us Page",
};
const AboutPage = () => {
  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-4">
          fashFlash is dedicated to providing innovative solutions for
          businesses. We specialize in web development, digital marketing, and
          e-commerce solutions. Our team is committed to delivering high-quality
          services that meet the unique needs of our clients.
        </p>
        <p className="text-lg mb-4">
          Founded in 2024, fashFlash has quickly become a trusted partner for
          businesses looking to establish a strong online presence and drive
          growth through digital channels.
        </p>
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <p className="text-lg mb-4">
          At fashFlash, we have assembled a team of skilled professionals with
          expertise in web development, UI/UX design, digital marketing, and
          project management. Each member of our team brings a unique
          perspective and valuable experience to the table, allowing us to
          deliver innovative solutions and exceed client expectations.
        </p>
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          Our mission at fashFlash is to empower businesses to succeed in the
          digital world. We are committed to integrity, creativity, and
          excellence, and strive to provide cutting-edge solutions that drive
          results and surpass client expectations.
        </p>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions or would like to learn more about fashFlash
          and the services we offer, please feel free to{" "}
          <Link href="/contact-us">contact us</Link>. We look forward to hearing
          from you!
        </p>
      </div>
    </>
  );
};

export default AboutPage;
