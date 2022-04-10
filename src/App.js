import Header from './Header';
import Main from './Main';
import FooterBar from './FooterBar';
import Footer from './Footer';
function App() {
  return (
    <>
      <section className="todoapp">
        <Header />
        <Main />
        <FooterBar />
      </section>
      <Footer />
    </>
  );
}

export default App;
