
import Header from "../layout/Header";
import Slide from "./components/Slide";
import Brand from "./components/Brand";
import RecentProduct from "./components/RecentProduct";
import Footer from "../layout/Footer"

export default function HomePage() {

    return (
        <div>
            <Header />
            <Slide />
            <Brand />
            <RecentProduct />
            <Footer />
        </div>
    );
}
