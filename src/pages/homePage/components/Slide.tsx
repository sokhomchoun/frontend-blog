import { useState } from "react";

export default function Slide() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "Slide 1",
        "Slide 2",
        "Slide 3",
        "Slide 3"
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="w-full relative">
            <div className="overflow-hidden relative h-96">
                {/* Updated: Set flex direction to column for vertical slides */}

                <div className="flex flex-col transition-transform duration-500"
                    style={{ transform: `translateY(-${currentSlide * 100}%)` }}
                >
                    <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center w-full">
                        <span className="text-3xl font-semibold text-indigo-600">
                            Slide1
                        </span>
                    </div>
                </div>

                <div className="flex flex-col transition-transform duration-500"
                    style={{ transform: `translateY(-${currentSlide * 100}%)` }}
                >
                    <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center w-full">
                        <span className="text-3xl font-semibold text-indigo-600">
                            Slide2
                        </span>
                    </div>
                </div>

                <div className="flex flex-col transition-transform duration-500"
                    style={{ transform: `translateY(-${currentSlide * 100}%)` }}
                >
                    <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center w-full">
                        <span className="text-3xl font-semibold text-indigo-600">
                            Slide3
                        </span>
                    </div>
                </div>

                <div className="flex flex-col transition-transform duration-500"
                    style={{ transform: `translateY(-${currentSlide * 100}%)` }}
                >
                    <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center w-full">
                        <span className="text-3xl font-semibold text-indigo-600">
                            Slide4
                        </span>
                    </div>
                </div>

            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 px-4 py-2 rounded-full"
            >
                Prev
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 px-4 py-2 rounded-full"
            >
                Next
            </button>

            {/* Pagination */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-indigo-600" : "bg-gray-300"}`} // Fixed className
                    ></div>
                ))}
            </div>
        </div>
    );
}
