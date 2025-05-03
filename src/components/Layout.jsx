import Header from "./Header";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-5">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
