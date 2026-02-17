import BookCard from "./BookCard";
import CategoryCard from "./CategoryCard";
import TestimonialCard from "./TestimonialCard";

const books = [
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: "$19.99",
    image: "/images/bg.jpg",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: "$24.99",
    image: "/images/bg.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    price: "$18.99",
    image: "/images/bg.jpg",
  },
];

const HomePage = () => {
  return (
    <div className="flex">
      <main className="flex-1 p-8 space-y-20 bg-amber-50 min-h-screen">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-800">
            Discover Your Next Great Read
          </h1>
          <p className="mt-4 text-gray-600">
            Explore thousands of books across all genres and find your perfect
            story.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition">
              Explore Books
            </button>
            <button className="border border-amber-700 text-amber-700 px-6 py-3 rounded-lg hover:bg-amber-100 transition">
              Learn More
            </button>
          </div>
        </section>

        {/* Featured */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 text-amber-800">
            Featured Books
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 text-amber-800">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              "Fiction",
              "Non-Fiction",
              "Science",
              "Self-Development",
              "Children",
            ].map((cat) => (
              <CategoryCard key={cat} name={cat} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 text-amber-800">
            What Our Readers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah"
              review="An amazing collection of books! Fast delivery and great service."
            />
            <TestimonialCard
              name="David"
              review="I found exactly what I was looking for. Highly recommend!"
            />
            <TestimonialCard
              name="Emma"
              review="Beautiful website and easy to navigate."
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
